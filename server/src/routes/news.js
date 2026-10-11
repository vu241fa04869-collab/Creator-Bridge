import { Router } from "express";

const router = Router();
const cacheDurationMs = 15 * 60 * 1000;
const maximumAgeMs = 30 * 24 * 60 * 60 * 1000;
const sources = [
  {
    name: "OpenAI",
    feedUrl: "https://openai.com/news/rss.xml",
    homeUrl: "https://openai.com/news/",
    hostname: "openai.com",
    relevant: /ai|creative|image|video|audio|advert|creator|model|chatgpt|gpt|research|design/i
  },
  {
    name: "Google",
    feedUrl: "https://blog.google/rss/",
    homeUrl: "https://blog.google/",
    hostname: "blog.google",
    relevant: /ai|creator|creative|image|video|advert|gemini|youtube|studio|tool|model|design|search/i
  }
];

let cachedArticles = null;
let cachedAt = 0;

function decodeXml(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/&#x([\da-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#39;/gi, "'");
}

function plainText(value = "") {
  return decodeXml(value)
    .replace(/<!--([\s\S]*?)-->/g, " ")
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function element(block, tag) {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}\\s*>`, "i"));
  return match?.[1] || "";
}

function articleLink(block) {
  const atomLink = block.match(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\/?\s*>/i);
  return atomLink?.[1] || element(block, "link");
}

function safeArticleUrl(rawUrl, source) {
  try {
    const url = new URL(decodeXml(rawUrl.trim()));
    return url.protocol === "https:" && url.hostname === source.hostname ? url.toString() : "";
  } catch {
    return "";
  }
}

function parseFeed(xml, source) {
  const blocks = [...xml.matchAll(/<(item|entry)\b[^>]*>[\s\S]*?<\/\1\s*>/gi)].map(([block]) => block);
  const stories = [];
  const cutoff = Date.now() - maximumAgeMs;

  for (const block of blocks) {
    const title = plainText(element(block, "title")).slice(0, 240);
    const url = safeArticleUrl(articleLink(block), source);
    const description = plainText(element(block, "description") || element(block, "summary") || element(block, "content:encoded") || element(block, "content")).slice(0, 380);
    const publishedRaw = element(block, "pubDate") || element(block, "published") || element(block, "updated") || element(block, "dc:date");
    const publishedAt = new Date(decodeXml(publishedRaw).trim());
    const text = `${title} ${description}`;

    if (!title || !url || !Number.isFinite(publishedAt.getTime()) || publishedAt.getTime() < cutoff || publishedAt.getTime() > Date.now() + 60 * 60 * 1000 || !source.relevant.test(text)) continue;

    const platformStory = /youtube|tiktok|instagram|shorts|creator studio|social platform/i.test(text);
    const toolStory = /ai|gemini|chatgpt|gpt|model|image|video|generative|creative tool|firefly/i.test(text);
    stories.push({
      title,
      summary: description,
      source: source.name,
      sourceUrl: source.homeUrl,
      url,
      publishedAt: publishedAt.toISOString(),
      category: platformStory ? "Platforms" : toolStory ? "AI & tools" : "Creator economy"
    });
  }

  return stories;
}

async function fetchSource(source) {
  const response = await fetch(source.feedUrl, {
    headers: { Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml", "User-Agent": "CreatorBridge/1.0" },
    signal: AbortSignal.timeout(6000)
  });
  if (!response.ok) throw new Error(`${source.name} feed returned ${response.status}`);
  const contentLength = Number(response.headers.get("content-length") || 0);
  if (contentLength > 2_000_000) throw new Error(`${source.name} feed exceeded the size limit`);
  const xml = await response.text();
  if (xml.length > 2_000_000) throw new Error(`${source.name} feed exceeded the size limit`);
  return parseFeed(xml, source);
}

router.get("/", async (_request, response) => {
  response.set("Cache-Control", "public, s-maxage=900, stale-while-revalidate=3600");
  if (cachedArticles && Date.now() - cachedAt < cacheDurationMs) {
    return response.json({ articles: cachedArticles, updatedAt: new Date(cachedAt).toISOString(), cached: true, sources: sources.map(({ name, homeUrl }) => ({ name, url: homeUrl })) });
  }

  const results = await Promise.allSettled(sources.map(fetchSource));
  const articles = results.flatMap(result => result.status === "fulfilled" ? result.value : []);
  const uniqueArticles = [...new Map(articles.map(article => [article.url, article])).values()]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, 30);
  const successfulSources = results.filter(result => result.status === "fulfilled").length;

  if (!successfulSources && cachedArticles) {
    return response.json({ articles: cachedArticles, updatedAt: new Date(cachedAt).toISOString(), cached: true, stale: true, sources: sources.map(({ name, homeUrl }) => ({ name, url: homeUrl })) });
  }
  if (!successfulSources) {
    return response.status(503).json({ error: "Live headlines are temporarily unavailable. Please try again shortly.", articles: [], sources: sources.map(({ name, homeUrl }) => ({ name, url: homeUrl })) });
  }

  cachedArticles = uniqueArticles;
  cachedAt = Date.now();
  return response.json({ articles: uniqueArticles, updatedAt: new Date(cachedAt).toISOString(), cached: false, partial: successfulSources < sources.length, sources: sources.map(({ name, homeUrl }) => ({ name, url: homeUrl })) });
});

export default router;
