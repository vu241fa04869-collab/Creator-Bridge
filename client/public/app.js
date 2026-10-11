let creators = [
  {id:"maya",name:"Maya Kapoor",initials:"MK",location:"Mumbai, India",specialty:"AI Art Director",tools:["Midjourney","Photoshop AI"],skills:["Art direction","Brand worlds"],types:["Campaigns","Product visuals"],projects:18,rate:450,verified:false,bio:"Building vivid, ownable visual worlds for brands with a human point of view.",workflow:"Concept development → Midjourney exploration → Photoshop compositing → art direction and final delivery.",palette:["#d7a4ef","#7348b6","#f4c9b6"],back:"linear-gradient(135deg,#45326c,#bb8ad2 55%,#efc8bd)"},
  {id:"arjun",name:"Arjun Mehta",initials:"AM",location:"Bengaluru, India",specialty:"AI Filmmaker",tools:["Runway","DaVinci Resolve"],skills:["Motion design","Editing"],types:["Video","Reels"],projects:24,rate:700,verified:false,bio:"Cinematic short-form films and product stories, from first frame to final cut.",workflow:"Script and storyboard → Runway generation → DaVinci edit, sound and color.",palette:["#e8b45e","#dc6e48","#392d52"],back:"linear-gradient(135deg,#282949,#9a584a 56%,#edb96c)"},
  {id:"zoya",name:"Zoya Khan",initials:"ZK",location:"Delhi, India",specialty:"3D + AI Artist",tools:["Blender","Stable Diffusion"],skills:["3D rendering","Product design"],types:["Product visuals","Campaigns"],projects:16,rate:550,verified:false,bio:"Unexpected product universes that balance playful 3D and detailed craft.",workflow:"3D blockout → Stable Diffusion texture studies → Blender lighting and render.",palette:["#7dd4c9","#237c91","#bae5b7"],back:"linear-gradient(135deg,#184c64,#30a99c 56%,#b5d9a6)"},
  {id:"kabir",name:"Kabir Rao",initials:"KR",location:"Pune, India",specialty:"AI Motion Designer",tools:["After Effects","Runway"],skills:["Animation","Compositing"],types:["Video","Motion graphics"],projects:21,rate:600,verified:false,bio:"Kinetic visuals that make product features feel impossible to scroll past.",workflow:"Motion concept → AI-assisted plates → After Effects animation and compositing.",palette:["#f0886e","#bc3f57","#f1b87b"],back:"linear-gradient(135deg,#70324b,#ca5960 55%,#f0a875)"},
  {id:"isha",name:"Isha Verma",initials:"IV",location:"Hyderabad, India",specialty:"AI Photographer",tools:["Adobe Firefly","Lightroom"],skills:["Lifestyle imagery","Retouching"],types:["Product visuals","Social"],projects:14,rate:500,verified:false,bio:"Warm, tactile lifestyle imagery with an eye for the little details.",workflow:"Moodboard → Firefly image generation → Lightroom color, retouch and delivery.",palette:["#f2cf9b","#ae704b","#f1a795"],back:"linear-gradient(135deg,#8a4b45,#d78c62 55%,#efd0a2)"},
  {id:"dev",name:"Dev Shah",initials:"DS",location:"Ahmedabad, India",specialty:"GenAI Storyteller",tools:["ChatGPT","Midjourney"],skills:["Copywriting","Storyboards"],types:["Campaigns","Social"],projects:19,rate:400,verified:false,bio:"Finding the sharp human insight that makes an AI-powered campaign click.",workflow:"Audience insight → concept and copy → storyboard → AI visual direction.",palette:["#e6a5ad","#7e5e9e","#b9a7df"],back:"linear-gradient(135deg,#483f72,#ac7692 57%,#edb7a8)"},
  {id:"tara",name:"Tara Nair",initials:"TN",location:"Chennai, India",specialty:"AI Fashion Creator",tools:["ComfyUI","Photoshop AI"],skills:["Fashion films","Styling"],types:["Video","Editorial"],projects:12,rate:650,verified:false,bio:"Experimental fashion imagery rooted in material, movement and mood.",workflow:"Styling references → ComfyUI image-to-video → edit and finishing.",palette:["#a9b3ec","#4f60a7","#ecc5d8"],back:"linear-gradient(135deg,#39395d,#757eb8 55%,#d7a9c6)"},
  {id:"neel",name:"Neel Joshi",initials:"NJ",location:"Jaipur, India",specialty:"AI Brand Designer",tools:["Figma AI","Midjourney"],skills:["Brand identity","Packaging"],types:["Branding","Product visuals"],projects:17,rate:480,verified:false,bio:"Making early-stage brands feel like they have always existed in the world.",workflow:"Brand strategy → visual system → AI-assisted art direction → packaging mockups.",palette:["#e4bd69","#bc7748","#466b63"],back:"linear-gradient(135deg,#566e57,#b99657 55%,#e4c487)"}
];
const demoPortfolio = {
  maya:[{title:"Monsoon Botanicals",type:"Campaign visual",tool:"Midjourney"},{title:"Luma Skin launch",type:"Product concept",tool:"Photoshop AI"}],
  arjun:[{title:"Pulse Running",type:"Launch film concept",tool:"Runway"},{title:"Night Shift",type:"Short-form story",tool:"DaVinci Resolve"}],
  zoya:[{title:"Orbit Speaker",type:"Product world",tool:"Blender"},{title:"Soft Form",type:"3D still life",tool:"Stable Diffusion"}],
  kabir:[{title:"Motion / Energy",type:"Motion campaign",tool:"After Effects"},{title:"Future Form",type:"Product film concept",tool:"Runway"}],
  isha:[{title:"Sunday Ritual",type:"Lifestyle concept",tool:"Adobe Firefly"},{title:"Good Earth",type:"Product story",tool:"Lightroom"}],
  dev:[{title:"Make It Matter",type:"Campaign concept",tool:"ChatGPT"},{title:"Small Wins",type:"Social story",tool:"Midjourney"}],
  tara:[{title:"Between Seasons",type:"Fashion film concept",tool:"ComfyUI"},{title:"New Classic",type:"Editorial concept",tool:"Photoshop AI"}],
  neel:[{title:"Mitti House",type:"Identity concept",tool:"Figma AI"},{title:"Kora Objects",type:"Packaging concept",tool:"Midjourney"}]
};
creators = creators.map(creator => ({ ...creator, portfolio: demoPortfolio[creator.id] }));
const byId = id => creators.find(c => c.id === id);
const $ = selector => document.querySelector(selector);
const grid = $("#creator-grid"), backdrop = $("#modal-backdrop"), modal = $("#modal-content");
const API_BASE = ($('meta[name="api-base"]')?.content || "").replace(/\/$/, "");
let pulseArticles = [];
let pulseLoaded = false;
let pulseBusy = false;
let pulseCategory = "all";
let pulseLens = "creator";
let remoteBriefs = null;
let latestCoachPlan = null;
let toastTimer;
let complaintHistory = [];
let complaintBusy = false;
const retailProducts = {
  "rain-shell": { name:"TrailLite rain shell", audience:"Value-minded shoppers comparing outdoor gear", category:"Outdoor apparel" },
  "fresh-keeper": { name:"FreshKeep storage set", audience:"Households looking for practical kitchen storage", category:"Home essentials" },
  brightstart: { name:"BrightStart snack pack", audience:"Busy families comparing everyday lunchbox options", category:"Grocery" }
};
const retailGoals = {
  orders:"Turn product-page visits into purchases",
  feature:"Increase qualified product-page visits",
  launch:"Build awareness for a new product launch"
};
const retailGoalMeasures = {
  orders:{primary:"Item-page visit → order rate",context:"The purchase signal is the primary goal.",measure:outcome=>outcome.measure},
  feature:{primary:"Qualified item-page clicks per view",context:"For this goal, clicks are primary and orders are a downstream signal.",measure:"Compare qualified item-page clicks per view against a matched baseline; monitor orders as a secondary signal."},
  launch:{primary:"Qualified reach → item-page visits",context:"For launch awareness, prioritize reach among the intended audience; clicks and orders are downstream signals.",measure:"Compare qualified unique reach and item-page visits with a matched baseline; track first orders as a secondary signal."}
};
const retailOutcomes = {
  "sales-gap": {
    label:"Strong attention · weak order signal",
    summary:"People noticed the story and visited the item page, but the sample purchase count stayed level with the comparison.",
    metrics:[["12.4K","video views"],["248","item-page clicks"],["3","orders · 3 comparison"],["0%","sample order change"]],
    read:"Attention carried through to product-page visits, but this sample does not show additional orders. The product page, offer, inventory, delivery promise, or attribution may be part of the gap; views alone cannot identify the cause.",
    change:"Move the clearest product proof into the opening, then link directly to the exact item page. Keep audience, offer, and placement the same.",
    measure:"Item-page visit → order rate, with a matched comparison and the same attribution window.",
    guardrail:"Check item availability, price, delivery promise, and tracking before judging the creator or increasing spend.",
    briefChallenge:"The sample content drew attention and product-page visits, but the order count did not rise versus the comparison.",
    briefEvidence:"Illustrative only: 12.4K views, 248 item-page clicks, and 3 orders versus 3 comparison orders. These are simulated values, not retailer data.",
    briefUnknown:"Was the product proof clear, was the item in stock, and did the product page continue the promise? Confirm tracking and compare order rate before changing the creator."
  },
  promising: {
    label:"More clicks · promising order signal",
    summary:"The sample version with a clearer product demonstration earned more item-page visits and orders than its comparison. It still needs validation.",
    metrics:[["11.8K","video views"],["312","item-page clicks"],["21","orders · 16 comparison"],["+31%","sample order change"]],
    read:"The difference is worth investigating, not proof that the creative caused the lift. Confirm comparable reach, spend, stock, pricing, and attribution before drawing a conclusion.",
    change:"Repeat the same product-proof approach with one additional approved item while keeping the audience and placement stable.",
    measure:"Incremental orders versus a matched baseline; include spend and margin before reporting return on investment.",
    guardrail:"Do not describe this sample as measured lift or ROAS. Replicate with verified campaign data before scaling.",
    briefChallenge:"A sample creative variant outperformed its comparison on clicks and orders; confirm the difference can be repeated.",
    briefEvidence:"Illustrative only: 11.8K views, 312 item-page clicks, and 21 orders versus 16 comparison orders. These are simulated values, not retailer data.",
    briefUnknown:"Were audience, spend, stock, price, placement, and attribution comparable? Can the signal repeat on another item?"
  },
  "no-lift": {
    label:"No clear movement yet",
    summary:"The sample result is close to its comparison. That may mean the test was weak, too small, or not yet informative.",
    metrics:[["12.1K","video views"],["92","item-page clicks"],["2","orders · 2 comparison"],["0%","sample order change"]],
    read:"There is no clear difference in this sample. A small or noisy result does not prove the idea cannot work; first locate where the journey loses people and check whether enough qualified traffic arrived.",
    change:"Test two different opening hooks while keeping the offer, product page, audience, and placement fixed.",
    measure:"Qualified item-page clicks per view, then follow the same audience through to orders.",
    guardrail:"Set a minimum sample and run window in advance. Avoid changing multiple parts of the campaign at once.",
    briefChallenge:"The sample result did not move meaningfully versus its comparison; locate the earliest weak step before changing the whole campaign.",
    briefEvidence:"Illustrative only: 12.1K views, 92 item-page clicks, and 2 orders versus 2 comparison orders. These are simulated values, not retailer data.",
    briefUnknown:"Was reach large enough, did the right audience see the content, and which opening hook earns qualified product-page visits?"
  }
};
let retailPilotState = { product:"rain-shell", goal:"orders", outcome:"sales-gap" };
const rootCauseSteps = [
  { short: "Issue", title: "Define the problem", prompt: "What was agreed, and what happened instead?", key: "problem", type: "text", placeholder: "A short, factual summary…" },
  { short: "Causes", title: "Explore possible causes", prompt: "What might explain the gap? Select any possibilities to check.", key: "causes", type: "multi", options: ["The brief or deliverable was unclear", "A deadline or approval was missed", "The scope changed after agreement", "A payment or refund is still processing", "A message, file, or asset is missing", "I’m not sure yet"] },
  { short: "Evidence", title: "Validate with facts", prompt: "Which records can help confirm what happened?", key: "evidence", type: "multi", options: ["Original brief or agreement", "Delivery, invoice, or payment timeline", "Messages and approval notes", "Files, links, or revision history"] },
  { short: "Response", title: "Choose a fair response", prompt: "What would move this toward a practical resolution?", key: "outcome", type: "single", options: ["Ask for a clear status and date", "Agree on a revision or scope", "Clarify a payment or refund", "Pause and align before more work", "Discuss usage, credit, or rights"] },
  { short: "Details", title: "Gather useful details", prompt: "What important information is still missing?", key: "missing", type: "text", placeholder: "For example: the agreed due date, version delivered, or last reply…" }
];
let rootCauseState = { problem: "", causes: new Set(), evidence: new Set(), outcome: "", missing: "" };
let rootCauseStep = 0;
let demoTourStep = -1;
let activeWorkspaceView = "explore";
const clarityGuidance = {
  explore:{step:"define",context:"Start with the outcome you need. Compare creator fit against their visible work and workflow.",detail:["Define the audience and change you want.","Use the blocker to decide which skill or format matters.","Treat sample portfolios and rates as illustrative until confirmed."]},
  coach:{step:"causes",context:"Read campaign outcomes as signals. Compare possible explanations with evidence, then test one change at a time.",detail:["Separate what you observed from what you think caused it.","Check the next available metric in the campaign path.","Change one variable and compare a fair baseline before deciding."]},
  retail:{step:"evidence",context:"Connect a product, creator fit, and outcome. Treat every sample metric as illustrative until a real pilot can verify it.",detail:["Start with one product and one measurable goal.","Confirm creator fit, audience, disclosures, and usage rights.","Compare the result with a fair baseline before scaling."]},
  pulse:{step:"causes",context:"Treat an update as a signal, not a conclusion. Explore what may be changing before you decide it affects your campaign.",detail:["Name the question the update raises.","Consider possible effects on creators, brands, or platforms.","Keep a signal separate from a verified cause until you check the source."]},
  profile:{step:"evidence",context:"Use the profile as evidence to inspect, not a guarantee. Check relevant work, workflow, availability, quote, and rights directly.",detail:["Compare sample work with the exact deliverable.","Ask how the creator will make and deliver the work.","Confirm portfolio ownership, availability, quote, revisions, and usage terms."]},
  briefs:{step:"details",context:"Turn the diagnosis into a shared plan. Surface missing scope, evidence, budget, timing, and usage decisions.",detail:["Record the outcome and the obstacle behind the request.","Separate confirmed evidence from assumptions to test.","Agree on deliverables, budget, deadline, revisions, and rights before work starts."]},
  complaints:{step:"solution",context:"Separate what happened from what might have caused it, check the records, then choose a fair next step.",detail:["Describe the gap between the agreement and what happened.","Explore more than one possible cause and check available records.","Ask for a practical next move, then note what still needs confirming."]},
  brief:{step:"define",context:"A brief is clearer when it explains the desired outcome, the current blocker, what is known, and what remains open.",detail:["Describe the change or result you want.","Explain the blocker without assigning blame.","Mark assumptions as questions and list what should be confirmed before production."]}
};
const localBriefs = () => { try { return JSON.parse(localStorage.getItem("creatorbridge-briefs") || "[]"); } catch { return []; } };
const briefs = () => remoteBriefs ?? localBriefs();
async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);
  return payload;
}

function escapeHtml(value=""){return String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));}
function unique(items){return [...new Set(items)].sort((a,b)=>a.localeCompare(b));}
const matchDirections = [
  { label: "film & motion", request: /film|video|cinematic|motion|animation|runway|camera|short[- ]form/, profile: /film|video|motion|animation|cinematic|runway|editing|storyboard/ },
  { label: "product storytelling", request: /product|launch|packaging|object|render|unboxing/, profile: /product|render|packaging|still life|lighting|compositing/ },
  { label: "brand worlds", request: /brand|identity|visual system|campaign|logo/, profile: /brand|art direction|visual world|campaign|identity|packaging/ },
  { label: "social storytelling", request: /social|reel|instagram|creator|copy|storytelling|audience/, profile: /social|short-form|story|storyboard|copywriting|audience/ },
  { label: "fashion & editorial", request: /fashion|editorial|styling|wardrobe|apparel/, profile: /fashion|editorial|styling|apparel|material|movement/ },
  { label: "lifestyle imagery", request: /lifestyle|daily|home|food|people|wellness|natural|runner|running/, profile: /lifestyle|photography|retouch|fashion|people|motion|story/ },
  { label: "3D & immersive", request: /\b3d\b|render|surreal|immersive|world/, profile: /\b3d\b|render|blender|product universe|texture/ }
];
const typeFamilies = {
  video: ["video", "reel", "motion"], social: ["social", "reel"],
  "product visuals": ["product", "branding"], campaign: ["campaign", "social", "video"],
  branding: ["branding", "campaign"], editorial: ["editorial", "fashion"]
};
function briefFitMatches(brief) {
  const idea = `${brief.idea || ""} ${brief.style || ""} ${brief.challenge || ""}`.toLowerCase();
  const requestedTools = unique(creators.flatMap(creator => creator.tools)).filter(tool => idea.includes(tool.toLowerCase()));
  const requestedDirections = matchDirections.filter(direction => direction.request.test(idea));
  const requestedType = String(brief.type || brief.contentType || "").trim().toLowerCase();
  const families = typeFamilies[requestedType] || [requestedType];
  const hasBudget = Number.isFinite(Number(brief.budget)) && Number(brief.budget) > 0;
  return creators.map(creator => {
    const profile = [creator.specialty, creator.bio, creator.workflow, ...(creator.skills || []), ...(creator.types || []), ...(creator.tools || [])].join(" ").toLowerCase();
    const dimensions = [];
    if (requestedType) {
      const creatorTypes = (creator.types || []).map(type => type.toLowerCase());
      const formatScore = creatorTypes.some(type => families.some(family => type.includes(family))) ? 100 : 24;
      dimensions.push({ weight: 35, score: formatScore, reason: formatScore === 100 ? `${brief.type || brief.contentType} format` : "Adjacent format" });
    }
    if (requestedTools.length) {
      const matches = requestedTools.filter(tool => (creator.tools || []).some(ownTool => ownTool.toLowerCase() === tool.toLowerCase()));
      const score = matches.length === requestedTools.length ? 100 : matches.length ? 58 : 0;
      dimensions.push({ weight: 25, score, reason: matches.length ? `Workflow uses ${matches.join(" + ")}` : "No named tool overlap" });
    }
    if (requestedDirections.length) {
      const matched = requestedDirections.filter(direction => direction.profile.test(profile));
      const score = Math.round((matched.length / requestedDirections.length) * 100);
      dimensions.push({ weight: 30, score, reason: matched.length ? `Creative overlap: ${matched.map(item => item.label).join(", ")}` : "Creative direction is less aligned" });
    }
    if (hasBudget) {
      const budget = Number(brief.budget);
      const score = creator.rate <= budget ? 100 : Math.max(0, Math.round(100 - ((creator.rate - budget) / budget) * 100));
      dimensions.push({ weight: 10, score, reason: score === 100 ? "Within illustrative sample rate" : "Above illustrative sample rate" });
    }
    const totalWeight = dimensions.reduce((sum, item) => sum + item.weight, 0);
    const score = totalWeight ? Math.round(dimensions.reduce((sum, item) => sum + item.score * item.weight, 0) / totalWeight) : 50;
    const reasons = dimensions.filter(item => item.score >= 58).map(item => item.reason);
    return { creator, score, reasons: reasons.slice(0, 3) };
  }).sort((a, b) => b.score - a.score || a.creator.name.localeCompare(b.creator.name)).slice(0, 3);
}
function populateFilters(){
  const groups=[["#specialty-filter",unique(creators.map(c=>c.specialty))],["#tool-filter",unique(creators.flatMap(c=>c.tools))],["#type-filter",unique(creators.flatMap(c=>c.types))]];
  groups.forEach(([selector,values])=>values.forEach(value=>$(selector).insertAdjacentHTML("beforeend",`<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)));
}
function renderCreators(){
  const query=$("#search-input").value.trim().toLowerCase(), specialty=$("#specialty-filter").value, tool=$("#tool-filter").value, type=$("#type-filter").value, sort=$("#sort-select").value;
  let found=creators.filter(c=>{
    const searchFields=[c.name,c.specialty,...c.tools,...c.skills,...c.types].join(" ").toLowerCase();
    return (!query||searchFields.includes(query))&&(!specialty||c.specialty===specialty)&&(!tool||c.tools.includes(tool))&&(!type||c.types.includes(type));
  });
  if(sort==="name")found.sort((a,b)=>a.name.localeCompare(b.name)); else if(sort==="projects")found.sort((a,b)=>b.projects-a.projects);
  $("#result-count").textContent=found.length;
  if(!found.length){grid.innerHTML='<div class="empty-state"><span>⌕</span><strong>No creators found</strong><p>Try changing your search or filters.</p><button class="button button-secondary" onclick="clearFilters()">Clear filters</button></div>';return;}
  grid.innerHTML=found.map(c=>`<article class="creator-card">
    <div class="card-art" style="background:${c.back}"><span class="art-orb" style="background:radial-gradient(circle at 32% 27%,${c.palette[0]},${c.palette[1]} 60%,${c.palette[2]})"></span><span class="art-shape"></span><span class="art-caption">${escapeHtml(c.specialty)}</span><span class="work-count">DEMO · ✦ ${(c.portfolio||[]).length} concepts</span></div>
    <div class="card-body"><div class="profile-line"><span class="creator-avatar" style="background:${c.palette[0]}55;color:${c.palette[1]}">${c.initials}</span><span><span class="creator-name">${escapeHtml(c.name)}${c.verified?'<i class="verified-mark" title="Creator-provided profile details">✓</i>':''}</span><span class="creator-location">${escapeHtml(c.location)}</span></span><span class="profile-specialty">${escapeHtml(c.specialty)}</span></div>
    <p class="card-bio">${escapeHtml(c.bio)}</p><div class="tag-row">${c.tools.slice(0,2).map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join("")}${c.skills.slice(0,1).map(s=>`<span class="tag neutral">${escapeHtml(s)}</span>`).join("")}</div>
    <div class="card-bottom"><span class="rate">Illustrative <strong>₹${c.rate.toLocaleString("en-IN")}</strong> / project</span><button class="view-profile" data-profile="${c.id}">View profile ↗</button></div></div></article>`).join("");
}
function clearFilters(){$("#search-input").value="";["#specialty-filter","#tool-filter","#type-filter"].forEach(s=>$(s).value="");renderCreators();}
window.clearFilters=clearFilters;

function updateClarityMethod(view=activeWorkspaceView){
  const guide=clarityGuidance[view]||clarityGuidance.explore;
  $("#clarity-method-context").textContent=guide.context;
  document.querySelectorAll("[data-clarity-step]").forEach(item=>{
    const active=item.dataset.clarityStep===guide.step;
    item.classList.toggle("is-current",active);
    if(active)item.setAttribute("aria-current","step");else item.removeAttribute("aria-current");
  });
  const detail=$("#clarity-method-detail");
  detail.replaceChildren();
  const list=document.createElement("ol");
  guide.detail.forEach(line=>{const item=document.createElement("li");item.textContent=line;list.append(item);});
  detail.append(list);
}

function showModal(html){modal.innerHTML=html;backdrop.classList.remove("hidden");document.body.style.overflow="hidden";const first=modal.querySelector("button,input,select,textarea");if(first)first.focus();}
function closeModal(){backdrop.classList.add("hidden");document.body.style.overflow="";modal.innerHTML="";updateClarityMethod(activeWorkspaceView);}
function profileModal(id){
  const c=byId(id);if(!c)return;
  updateClarityMethod("profile");
  const passportChecks=[
    ["Identity & account","DEMO ONLY","No identity review or creator account is connected."],
    ["Portfolio & ownership","ILLUSTRATIVE","Sample concepts are not proof of commissioned work or ownership."],
    ["Audience & performance","NO DATA","No platform analytics, audience geography, or performance data is connected."],
    ["Availability & quote","TO CONFIRM","Availability and the listed illustrative rate need direct confirmation."],
    ["Disclosure & claims","TO AGREE","Set sponsorship disclosure and product-claim review for each campaign."],
    ["Commercial usage rights","NOT GRANTED","Agree channels, territory, term, edits, and paid usage in writing."]
  ];
  const passportHtml=passportChecks.map(([label,status,detail],index)=>`<article class="passport-check"><div class="passport-check-top"><span class="passport-number">0${index+1}</span><span class="passport-state">${status}</span></div><strong>${label}</strong><p>${detail}</p></article>`).join("");
  showModal(`<div class="profile-hero"><span class="creator-avatar" style="background:${c.palette[0]}55;color:${c.palette[1]}">${c.initials}</span><div><h3 id="modal-title">${escapeHtml(c.name)}${c.verified?'<i class="verified-mark" title="Creator-provided profile details">✓</i>':''}</h3><p>${escapeHtml(c.specialty)} · ${escapeHtml(c.location)}</p></div></div>
    <div class="profile-section"><h4>SELECTED WORK <span class="section-note">ILLUSTRATIVE DEMO CONCEPTS</span></h4><div class="portfolio-grid">${(c.portfolio||[]).map((work,index)=>`<article class="portfolio-tile" style="--cover-a:${c.palette[index%c.palette.length]};--cover-b:${c.palette[(index+1)%c.palette.length]}"><div class="portfolio-cover"><span>✳</span><small>CONCEPT ${index+1}</small></div><div class="portfolio-caption"><strong>${escapeHtml(work.title)}</strong><small>${escapeHtml(work.type)} · ${escapeHtml(work.tool)}</small></div></article>`).join("")}</div></div>
    <div class="profile-section"><h4>ABOUT</h4><p>${escapeHtml(c.bio)} This is a demo creator profile prepared for the hackathon prototype.</p><div class="profile-stats"><span><strong>${(c.portfolio||[]).length}</strong>Sample concepts</span><span><strong>${c.tools.length}</strong>AI tools listed</span><span><strong>₹${c.rate.toLocaleString("en-IN")}</strong>Illustrative rate</span></div></div>
    <div class="profile-section"><h4>TOOLS & SKILLS</h4><div class="tag-row">${[...c.tools,...c.skills].map(x=>`<span class="tag">${escapeHtml(x)}</span>`).join("")}</div></div>
    <div class="profile-section"><h4>WORKFLOW</h4><p>${escapeHtml(c.workflow)}</p></div>
    <section class="profile-section proof-passport" aria-labelledby="proof-passport-title"><div class="passport-heading"><div><span class="passport-kicker">CREATOR PROOF PASSPORT</span><h4 id="proof-passport-title">Check the evidence before you book.</h4></div><span class="passport-count">0 / 6 confirmed</span></div><p class="passport-intro">This demo profile has no independently verified items. Review what needs evidence, and agree campaign terms directly with the creator.</p><div class="passport-check-grid">${passportHtml}</div><div class="passport-note"><strong>Passport status</strong><span>Demo only · no identity, audience, ownership, availability, or rights checks have been performed.</span></div><button class="button passport-action" type="button" data-start-passport="${c.id}">Draft a verification checklist <span>↗</span></button></section>
    <div class="profile-section creator-validation"><h4>CHECK THE FIT BEFORE YOU COMMIT</h4><ul><li>Compare the sample concepts with the exact deliverable you need.</li><li>Ask about availability, scope, revisions, and a written quote.</li><li>Agree on commercial usage, credit, and final-file handoff.</li></ul></div>
    <div class="profile-footer"><span class="disclaimer">Demo profile · Not independently verified</span><button class="button button-primary" data-start-brief="${c.id}">Invite to a brief ↗</button></div>`);
}

function saveBriefs(rows){localStorage.setItem("creatorbridge-briefs",JSON.stringify(rows));if(remoteBriefs!==null)remoteBriefs=rows;updateBriefCount();}
async function refreshRemoteBriefs(){try{remoteBriefs=await apiRequest("/api/briefs");localStorage.setItem("creatorbridge-briefs",JSON.stringify(remoteBriefs));}catch{remoteBriefs=null;}updateBriefCount();}
function updateBriefCount(){$("#brief-count").textContent=briefs().length;}
function openBriefForm(creatorId="",options={}){
  const c=creatorId?byId(creatorId):null;
  updateClarityMethod("brief");
  showModal(`<div class="modal-head"><div><h2 id="modal-title">${options.demo?"From one idea to a short list":"Create a campaign brief"}</h2><p>${options.demo?"A 20-second launch film · sample matching walkthrough":"Set the direction. Your creator brings it to life."}</p></div><button class="close-modal" data-close aria-label="Close">×</button></div>
    <form id="brief-form" class="modal-content"><div class="ai-assist"><div class="ai-assist-head"><span class="ai-star">✦</span><span><strong>AI brief starter</strong><small>Turn a rough idea into an editable campaign draft.</small></span></div><textarea id="ai-idea" placeholder="e.g. A launch film for a new running shoe that feels energetic and optimistic"></textarea><div class="ai-assist-actions"><span id="ai-status" role="status">Uses the server-side Gemini API key.</span><button class="button button-secondary" id="generate-ai" type="button">Generate draft ✦</button></div></div><div class="form-grid">
      <div class="form-field full"><label for="brief-title">Campaign title *</label><input id="brief-title" name="title" required placeholder="e.g. Summer launch film" /></div>
      <div class="form-field"><label for="brand-name">Brand or team *</label><input id="brand-name" name="brand" required value="BYTE BLAST" placeholder="Your brand" /></div>
      <div class="form-field"><label for="brief-type">Content type *</label><select id="brief-type" name="type" required><option value="">Choose a format</option><option>Video</option><option>Social</option><option>Product visuals</option><option>Campaign</option><option>Branding</option><option>Editorial</option></select></div>
      <div class="form-field"><label for="brief-style">Style or mood</label><input id="brief-style" name="style" placeholder="e.g. Warm, cinematic" /></div>
      <div class="form-field"><label for="brief-ratio">Aspect ratio</label><select id="brief-ratio" name="ratio"><option>9:16 · Vertical</option><option>1:1 · Square</option><option>4:5 · Portrait</option><option>16:9 · Landscape</option><option>Flexible</option></select></div>
      <div class="form-field full"><label for="brief-idea">The idea *</label><textarea id="brief-idea" name="idea" required placeholder="What are you making, and what should it make people feel or do?"></textarea></div>
      <section class="brief-diagnosis form-field full" aria-labelledby="brief-diagnosis-title"><div class="brief-diagnosis-heading"><span>THINK IT THROUGH</span><h3 id="brief-diagnosis-title">A stronger brief starts with the reason.</h3><p>Optional notes help creators understand the need behind the deliverable. Separate what you know from what you still need to test.</p></div><div class="form-grid"><div class="form-field full"><label for="brief-challenge">What is the main blocker or opportunity?</label><textarea id="brief-challenge" name="challenge" maxlength="600" placeholder="e.g. People notice the product but do not understand what makes it different."></textarea></div><div class="form-field"><label for="brief-evidence">What do you know so far?</label><textarea id="brief-evidence" name="evidence" maxlength="600" placeholder="e.g. Feedback, past results, or audience questions."></textarea></div><div class="form-field"><label for="brief-unknowns">What should we confirm?</label><textarea id="brief-unknowns" name="unknowns" maxlength="600" placeholder="e.g. Which message or format resonates most?"></textarea></div></div></section>
      <div class="form-field"><label for="brief-budget">Budget (₹)</label><input id="brief-budget" name="budget" type="number" min="0" placeholder="Optional" /></div>
      <div class="form-field"><label for="brief-deadline">Target deadline</label><input id="brief-deadline" name="deadline" type="date" /></div>
      <div class="form-field full"><label class="check-field"><input name="commercial" type="checkbox" /> Commercial usage rights are required</label></div>
      <input name="creator" type="hidden" value="${c?.id||""}" />
    </div><section class="match-preview" id="match-preview" aria-live="polite"></section><div class="form-actions"><button class="button button-secondary" type="button" data-close>Cancel</button><button class="button button-primary" type="submit">Save brief <span>↗</span></button></div></form>`);
  if(options.passport){
    $("#modal-title").textContent="Creator proof review · draft";
    $("#modal-title").parentElement.querySelector("p").textContent="Evidence checklist · review and edit before saving.";
    $("#brief-title").value="Proof review · "+(c?.name||"creator");
    $("#brand-name").value="BYTE BLAST";
    $("#brief-type").value="Campaign";
    $("#brief-style").value="Creator diligence · confirm before booking";
    $("#brief-idea").value="Before booking "+(c?.name||"this creator")+", review the Creator Proof Passport and confirm identity, portfolio ownership, audience evidence, availability, disclosure, and commercial usage terms.";
    $("#brief-challenge").value="Profile details and sample concepts are illustrative until the creator provides current evidence.";
    $("#brief-evidence").value="Listed specialty: "+(c?.specialty||"Not listed")+". Tools: "+((c?.tools||[]).join(", ")||"Not listed")+". Listed rate is illustrative; confirm a written quote.";
    $("#brief-unknowns").value="Which audience and portfolio details can the creator substantiate? What disclosure, deliverables, revision, licensing term, territory, channels, and paid usage have both parties agreed?";
    $("#ai-idea").value="Prepare a creator review brief for "+(c?.name||"a creator")+". Separate creator-provided information from independently checked evidence; list open questions for audience, portfolio ownership, availability, disclosure, and commercial usage rights.";
    $("#brief-form [name=commercial]").checked=true;
  }else if(options.demo){
    $("#brief-title").value="City after rain · launch film";
    $("#brand-name").value="Monsoon Running · demo";
    $("#brief-type").value="Video";
    $("#brief-style").value="Cinematic, hopeful, fast-moving; rain into sunrise.";
    $("#brief-idea").value="Create a 20-second vertical launch film for a sustainable running jacket. Follow a city runner through Mumbai monsoon rain into a bright sunrise. Make it cinematic and optimistic for Instagram Reels; use Runway and DaVinci Resolve for AI-assisted footage and editorial finishing.";
    $("#brief-challenge").value="People notice the jacket, but do not yet understand its weather protection and sustainability story.";
    $("#brief-evidence").value="The product team has heard repeated questions about rain performance and recycled materials.";
    $("#brief-unknowns").value="Which proof point matters most to runners, and can we show it clearly in 20 seconds?";
    $("#ai-idea").value="A short cinematic, optimistic launch film for a sustainable running jacket, following a runner through monsoon rain into sunrise. Made for Instagram Reels.";
  }else if(options.news){
    const story=options.news;
    $("#brief-title").value=`Story signal: ${String(story.title||"").slice(0,56)}`;
    $("#brief-type").value="Campaign";
    $("#brief-idea").value=`Develop an original campaign inspired by this industry signal. Do not copy the article or its creative work.\n\nStory: ${story.title}\n${story.summary||""}\n\nSource: ${story.url}`;
    $("#brief-evidence").value=`Signal to verify: ${story.source||"Publisher"} · ${story.title}`;
    $("#brief-unknowns").value="Does this update change the needs of our specific audience or campaign? Check the publisher source before acting.";
    $("#ai-idea").value=`Draft an original campaign brief informed by this industry update: ${story.title}`;
  }else if(options.coach){
    const {input,result}=options.coach;
    const test=result.experiments?.[0];
    $("#brief-title").value=`${input.platform||"Campaign"} · next test`;
    $("#brand-name").value="BYTE BLAST";
    $("#brief-type").value="Social";
    $("#brief-style").value="Focused test · change one variable";
    $("#brief-idea").value=[`Goal: ${input.goal}`,`Next experiment: ${test?.title||"Run one focused campaign test"}`,test?.change&&`Change: ${test.change}`,test?.measure&&`Measure: ${test.measure}`].filter(Boolean).join("\n\n");
    $("#brief-challenge").value=input.observation;
    $("#brief-evidence").value=input.knownSignals;
    $("#brief-unknowns").value=result.causes?.[0]?.evidenceToCheck?.[0]||"Which single change improves the campaign outcome? Compare it with a fair baseline.";
    $("#ai-idea").value=`Create a campaign test for ${input.goal}. Keep the creative focused on one change and measure ${test?.measure||"the intended campaign outcome"}.`;
  }
  $("#brief-form").addEventListener("input",renderMatchPreview);
  $("#brief-form").addEventListener("change",renderMatchPreview);
  if(options.demo||c||options.news||options.coach)renderMatchPreview();
$("#brief-title").focus();
}
function renderMatchPreview(){
  const form=$("#brief-form"),host=$("#match-preview");if(!form||!host)return;
  const fields=new FormData(form),brief={idea:fields.get("idea"),style:fields.get("style"),type:fields.get("type"),budget:fields.get("budget"),challenge:fields.get("challenge"),evidence:fields.get("evidence"),unknowns:fields.get("unknowns"),deadline:fields.get("deadline"),commercial:fields.has("commercial")};
  const selected=String(fields.get("creator")||"");
  const results=briefFitMatches(brief);
  if(!brief.idea?.trim()&&!brief.type&&!brief.style){host.innerHTML="";return;}
  const openChecks=[!brief.challenge&&"main blocker",!brief.evidence&&"evidence",!brief.unknowns&&"open question",!brief.budget&&"budget",!brief.deadline&&"deadline",!brief.commercial&&"usage rights"].filter(Boolean);
  host.innerHTML=`<div class="match-results-head"><div><span class="match-eyebrow">CREATORBRIDGE MATCH EXPLAINER</span><h3>Three creators to explore</h3><p>Based on the format, tools, and creative direction in this brief.</p></div><button class="button button-match" id="find-matches" type="button">Refresh matches <span>↻</span></button></div><div class="match-method"><span>01 · Format</span><span>02 · Named tools</span><span>03 · Creative direction</span>${brief.budget?"<span>04 · Sample rate</span>":""}</div><div class="match-list">${results.map((item,index)=>{
    const creator=item.creator,isSelected=selected===creator.id;
    return `<article class="match-result-card${isSelected?" is-selected":""}"><span class="match-rank">0${index+1}</span><span class="match-avatar" style="--avatar:${creator.palette[0]};--ink:${creator.palette[1]}">${escapeHtml(creator.initials)}</span><div class="match-result-main"><div class="match-creator-line"><strong>${escapeHtml(creator.name)}</strong><span>${escapeHtml(creator.specialty)}</span></div><div class="match-reasons">${(item.reasons.length?item.reasons:["Related creative profile"]).map(reason=>`<span>${escapeHtml(reason)}</span>`).join("")}</div></div><div class="match-score"><strong>${item.score}%</strong><small>brief fit</small></div><button class="button button-select-match${isSelected?" selected":""}" type="button" data-select-match="${creator.id}" aria-pressed="${isSelected}">${isSelected?"Selected ✓":"Choose"}</button></article>`;
  }).join("")}</div><div class="match-evidence-note"><strong>Before you choose</strong><span>${openChecks.length?`Still to clarify: ${openChecks.join(", ")}.`:`Your brief has the main decision details.`} Confirm the creator’s actual availability, quote, work samples, and rights directly.</span></div><p class="match-disclaimer">A transparent rules-based estimate, not an AI decision or guarantee. Demo profiles and rates are illustrative and unverified; confirm fit and pricing with creators.</p>`;
}
function pulsePerspective(article,lens){
  const perspectives={
    "AI & tools":{
      creator:"Creator lens · Check tool access, commercial terms, and how the tool fits your own workflow before quoting it.",
      brand:"Brand lens · State what tools are optional or required, then confirm ownership and usage rights with the creator."
    },
    Platforms:{
      creator:"Creator lens · Check whether any new feature or earning option is available to your account and region.",
      brand:"Brand lens · Confirm the audience, format, and platform requirements with the creator before locking the brief."
    },
    "Creator economy":{
      creator:"Creator lens · Make scope, revisions, credits, and usage rights clear before agreeing to a rate.",
      brand:"Brand lens · Budget separately for production, revisions, and the usage rights your campaign needs."
    }
  };
  return perspectives[article.category]?.[lens]||perspectives["Creator economy"][lens];
}
function renderPulse(){
  const host=$("#pulse-grid");if(!host)return;
  const filtered=pulseArticles.map((article,index)=>({article,index})).filter(({article})=>pulseCategory==="all"||article.category===pulseCategory);
  if(!filtered.length){host.innerHTML='<div class="pulse-empty"><span>◷</span><strong>No recent stories in this view</strong><p>Try another topic, change perspective, or refresh the publisher feeds.</p></div>';return;}
  host.innerHTML=filtered.map(({article,index})=>{
    const published=Date.parse(article.publishedAt);
    const date=Number.isFinite(published)?new Date(published).toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"}):"Recent";
    return `<article class="pulse-card"><div class="pulse-card-top"><span class="pulse-category">${escapeHtml(article.category)}</span><time datetime="${escapeHtml(article.publishedAt)}">${escapeHtml(date)}</time></div><h3>${escapeHtml(article.title)}</h3><p class="pulse-summary">${escapeHtml(article.summary||"Open the publisher’s story for the full update.")}</p><div class="pulse-perspective">${escapeHtml(pulsePerspective(article,pulseLens))}</div><div class="pulse-card-actions"><a href="${escapeHtml(article.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(article.source)} source ↗</a><button type="button" data-pulse-brief="${index}">Use as a brief signal <span>↗</span></button></div></article>`;
  }).join("");
}
async function loadPulse(force=false){
  if(pulseBusy||(!force&&pulseLoaded))return;
  pulseBusy=true;const refresh=$("#refresh-news"),status=$("#pulse-status"),update=$("#pulse-update");
  refresh.disabled=true;refresh.classList.add("is-loading");status.textContent="Checking official publisher feeds…";status.classList.remove("is-error");
  try{
    const payload=await apiRequest("/api/news");pulseArticles=Array.isArray(payload.articles)?payload.articles:[];pulseLoaded=true;
    const updated=payload.updatedAt?new Date(payload.updatedAt):new Date();
    update.innerHTML=`<i></i> Updated ${escapeHtml(updated.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"}))}${payload.cached?" · cached briefly to keep feeds quick":" · live publisher feeds"}${payload.partial?" · one source unavailable":""}`;
    status.textContent=pulseArticles.length?`${pulseArticles.length} recent stories from official publisher feeds. Select a perspective to see questions to consider.`:"No recent articles were returned. Open a publisher feed below or refresh later.";
    renderPulse();
  }catch(error){
    pulseLoaded=true;status.textContent=error.message||"The publisher feeds are unavailable right now.";status.classList.add("is-error");
    update.innerHTML="<i></i> Feed connection unavailable · try again shortly";
    $("#pulse-grid").innerHTML='<div class="pulse-empty"><span>↻</span><strong>News feeds could not be reached</strong><p>Use the direct publisher links below or try refreshing in a moment.</p></div>';
  }finally{pulseBusy=false;refresh.disabled=false;refresh.classList.remove("is-loading");}
}
function briefClarity(b){return [
  {label:"goal",done:Boolean(b.idea?.trim())},
  {label:"blocker",done:Boolean(b.challenge?.trim())},
  {label:"evidence",done:Boolean(b.evidence?.trim())},
  {label:"open question",done:Boolean(b.unknowns?.trim())},
  {label:"budget",done:b.budget!==""&&b.budget!=null&&Number(b.budget)>0},
  {label:"deadline",done:Boolean(b.deadline)},
  {label:"usage rights",done:Boolean(b.commercialUse??b.commercial)}
];}
function showBriefReview(row){
  const checks=briefClarity(row),next=checks.filter(item=>!item.done).map(item=>item.label);
  const note=(value,label)=>`<div><span>${label}</span><p>${escapeHtml(value?.trim()||"Not captured yet")}</p></div>`;
  showModal(`<div class="modal-head"><div><h2 id="modal-title">${escapeHtml(row.title)}</h2><p>${escapeHtml(row.brand)} · ${escapeHtml(row.contentType||row.type||"Campaign")} · Draft</p></div><button class="close-modal" data-close aria-label="Close">×</button></div><div class="modal-content brief-review"><div class="brief-review-summary"><span class="brief-review-count">${checks.filter(item=>item.done).length}/${checks.length}</span><div><strong>Clarity check</strong><p>${next.length?`Before work starts, clarify: ${escapeHtml(next.join(", "))}.`:"The core planning details are captured. Confirm them with your creator."}</p></div></div><section class="brief-review-section"><h3>THE REQUEST</h3>${note(row.idea,"Goal and idea")}${note(row.challenge,"Blocker or opportunity")}</section><section class="brief-review-section"><h3>WHAT WE KNOW</h3>${note(row.evidence,"Evidence so far")}${note(row.unknowns,"Question to confirm")}</section><section class="brief-review-section"><h3>DETAILS TO AGREE</h3><p>Format: ${escapeHtml(row.contentType||row.type||"Not specified")} · Style: ${escapeHtml(row.style||"Not specified")} · Ratio: ${escapeHtml(row.aspectRatio||row.ratio||"Flexible")}</p><p>Budget: ${row.budget?`₹${escapeHtml(row.budget)}`:"Not specified"} · Deadline: ${escapeHtml(row.deadline||"Not specified")} · Commercial usage: ${row.commercialUse??row.commercial?"Required":"Not specified"}</p><small>Confirm scope, revision rounds, usage rights, delivery date, and final-file handoff directly with the creator.</small></section></div>`);
}
function renderBriefs(){
  const items=briefs(), host=$("#brief-list");
  if(!items.length){host.innerHTML='<div class="brief-empty"><div class="empty-symbol">▤</div><h2>Your next idea starts here.</h2><p>Create a brief to give creators a clear starting point for your campaign.</p><button class="button button-primary" id="empty-create">＋ Create your first brief</button></div>';return;}
  host.innerHTML=items.slice().reverse().map(b=>{const checks=briefClarity(b),open=checks.find(item=>!item.done);return `<article class="brief-row"><div class="brief-main"><span class="brief-icon">▤</span><span><h3>${escapeHtml(b.title)}</h3><p>${escapeHtml(b.brand)} · ${escapeHtml(b.contentType||b.type||"Campaign")}${b.creator?` · For ${escapeHtml(byId(b.creator)?.name||"creator")}`:""}</p><span class="brief-health"><strong>${checks.filter(item=>item.done).length}/${checks.length}</strong> clarity signals captured</span><small class="brief-next-check">${open?`Next to clarify: ${escapeHtml(open.label.toLowerCase())}`:"Review the agreement with your creator before work starts."}</small></span></div><div class="brief-meta"><span>${escapeHtml(b.createdAt)}</span><span class="status-pill">Draft</span><button class="view-profile" data-brief="${escapeHtml(b.id)}">Review ↗</button></div></article>`;}).join("");
}
function renderRetailOutcome(){
  const product=retailProducts[retailPilotState.product]||retailProducts["rain-shell"];
  const outcome=retailOutcomes[retailPilotState.outcome]||retailOutcomes["sales-gap"];
  const goalMeasure=retailGoalMeasures[retailPilotState.goal]||retailGoalMeasures.orders;
  const primaryMeasure=typeof goalMeasure.measure==="function"?goalMeasure.measure(outcome):goalMeasure.measure;
  $("#retail-product-audience").textContent=product.audience;
  $("#retail-outcome-result").innerHTML='<article class="retail-result-card"><header class="retail-result-head"><div><span>SIMULATED RESULT · '+escapeHtml(product.name)+' · '+escapeHtml(retailGoals[retailPilotState.goal])+'</span><h3>'+escapeHtml(outcome.label)+'</h3><p>'+escapeHtml(outcome.summary)+'</p></div><span class="retail-sample-stamp">SAMPLE<br>ONLY</span></header><div class="retail-metric-grid">'+outcome.metrics.map(metric=>'<div class="retail-metric"><strong>'+escapeHtml(metric[0])+'</strong><span>'+escapeHtml(metric[1])+'</span></div>').join("")+'</div><div class="retail-readout-grid"><article><span>WHAT THIS SIGNAL MAY MEAN</span><p>'+escapeHtml(outcome.read+" "+goalMeasure.context)+'</p></article><article class="retail-next-test"><span>ONE CONTROLLED NEXT TEST</span><p><strong>Change</strong>'+escapeHtml(outcome.change)+'</p><p><strong>Primary metric · '+escapeHtml(goalMeasure.primary)+'</strong>'+escapeHtml(primaryMeasure)+'</p><p><strong>Guardrail</strong>'+escapeHtml(outcome.guardrail)+'</p></article></div><div class="retail-result-foot"><p>All values above are invented for this walkthrough. No Walmart or customer data is connected.</p><button class="button retail-brief-button" id="retail-create-brief" type="button">Turn this into a draft brief <span>↗</span></button></div></article>';
}
function openRetailDemoBrief(){
  const product=retailProducts[retailPilotState.product]||retailProducts["rain-shell"];
  const outcome=retailOutcomes[retailPilotState.outcome]||retailOutcomes["sales-gap"];
  const goal=retailGoals[retailPilotState.goal]||retailGoals.orders;
  const goalMeasure=retailGoalMeasures[retailPilotState.goal]||retailGoalMeasures.orders;
  openBriefForm("",{demo:true});
  $("#modal-title").textContent="Retail pilot · draft brief";
  $("#modal-title").parentElement.querySelector("p").textContent="Illustrative scenario · review and edit before saving.";
  $("#brief-title").value="Retail pilot · "+product.name;
  $("#brand-name").value="Retail pilot demo · fictional";
  $("#brief-type").value="Video";
  $("#brief-style").value="Clear product proof, an everyday use case, and one controlled creative test.";
  $("#brief-idea").value=["Product: "+product.name+" ("+product.category+"; fictional demo item)","Goal: "+goal,"Audience: "+product.audience,"Next experiment: "+outcome.change,"Primary metric: "+goalMeasure.primary,"Measure: "+goalMeasure.measure(outcome)].join("\n\n");
  $("#brief-challenge").value=outcome.briefChallenge;
  $("#brief-evidence").value=outcome.briefEvidence;
  $("#brief-unknowns").value=outcome.briefUnknown;
  $("#ai-idea").value="Draft an editable retail creator pilot brief for the fictional sample product "+product.name+". Goal: "+goal+". Include one controlled experiment and a measurable baseline. Do not claim sample results are real.";
  renderMatchPreview();
  $("#brief-title").focus();
}
function showView(name){
  const views={explore:"#explore-view",coach:"#coach-view",retail:"#retail-view",pulse:"#pulse-view",briefs:"#briefs-view",complaints:"#complaints-view"};
  Object.entries(views).forEach(([key,selector])=>$(selector).classList.toggle("hidden",key!==name));
  activeWorkspaceView=name;updateClarityMethod(name);
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("is-active",b.dataset.view===name));
  $("#breadcrumb-current").textContent={explore:"Explore creators",coach:"Campaign coach",retail:"Retail pilot",pulse:"Creator Pulse",briefs:"My briefs",complaints:"Resolution studio"}[name]||"Explore creators";
  if(name==="retail")renderRetailOutcome();
  if(name==="briefs")renderBriefs();
  if(name==="pulse")loadPulse();
  if(name==="complaints"&&demoTourStep!==3)setTimeout(()=>$("#complaint-input")?.focus(),0);
}

function guidedCoachFallback(input){
  const text=`${input.observation} ${input.knownSignals}`.toLowerCase();
  const fewClicks=/few click|low click|click.?through|only \d+ (purchase|order|sign.?up)|views?.{0,30}(but|yet|while).{0,20}(click|visit)/.test(text);
  const lowAttention=/low|few|little|weak|drop|short|skip|scroll past|not watch/.test(text);
  const causes=[
    fewClicks?{title:"The promise and destination may not match",hypothesis:"People may notice the campaign but not see a clear reason to take the next step, or the landing page may not continue the same promise.",signalStrength:"Worth checking",evidenceToCheck:["Compare the creative’s promise and call to action with the first screen of the destination page.","Check the path from impressions to clicks to the intended action."]}:lowAttention?{title:"The opening may not earn attention",hypothesis:"The opening may not quickly connect the audience’s need to the campaign’s promise.",signalStrength:"Worth checking",evidenceToCheck:["Review retention or watch-time drop-off near the opening.","Compare audience feedback with the need the campaign is meant to serve."]}:{title:"The audience and message may be out of alignment",hypothesis:"The message, audience segment, or offer may not be specific enough to prompt the intended action.",signalStrength:"Low",evidenceToCheck:["Look for repeated questions or confusion in feedback.","Compare results by audience segment, if available."]},
    {title:"The next step may not be clear enough",hypothesis:"The call to action, offer, or route to act may ask people to interpret what to do next.",signalStrength:"Worth checking",evidenceToCheck:["Check whether one specific action is easy to find.","Compare clicks or actions with the number of people who saw the content."]},
    {title:"Delivery conditions may affect the signal",hypothesis:"Placement, timing, format, or a small sample could be affecting the observed result.",signalStrength:"Low",evidenceToCheck:["Compare the same placement, run length, and spend.","Check whether enough data has collected before deciding."]}
  ];
  const platform=input.platform||"the selected platform";
  return {readout:"The notes suggest questions to investigate, not a proven cause. Start by locating which campaign stage shows the clearest change.",causes,experiments:[
    {title:"Test the opening",hypothesis:"A more audience-specific opening may improve early attention.",change:`Make two versions for ${platform} with different opening hooks; keep the rest the same.`,measure:"Compare early retention or the platform’s equivalent opening-view metric."},
    {title:"Make the next step specific",hypothesis:"One clear action may help interested viewers continue.",change:"Use one concrete call to action and repeat its promise on the destination page.",measure:"Track click-through and the intended action after the click."},
    {title:"Compare one audience segment",hypothesis:"The offer may be more relevant to one audience group.",change:"If appropriate, compare the same creative with one audience segment changed at a time.",measure:"Compare qualified actions per person reached over the same time window."}
  ],guardrail:"Guided demo hypotheses are not a causal finding. Change one variable at a time, compare like with like, and allow enough data to collect.",source:"local-guided-demo",aiGenerated:false};
}
function renderCoachResult(result,input){
  latestCoachPlan={result,input};
  const mode=result.aiGenerated?`Gemini · ${escapeHtml(result.model||"AI-assisted")}`:"Guided demo · sample rules";
  const causes=(result.causes||[]).slice(0,3).map((cause,index)=>`<article class="coach-cause-card"><div class="coach-card-top"><span class="coach-card-index">0${index+1}</span><span class="coach-strength">${escapeHtml(cause.signalStrength||"Hypothesis")}</span></div><h3>${escapeHtml(cause.title)}</h3><p>${escapeHtml(cause.hypothesis)}</p><div class="coach-check-list"><strong>CHECK THIS EVIDENCE</strong><ul>${(cause.evidenceToCheck||[]).slice(0,3).map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul></div></article>`).join("");
  const experiments=(result.experiments||[]).slice(0,3).map((experiment,index)=>`<article class="coach-experiment"><span class="coach-experiment-number">0${index+1}</span><div><span class="coach-experiment-kicker">ONE CHANGE TO TRY</span><h3>${escapeHtml(experiment.title)}</h3><p class="coach-experiment-hypothesis">${escapeHtml(experiment.hypothesis)}</p><p><strong>Change</strong> ${escapeHtml(experiment.change)}</p><p><strong>Measure</strong> ${escapeHtml(experiment.measure)}</p></div></article>`).join("");
  $("#coach-mode").textContent=mode;
  $("#coach-results").innerHTML=`<div class="coach-result-head"><span class="coach-kicker">YOUR CLARITY BOARD</span><span class="coach-source-badge">${mode}</span><h2>Start with the signal you can check.</h2><p>${escapeHtml(result.readout||"Use these hypotheses as prompts for checking your campaign data.")}</p></div><div class="coach-results-section"><div class="coach-section-heading"><span>02 — POSSIBLE EXPLANATIONS</span><h2>What might be happening?</h2><p>Signal strength reflects how well the notes fit a question to investigate. It is not proof.</p></div><div class="coach-cause-list">${causes}</div></div><div class="coach-results-section"><div class="coach-section-heading"><span>03 — SMALL EXPERIMENTS</span><h2>What can you try next?</h2><p>Pick one test. Keep the other conditions as steady as you can.</p></div><div class="coach-experiment-list">${experiments}</div></div><div class="coach-guardrail"><span>✳</span><p>${escapeHtml(result.guardrail||"Compare like with like, and do not treat correlation as proof.")}</p></div><div class="coach-result-actions"><button type="button" class="button coach-save-brief" id="coach-create-brief">Turn first test into a brief <span>↗</span></button></div><p class="coach-result-disclaimer">Based only on the campaign notes you provided. CreatorBridge does not fetch or verify your platform analytics.</p>`;
}
async function analyzeCampaign(event){
  event.preventDefault();
  const form=$("#coach-form"),button=$("#coach-submit"),status=$("#coach-status");
  const fields=Object.fromEntries(new FormData(form).entries());
  const input={goal:fields.goal.trim(),platform:fields.platform,audience:fields.audience.trim(),observation:fields.observation.trim(),knownSignals:fields.knownSignals.trim()};
  if(!input.goal||input.observation.length<12){status.textContent="Add a campaign goal and at least one specific observation.";return;}
  button.disabled=true;button.textContent="Exploring the signal…";status.textContent="Comparing possible explanations with the details you shared…";
  try{
    let result,localFallback=false;
    try{result=await apiRequest("/api/ai/campaign-diagnosis",{method:"POST",body:JSON.stringify(input)});}
    catch{result=guidedCoachFallback(input);localFallback=true;}
    renderCoachResult(result,input);
    status.textContent=result.aiGenerated?"AI hypotheses are ready. Review and verify them against your campaign data.":localFallback?"The API is unavailable, so this is a local guided fallback. No AI service was reached.":"Guided hypotheses are ready. Add a Gemini API key for AI-assisted analysis.";
  }finally{button.disabled=false;button.innerHTML="Explore possible causes <span>↗</span>";}
}
const guidedDemoSteps=[
  {view:"explore",target:"#match-demo-title",title:"Meet the marketplace.",copy:"Start with a campaign idea and explore creator profiles. The included portfolios and rates are clearly labeled demo concepts, so viewers know what is sample data.",next:"See live signals"},
  {view:"pulse",target:"#pulse-title",title:"Read the latest signal.",copy:"Creator Pulse brings recent publisher headlines into the workspace. Show the creator or brand perspective, then open a source to verify the story.",next:"Build a sample brief"},
  {view:"brief",target:"#match-preview",title:"Turn an idea into a brief.",copy:"This editable sample brief produces a shortlist with visible fit reasons. The walkthrough does not call Gemini, save the draft, or change your briefs.",next:"Meet BridgeBuddy"},
  {view:"coach",target:"#coach-title",title:"Find a testable next move.",copy:"The Campaign Clarity Coach separates observations from hypotheses, then suggests small experiments and a metric to track. Its sample is not saved or sent.",next:"Meet BridgeBuddy"},
  {view:"complaints",target:"#complaint-title",title:"Resolve friction with care.",copy:"BridgeBuddy can organize a concern into a calm next step and an editable message. Choose a scenario to explore; the tour will not send anything.",next:"Finish tour"}
];
function clearGuidedDemoTarget(){document.querySelectorAll(".demo-tour-highlight").forEach(element=>element.classList.remove("demo-tour-highlight"));}
function endGuidedDemo(closeDraft=true){
  demoTourStep=-1;clearGuidedDemoTarget();$("#demo-tour").classList.add("hidden");
  if(closeDraft&&!backdrop.classList.contains("hidden"))closeModal();
}
function renderGuidedDemo(){
  const step=guidedDemoSteps[demoTourStep];if(!step)return;
  clearGuidedDemoTarget();
  if(step.view==="brief"){
    showView("explore");openBriefForm("",{demo:true});
  }else{
    if(!backdrop.classList.contains("hidden"))closeModal();
    showView(step.view);
  }
  if(step.view==="coach"){$("#coach-sample").click();$("#coach-form").requestSubmit();}
  const tour=$("#demo-tour");
  $("#demo-tour-count").textContent=`${String(demoTourStep+1).padStart(2,"0")} / ${String(guidedDemoSteps.length).padStart(2,"0")}`;
  $("#demo-tour-progress-fill").style.width=`${((demoTourStep+1)/guidedDemoSteps.length)*100}%`;
  $("#demo-tour-title").textContent=step.title;
  $("#demo-tour-copy").textContent=step.copy;
  $("#demo-tour-back").disabled=demoTourStep===0;
  $("#demo-tour-next").textContent=demoTourStep===guidedDemoSteps.length-1?"Finish tour ✓":"Next: "+step.next+" →";
  tour.classList.remove("hidden");
  const target=$(step.target);
  if(target){target.classList.add("demo-tour-highlight");requestAnimationFrame(()=>target.scrollIntoView({behavior:"smooth",block:"center",inline:"nearest"}));}
  if(step.view==="pulse")loadPulse();
  $("#demo-tour-next").focus({preventScroll:true});
}
function startGuidedDemo(){demoTourStep=0;renderGuidedDemo();}
function notify(message){const toast=$("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2400);}

function setServiceStatus(health){
  const badge=$("#service-indicator");
  const mode=$("#complaint-mode");
  if(!badge)return;
  const database=health?.database==="mongodb";
  const ai=Boolean(health?.ai);
  badge.classList.toggle("is-connected",database);
  badge.classList.toggle("is-demo",!ai);
  badge.title=`Database: ${health?.database||"offline"}; Gemini AI: ${ai?"configured":"not configured"}`;
  badge.querySelector("span").textContent=database?(ai?"Mongo + AI":"Mongo connected · AI key needed"):(ai?"AI ready · demo data":"Guided demo mode");
  if(mode)mode.textContent=ai?"Gemini AI · private session":"Guided demo · add Gemini for AI";
  const coachMode=$("#coach-mode");if(coachMode)coachMode.textContent=ai?"Gemini assist available · guided fallback":"Guided demo works without an AI key";
}

function rootCauseStepComplete(step){
  const value=rootCauseState[step.key];
  return step.type==="text"?Boolean(value.trim()):step.type==="multi"?value.size>0:Boolean(value);
}
function syncRootCauseProgress(){
  document.querySelectorAll("#root-cause-progress [data-root-cause-step]").forEach((button,index)=>{
    const step=rootCauseSteps[index],complete=rootCauseStepComplete(step);
    button.classList.toggle("is-current",index===rootCauseStep);
    button.classList.toggle("is-complete",complete);
    if(index===rootCauseStep)button.setAttribute("aria-current","step");else button.removeAttribute("aria-current");
    button.setAttribute("aria-label",`Step ${index+1}: ${step.short}${complete?", notes added":""}${index===rootCauseStep?", current step":""}`);
  });
}
function renderRootCauseStep(){
  const step=rootCauseSteps[rootCauseStep],progress=$("#root-cause-progress"),fields=$("#root-cause-fields");
  if(!step||!progress||!fields)return;
  progress.replaceChildren();
  rootCauseSteps.forEach((item,index)=>{
    const button=document.createElement("button");button.type="button";button.dataset.rootCauseStep=String(index);button.textContent=String(index+1);button.addEventListener("click",()=>{rootCauseStep=index;renderRootCauseStep();});progress.append(button);
  });
  syncRootCauseProgress();
  $("#root-cause-step-label").textContent=`STEP 0${rootCauseStep+1} · ${step.short.toUpperCase()}`;
  $("#root-cause-step-title").textContent=step.title;
  $("#root-cause-step-prompt").textContent=step.prompt;
  fields.replaceChildren();
  if(step.type==="text"){
    const input=document.createElement("textarea");input.rows=2;input.maxLength=700;input.placeholder=step.placeholder;input.setAttribute("aria-label",step.prompt);input.value=rootCauseState[step.key];input.addEventListener("input",()=>{rootCauseState[step.key]=input.value;syncRootCauseProgress();});fields.append(input);
  }else{
    const group=document.createElement("div");group.className="root-cause-options";group.setAttribute("role","group");group.setAttribute("aria-label",step.prompt);
    step.options.forEach(option=>{
      const button=document.createElement("button");button.type="button";button.className="root-cause-option";button.textContent=option;
      const selected=step.type==="multi"?rootCauseState[step.key].has(option):rootCauseState[step.key]===option;
      button.setAttribute("aria-pressed",String(selected));button.classList.toggle("is-selected",selected);
      button.addEventListener("click",()=>{
        if(step.type==="multi"){
          if(rootCauseState[step.key].has(option))rootCauseState[step.key].delete(option);else rootCauseState[step.key].add(option);
          const selected=rootCauseState[step.key].has(option);button.setAttribute("aria-pressed",String(selected));button.classList.toggle("is-selected",selected);
        }else{
          rootCauseState[step.key]=rootCauseState[step.key]===option?"":option;
          group.querySelectorAll(".root-cause-option").forEach(item=>{const selected=item===button&&rootCauseState[step.key]===option;item.setAttribute("aria-pressed",String(selected));item.classList.toggle("is-selected",selected);});
        }
        syncRootCauseProgress();
      });group.append(button);
    });fields.append(group);
  }
  $("#root-cause-back").disabled=rootCauseStep===0;
  $("#root-cause-next").textContent=rootCauseStep===rootCauseSteps.length-1?"Add notes to chat →":"Next step →";
}
function addRootCauseNotesToChat(){
  const notes=[
    "Root-cause check — draft notes. Please help me review these facts fairly:",
    rootCauseState.problem.trim()&&`What was expected vs. what happened: ${rootCauseState.problem.trim()}`,
    rootCauseState.causes.size&&`Possible factors to check: ${[...rootCauseState.causes].join("; ")}`,
    rootCauseState.evidence.size&&`Records available: ${[...rootCauseState.evidence].join("; ")}`,
    rootCauseState.outcome&&`Fair next step I want: ${rootCauseState.outcome}`,
    rootCauseState.missing.trim()&&`Information still missing: ${rootCauseState.missing.trim()}`
  ].filter(Boolean).join("\n\n");
  const input=$("#complaint-input"),combined=[input.value.trim(),notes].filter(Boolean).join("\n\n").slice(0,3000);
  input.value=combined;input.dispatchEvent(new Event("input",{bubbles:true}));input.scrollIntoView({behavior:"smooth",block:"center"});input.focus();
  notify("Draft notes added. Review them before sending to BridgeBuddy.");
}

function scrollComplaintChat(){const host=$("#complaint-messages");host.scrollTop=host.scrollHeight;}
function addChatBubble(role,text,label){
  const host=$("#complaint-messages"), article=document.createElement("article"), avatar=document.createElement("div"), content=document.createElement("div"), speaker=document.createElement("span"), paragraph=document.createElement("p");
  article.className=`chat-message ${role}-message`;avatar.className="message-avatar";avatar.textContent=role==="user"?"Y":"B";content.className="message-content";speaker.className="speaker-label";speaker.textContent=label;paragraph.textContent=text;content.append(speaker,paragraph);article.append(avatar,content);host.append(article);scrollComplaintChat();return {article,content};
}
function addTypingBubble(){
  const host=$("#complaint-messages"), article=document.createElement("article"), avatar=document.createElement("div"), content=document.createElement("div"), speaker=document.createElement("span"), typing=document.createElement("span");
  article.className="chat-message assistant-message";avatar.className="message-avatar";avatar.textContent="B";content.className="message-content";speaker.className="speaker-label";speaker.textContent="BRIDGEBUDDY · THINKING";typing.className="typing-indicator";typing.innerHTML="<i></i><i></i><i></i> Putting the facts in order";content.append(speaker,typing);article.append(avatar,content);host.append(article);scrollComplaintChat();return article;
}
function addComplaintResult(result){
  const label=result.source==="gemini"?"BRIDGEBUDDY · AI GUIDE":"BRIDGEBUDDY · GUIDED DEMO";
  const {content}=addChatBubble("assistant",String(result.summary||"Here is a clear next step."),label);
  const details=document.createElement("div");details.className="resolution-result";
  const meta=document.createElement("div");meta.className="result-meta";meta.textContent=`${result.category||"Complaint"} · ${result.urgency||"Routine"}`;details.append(meta);
  if(result.clarifyingQuestion){const question=document.createElement("section"),heading=document.createElement("h4"),text=document.createElement("p");heading.textContent="ONE USEFUL QUESTION";text.textContent=result.clarifyingQuestion;question.append(heading,text);details.append(question);}
  const actionSection=document.createElement("section"),actionHeading=document.createElement("h4"),list=document.createElement("ol");actionHeading.textContent="A FAIR WAY FORWARD";(result.nextSteps||[]).slice(0,4).forEach(item=>{const li=document.createElement("li");li.textContent=String(item);list.append(li);});actionSection.append(actionHeading,list);details.append(actionSection);
  const draftSection=document.createElement("section"),draftHeading=document.createElement("h4"),draft=document.createElement("div"),copy=document.createElement("button");draftHeading.textContent="MESSAGE YOU CAN EDIT";draft.className="message-draft";draft.textContent=String(result.messageDraft||"");copy.className="copy-draft";copy.type="button";copy.textContent="Copy draft";copy.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(draft.textContent);notify("Draft copied.");}catch{notify("Select and copy the draft manually.");}});draftSection.append(draftHeading,draft,copy);details.append(draftSection);
  if(result.privacyReminder){const privacy=document.createElement("small");privacy.textContent=String(result.privacyReminder);details.append(privacy);}
  content.append(details);scrollComplaintChat();
}
function resetComplaintChat(){
  complaintHistory=[];rootCauseState={problem:"",causes:new Set(),evidence:new Set(),outcome:"",missing:""};rootCauseStep=0;$("#complaint-messages").innerHTML='<div class="chat-date">TODAY · YOUR SESSION IS NOT SAVED</div><article class="chat-message assistant-message"><div class="message-avatar">B</div><div class="message-content"><span class="speaker-label">BRIDGEBUDDY <span>JUST NOW</span></span><p>Hi, I’m here to help you move a tough situation toward a clear next step. What happened, and what outcome would feel fair to you?</p><small>You can keep names and account details out of it.</small></div></article>';$("#complaint-suggestions").classList.remove("hidden");$("#complaint-input").value="";$("#complaint-char-count").textContent="0 / 3,000";if(!$("#root-cause-panel").classList.contains("hidden"))renderRootCauseStep();$("#complaint-input").focus();
}
async function sendComplaint(message,context=null){
  if(complaintBusy||!message.trim())return;
  const clean=message.trim().slice(0,3000);complaintBusy=true;$("#complaint-send").disabled=true;$("#complaint-input").disabled=true;$("#complaint-suggestions").classList.add("hidden");
  addChatBubble("user",clean,"YOU · JUST NOW");complaintHistory.push({role:"user",content:clean});const typing=addTypingBubble();
  try{
    const result=await apiRequest("/api/ai/complaint",{method:"POST",body:JSON.stringify({message:clean,history:complaintHistory.slice(0,-1).slice(-8),context})});
    typing.remove();addComplaintResult(result);
    complaintHistory.push({role:"assistant",content:[result.summary,result.clarifyingQuestion,...(result.nextSteps||[]),result.messageDraft].filter(Boolean).join("\n")});
  }catch(error){
    typing.remove();addChatBubble("assistant",error.message||"I couldn’t reach the complaint helper. Please try again.","BRIDGEBUDDY · CONNECTION ISSUE");
  }finally{complaintBusy=false;$("#complaint-send").disabled=false;$("#complaint-input").disabled=false;$("#complaint-input").focus();}
}

populateFilters();renderCreators();updateBriefCount();updateClarityMethod("explore");
$("#clarity-method-toggle").addEventListener("click",event=>{const button=event.currentTarget,detail=$("#clarity-method-detail"),open=detail.classList.toggle("hidden");button.setAttribute("aria-expanded",String(!open));button.innerHTML=open?'How it works <span aria-hidden="true">＋</span>':'Hide guide <span aria-hidden="true">−</span>';});
async function hydrateFromApi(){
  try{setServiceStatus(await apiRequest("/api/health"));}catch{setServiceStatus(null);}
  try{const records=await apiRequest("/api/creators");if(Array.isArray(records)&&records.length){creators=records;document.querySelectorAll("#specialty-filter option:not(:first-child),#tool-filter option:not(:first-child),#type-filter option:not(:first-child)").forEach(option=>option.remove());populateFilters();renderCreators();}}
  catch{notify("API offline — showing the included demo creators.");}
  await refreshRemoteBriefs();
}
hydrateFromApi();
["#search-input","#specialty-filter","#tool-filter","#type-filter","#sort-select"].forEach(selector=>$(selector).addEventListener(selector==="#search-input"?"input":"change",renderCreators));
$("#clear-filters").addEventListener("click",clearFilters);
document.querySelectorAll(".nav-item").forEach(button=>button.addEventListener("click",()=>showView(button.dataset.view)));
$("#open-about").addEventListener("click",()=>showModal(`<div class="modal-head"><div><span class="about-kicker">OUR HACKATHON STORY · BYTE BLAST</span><h2 id="modal-title">BYTE BLAST at HacXLerate 2026</h2><p>A real industry challenge. A student team. A prototype built to explore a solution.</p></div><button class="close-modal" data-close aria-label="Close">×</button></div><div class="modal-content about-modal-content"><p class="about-lede">HacXLerate is byteXL’s national student hackathon, where teams build solutions to real-world industry challenges. BYTE BLAST chose the AI Content Creator Marketplace challenge: an AI-native marketplace connecting creators with brands and agencies. Our response is CreatorBridge AI, a prototype for discovering a creator fit, shaping campaign briefs, and working through project issues.</p><div class="about-feature-grid"><article><span>01 · THE HACKATHON</span><strong>HacXLerate 2026</strong><p>byteXL’s student innovation challenge brings teams together to understand industry problems and build working prototypes.</p></article><article><span>02 · OUR TEAM & CHALLENGE</span><strong>BYTE BLAST · Creator Marketplace</strong><p>We explored how brands and AI creators can find a fit, turn ideas into briefs, and collaborate with more clarity.</p></article><article><span>03 · OUR PROTOTYPE</span><strong>Meet CreatorBridge AI</strong><p>Creator discovery, campaign planning, BridgeBuddy complaint guidance, and sample retail scenarios in one demo.</p></article></div><p class="about-demo-note"><strong>Prototype transparency</strong> Creator profiles, work samples, rates, and retail scenarios are illustrative demo data. The Proof Passport is an evidence checklist; no identity, audience, portfolio ownership, or rights have been independently verified. No retailer systems or private analytics are connected.</p><div class="form-actions"><button class="button button-primary" type="button" data-close>Back to CreatorBridge</button></div></div>`));
$("#refresh-news").addEventListener("click",()=>loadPulse(true));
document.querySelector(".pulse-filters").addEventListener("click",event=>{const button=event.target.closest("[data-pulse-filter]");if(!button)return;pulseCategory=button.dataset.pulseFilter;document.querySelectorAll("[data-pulse-filter]").forEach(item=>{const active=item===button;item.classList.toggle("is-active",active);item.setAttribute("aria-pressed",String(active));});renderPulse();});
document.querySelector(".pulse-lens").addEventListener("click",event=>{const button=event.target.closest("[data-pulse-lens]");if(!button)return;pulseLens=button.dataset.pulseLens;document.querySelectorAll("[data-pulse-lens]").forEach(item=>{const active=item===button;item.classList.toggle("is-active",active);item.setAttribute("aria-pressed",String(active));});renderPulse();});
$("#pulse-grid").addEventListener("click",event=>{const button=event.target.closest("[data-pulse-brief]");if(!button)return;const article=pulseArticles[Number(button.dataset.pulseBrief)];if(article)openBriefForm("",{news:article});});
$("#open-complaint-studio").addEventListener("click",()=>showView("complaints"));
$("#open-coach").addEventListener("click",()=>showView("coach"));
$("#open-retail-pilot").addEventListener("click",()=>showView("retail"));
$("#retail-product").addEventListener("change",event=>{retailPilotState.product=event.target.value;renderRetailOutcome();});
$("#retail-goal").addEventListener("change",event=>{retailPilotState.goal=event.target.value;renderRetailOutcome();});
document.querySelectorAll("[data-retail-outcome]").forEach(button=>button.addEventListener("click",()=>{
  retailPilotState.outcome=button.dataset.retailOutcome;
  document.querySelectorAll("[data-retail-outcome]").forEach(item=>{const active=item===button;item.classList.toggle("is-active",active);item.setAttribute("aria-pressed",String(active));});
  renderRetailOutcome();
}));
$("#retail-outcome-result").addEventListener("click",event=>{if(event.target.closest("#retail-create-brief"))openRetailDemoBrief();});
$("#coach-form").addEventListener("submit",analyzeCampaign);
$("#coach-sample").addEventListener("click",()=>{
  $("#coach-goal").value="Get qualified product visits and first orders for a sustainable running jacket";
  $("#coach-platform").value="Instagram Reels";
  $("#coach-audience").value="First-time city runners";
  $("#coach-observation").value="The reel reached 12,400 views and 248 product-link clicks, but only 3 purchases. A few comments asked whether the jacket actually keeps rain out.";
  $("#coach-known").value="The jacket appears in the opening frame, the call to action says ‘Learn more,’ and the link opens a general product homepage. The rain test appears near the end of the reel.";
  $("#coach-status").textContent="Sample scenario loaded. Choose Explore possible causes when you’re ready.";
  $("#coach-goal").focus();
});
$("#coach-results").addEventListener("click",event=>{if(event.target.closest("#coach-create-brief")&&latestCoachPlan)openBriefForm("",{coach:latestCoachPlan});});
$("#complaint-form").addEventListener("submit",event=>{event.preventDefault();const input=$("#complaint-input"),message=input.value;input.value="";$("#complaint-char-count").textContent="0 / 3,000";input.style.height="";sendComplaint(message);});
$("#complaint-input").addEventListener("input",event=>{$("#complaint-char-count").textContent=`${event.target.value.length.toLocaleString("en-IN")} / 3,000`;event.target.style.height="auto";event.target.style.height=`${Math.min(event.target.scrollHeight,120)}px`;});
$("#clear-complaint-chat").addEventListener("click",resetComplaintChat);
$("#root-cause-toggle").addEventListener("click",event=>{const toggle=event.currentTarget,panel=$("#root-cause-panel"),open=panel.classList.toggle("hidden");toggle.setAttribute("aria-expanded",String(!open));toggle.firstChild.textContent=open?"Start check ":"Close check ";toggle.querySelector("span").textContent=open?"↗":"×";if(!open){renderRootCauseStep();$("#root-cause-fields textarea, #root-cause-fields button")?.focus();}});
$("#root-cause-back").addEventListener("click",()=>{if(rootCauseStep>0){rootCauseStep--;renderRootCauseStep();$("#root-cause-fields textarea, #root-cause-fields button")?.focus();}});
$("#root-cause-next").addEventListener("click",()=>{if(rootCauseStep<rootCauseSteps.length-1){rootCauseStep++;renderRootCauseStep();$("#root-cause-fields textarea, #root-cause-fields button")?.focus();return;}addRootCauseNotesToChat();});
document.querySelectorAll("[data-scenario]").forEach(button=>button.addEventListener("click",()=>{showView("complaints");const input=$("#complaint-input");input.value=button.dataset.message||"";$("#complaint-char-count").textContent=`${input.value.length} / 3,000`;input.focus();}));
document.querySelectorAll("#complaint-suggestions [data-prompt]").forEach(button=>button.addEventListener("click",()=>{const input=$("#complaint-input");input.value=button.dataset.prompt;$("#complaint-char-count").textContent=`${input.value.length} / 3,000`;$("#complaint-form").requestSubmit();}));
$("#creator-grid").addEventListener("click",event=>{const button=event.target.closest("[data-profile]");if(button)profileModal(button.dataset.profile)});
$("#create-brief-top").addEventListener("click",()=>openBriefForm());$("#create-brief-list").addEventListener("click",()=>openBriefForm());$("#sidebar-create").addEventListener("click",()=>openBriefForm());
$("#try-match-demo").addEventListener("click",()=>openBriefForm("",{demo:true}));
$("#start-guided-demo").addEventListener("click",startGuidedDemo);
$("#demo-tour-close").addEventListener("click",()=>endGuidedDemo());
$("#demo-tour-exit").addEventListener("click",()=>endGuidedDemo());
$("#demo-tour-back").addEventListener("click",()=>{if(demoTourStep>0){demoTourStep--;renderGuidedDemo();}});
$("#demo-tour-next").addEventListener("click",()=>{if(demoTourStep>=guidedDemoSteps.length-1){endGuidedDemo();return;}demoTourStep++;renderGuidedDemo();});
backdrop.addEventListener("click",event=>{if(event.target===backdrop||event.target.closest("[data-close]")){closeModal();if(demoTourStep===2)endGuidedDemo(false);}});
modal.addEventListener("click",event=>{
  const invite=event.target.closest("[data-start-brief]");if(invite){const id=invite.dataset.startBrief;closeModal();openBriefForm(id);return;}
  const passport=event.target.closest("[data-start-passport]");if(passport){const id=passport.dataset.startPassport;closeModal();openBriefForm(id,{passport:true});return;}
  const choice=event.target.closest("[data-select-match]");if(choice){const field=$("#brief-form [name=creator]");if(field){field.value=choice.dataset.selectMatch;renderMatchPreview();notify(`${byId(choice.dataset.selectMatch)?.name||"Creator"} added to the brief.`);}return;}
});
modal.addEventListener("click",async event=>{
  const matchButton=event.target.closest("#find-matches");if(matchButton){event.preventDefault();renderMatchPreview();return;}
  const button=event.target.closest("#generate-ai");if(!button)return;
  const idea=$("#ai-idea").value.trim(), status=$("#ai-status");if(!idea){status.textContent="Add a rough idea first.";return;}
  button.disabled=true;button.textContent="Generating…";status.textContent="Asking Gemini to shape your idea…";
  try{
    const draft=await apiRequest("/api/ai/brief",{method:"POST",body:JSON.stringify({idea})});
    $("#brief-title").value=draft.title||"Campaign brief";$("#brief-type").value=draft.contentType||"Campaign";$("#brief-style").value=draft.style||"";$("#brief-ratio").value=draft.aspectRatio||"Flexible";
    $("#brief-idea").value=[draft.campaignObjective&&`Objective: ${draft.campaignObjective}`,draft.targetAudience&&`Audience: ${draft.targetAudience}`,draft.deliverables?.length&&`Deliverables: ${draft.deliverables.join(", ")}`,`Original idea: ${idea}`].filter(Boolean).join("\n\n");
    event.target.querySelector('[name="commercial"]').checked=Boolean(draft.commercialUse);status.textContent="AI draft ready. Review and edit every field before saving.";renderMatchPreview();$("#brief-title").focus();
  }catch(error){status.textContent=error.message==="Failed to fetch"?"API offline — start the backend to use the AI brief builder.":error.message;}
  finally{button.disabled=false;button.textContent="Generate draft ✦";}
});
modal.addEventListener("submit",event=>{
  if(event.target.id!=="brief-form")return;event.preventDefault();const form=new FormData(event.target);const entries=Object.fromEntries(form.entries());
  const row={title:entries.title.trim(),brand:entries.brand.trim(),contentType:entries.type,type:entries.type,style:entries.style.trim(),aspectRatio:entries.ratio,ratio:entries.ratio,idea:entries.idea.trim(),challenge:entries.challenge.trim(),evidence:entries.evidence.trim(),unknowns:entries.unknowns.trim(),budget:entries.budget,deadline:entries.deadline,commercialUse:form.has("commercial"),commercial:form.has("commercial"),creator:entries.creator||""};
  const submit=async()=>{try{const saved=await apiRequest("/api/briefs",{method:"POST",body:JSON.stringify(row)});remoteBriefs=[...briefs(),saved];saveBriefs(remoteBriefs);closeModal();showView("briefs");notify("Campaign brief saved to the project database.");}catch{const all=[...localBriefs(),{...row,id:String(Date.now()),createdAt:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}];remoteBriefs=null;saveBriefs(all);closeModal();showView("briefs");notify("Saved in this browser. Start the API to sync briefs.");}};
  submit();
});
$("#brief-list").addEventListener("click",event=>{if(event.target.id==="empty-create")openBriefForm();const button=event.target.closest("[data-brief]");if(button){const row=briefs().find(b=>b.id===button.dataset.brief);if(row)showBriefReview(row);}});
document.addEventListener("keydown",event=>{if(event.key!=="Escape")return;if(demoTourStep>=0){if(!backdrop.classList.contains("hidden"))closeModal();endGuidedDemo(false);return;}if(!backdrop.classList.contains("hidden"))closeModal();});

