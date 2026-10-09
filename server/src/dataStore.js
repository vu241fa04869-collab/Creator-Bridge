import { readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import Creator from "./models/Creator.js";
import CampaignBrief from "./models/CampaignBrief.js";

const serverDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = resolve(serverDir, "data");
const creatorsPath = resolve(dataDir, "creators.json");
const portfoliosPath = resolve(dataDir, "portfolios.json");
const briefsPath = resolve(dataDir, "briefs.json");
let mongoReady = false;
const isServerless = process.env.VERCEL === "1";
const ephemeralBriefs = [];
export const databaseMode = () => mongoReady ? "mongodb" : (isServerless ? "ephemeral" : "local-json");

async function readArray(path) {
  try { const parsed = JSON.parse(await readFile(path, "utf8")); return Array.isArray(parsed) ? parsed : []; }
  catch { return []; }
}

async function writeBriefs(rows) {
  const tempPath = `${briefsPath}.tmp`;
  await writeFile(tempPath, JSON.stringify(rows, null, 2), "utf8");
  await rename(tempPath, briefsPath);
}

function serializeCreator(row) {
  const value = row?.toObject ? row.toObject() : row;
  return { ...value, id: value.slug || value.id || String(value._id || ""), verified: value.verificationStatus === "identity-verified" };
}

async function addPortfolioSamples(rows) {
  const samples = await readArray(portfoliosPath);
  const byCreator = Object.fromEntries(samples.map(sample => [sample.creatorId, sample.items]));
  return rows.map(row => {
    const value = row?.toObject ? row.toObject() : row;
    const id = value.slug || value.id || String(value._id || "");
    const portfolio = value.portfolio?.length ? value.portfolio : (byCreator[id] || []);
    return serializeCreator({ ...value, portfolio });
  });
}

function serializeBrief(row) {
  const value = row?.toObject ? row.toObject() : row;
  return { ...value, id: String(value._id || value.id || ""), createdAt: value.createdAt || value.created_at || new Date().toISOString() };
}

export async function connectDatabase(uri) {
  if (!uri) {
    console.info("MONGODB_URI is not set; using the local JSON brief store.");
    return false;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 6000 });
    mongoReady = true;
    if (await Creator.countDocuments() === 0) {
      const samples = await readArray(creatorsPath);
      if (samples.length) await Creator.insertMany(samples.map(({ id, ...creator }) => ({ ...creator, slug: id })));
      console.info(`Seeded ${samples.length} demo creator profiles into MongoDB.`);
    }
    console.info("MongoDB connected.");
    return true;
  } catch (error) {
    mongoReady = false;
    console.error(`MongoDB unavailable; using the local JSON brief store. ${error.message}`);
    return false;
  }
}

export async function listCreators({ search, specialty, tool, type }) {
  if (mongoReady) {
    const conditions = [];
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i");
      conditions.push({ $or: [{ name: regex }, { specialty: regex }, { tools: regex }, { skills: regex }, { types: regex }] });
    }
    if (specialty) conditions.push({ specialty });
    if (tool) conditions.push({ tools: tool });
    if (type) conditions.push({ types: type });
    const rows = await Creator.find(conditions.length ? { $and: conditions } : {}).lean();
    return addPortfolioSamples(rows);
  }

  const rows = await readArray(creatorsPath);
  const needle = String(search || "").toLowerCase();
  const filteredRows = rows.filter(row => {
    const searchable = [row.name, row.specialty, ...(row.tools || []), ...(row.skills || []), ...(row.types || [])].join(" ").toLowerCase();
    return (!needle || searchable.includes(needle)) && (!specialty || row.specialty === specialty) && (!tool || row.tools?.includes(tool)) && (!type || row.types?.includes(type));
  });
  return addPortfolioSamples(filteredRows);
}

export async function getCreator(id) {
  if (mongoReady) {
    const row = await Creator.findOne({ slug: id }).lean();
    return row ? (await addPortfolioSamples([row]))[0] : null;
  }
  const rows = await readArray(creatorsPath);
  const row = rows.find(creator => creator.id === id);
  return row ? (await addPortfolioSamples([row]))[0] : null;
}

export async function listBriefs() {
  if (mongoReady) return (await CampaignBrief.find().sort({ createdAt: -1 }).lean()).map(serializeBrief);
  const rows = isServerless ? [...ephemeralBriefs] : await readArray(briefsPath);
  return rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(serializeBrief);
}

export async function createBrief(input) {
  const normalized = {
    title: String(input.title || "").trim(),
    brand: String(input.brand || "").trim(),
    contentType: String(input.contentType || input.type || "").trim(),
    style: String(input.style || "").trim(),
    aspectRatio: String(input.aspectRatio || input.ratio || "Flexible").trim(),
    idea: String(input.idea || "").trim(),
    budget: input.budget === "" || input.budget == null ? null : Number(input.budget),
    deadline: String(input.deadline || "").trim(),
    commercialUse: Boolean(input.commercialUse ?? input.commercial),
    creator: String(input.creator || "").trim(),
    status: "Draft"
  };
  if (mongoReady) return serializeBrief(await CampaignBrief.create(normalized));
  const rows = isServerless ? ephemeralBriefs : await readArray(briefsPath);
  const saved = { ...normalized, id: `brief-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdAt: new Date().toISOString() };
  rows.push(saved);
  if (!isServerless) await writeBriefs(rows);
  return serializeBrief(saved);
}
