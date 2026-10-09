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
let remoteBriefs = null;
let toastTimer;
let complaintHistory = [];
let complaintBusy = false;
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
  const idea = `${brief.idea || ""} ${brief.style || ""}`.toLowerCase();
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

function showModal(html){modal.innerHTML=html;backdrop.classList.remove("hidden");document.body.style.overflow="hidden";const first=modal.querySelector("button,input,select,textarea");if(first)first.focus();}
function closeModal(){backdrop.classList.add("hidden");document.body.style.overflow="";modal.innerHTML="";}
function profileModal(id){
  const c=byId(id);if(!c)return;
  showModal(`<div class="profile-hero"><span class="creator-avatar" style="background:${c.palette[0]}55;color:${c.palette[1]}">${c.initials}</span><div><h3 id="modal-title">${escapeHtml(c.name)}${c.verified?'<i class="verified-mark" title="Creator-provided profile details">✓</i>':''}</h3><p>${escapeHtml(c.specialty)} · ${escapeHtml(c.location)}</p></div></div>
    <div class="profile-section"><h4>SELECTED WORK <span class="section-note">ILLUSTRATIVE DEMO CONCEPTS</span></h4><div class="portfolio-grid">${(c.portfolio||[]).map((work,index)=>`<article class="portfolio-tile" style="--cover-a:${c.palette[index%c.palette.length]};--cover-b:${c.palette[(index+1)%c.palette.length]}"><div class="portfolio-cover"><span>✳</span><small>CONCEPT ${index+1}</small></div><div class="portfolio-caption"><strong>${escapeHtml(work.title)}</strong><small>${escapeHtml(work.type)} · ${escapeHtml(work.tool)}</small></div></article>`).join("")}</div></div>
    <div class="profile-section"><h4>ABOUT</h4><p>${escapeHtml(c.bio)} This is a demo creator profile prepared for the hackathon prototype.</p><div class="profile-stats"><span><strong>${(c.portfolio||[]).length}</strong>Sample concepts</span><span><strong>${c.tools.length}</strong>AI tools listed</span><span><strong>₹${c.rate.toLocaleString("en-IN")}</strong>Illustrative rate</span></div></div>
    <div class="profile-section"><h4>TOOLS & SKILLS</h4><div class="tag-row">${[...c.tools,...c.skills].map(x=>`<span class="tag">${escapeHtml(x)}</span>`).join("")}</div></div>
    <div class="profile-section"><h4>WORKFLOW</h4><p>${escapeHtml(c.workflow)}</p></div>
    <div class="profile-footer"><span class="disclaimer">Demo profile · Not independently verified</span><button class="button button-primary" data-start-brief="${c.id}">Invite to a brief ↗</button></div>`);
}

function saveBriefs(rows){localStorage.setItem("creatorbridge-briefs",JSON.stringify(rows));if(remoteBriefs!==null)remoteBriefs=rows;updateBriefCount();}
async function refreshRemoteBriefs(){try{remoteBriefs=await apiRequest("/api/briefs");localStorage.setItem("creatorbridge-briefs",JSON.stringify(remoteBriefs));}catch{remoteBriefs=null;}updateBriefCount();}
function updateBriefCount(){$("#brief-count").textContent=briefs().length;}
function openBriefForm(creatorId="",options={}){
  const c=creatorId?byId(creatorId):null;
  showModal(`<div class="modal-head"><div><h2 id="modal-title">${options.demo?"From one idea to a short list":"Create a campaign brief"}</h2><p>${options.demo?"A 20-second launch film · sample matching walkthrough":"Set the direction. Your creator brings it to life."}</p></div><button class="close-modal" data-close aria-label="Close">×</button></div>
    <form id="brief-form" class="modal-content"><div class="ai-assist"><div class="ai-assist-head"><span class="ai-star">✦</span><span><strong>AI brief starter</strong><small>Turn a rough idea into an editable campaign draft.</small></span></div><textarea id="ai-idea" placeholder="e.g. A launch film for a new running shoe that feels energetic and optimistic"></textarea><div class="ai-assist-actions"><span id="ai-status" role="status">Uses the server-side Gemini API key.</span><button class="button button-secondary" id="generate-ai" type="button">Generate draft ✦</button></div></div><div class="form-grid">
      <div class="form-field full"><label for="brief-title">Campaign title *</label><input id="brief-title" name="title" required placeholder="e.g. Summer launch film" /></div>
      <div class="form-field"><label for="brand-name">Brand or team *</label><input id="brand-name" name="brand" required value="BYTE BLAST" placeholder="Your brand" /></div>
      <div class="form-field"><label for="brief-type">Content type *</label><select id="brief-type" name="type" required><option value="">Choose a format</option><option>Video</option><option>Social</option><option>Product visuals</option><option>Campaign</option><option>Branding</option><option>Editorial</option></select></div>
      <div class="form-field"><label for="brief-style">Style or mood</label><input id="brief-style" name="style" placeholder="e.g. Warm, cinematic" /></div>
      <div class="form-field"><label for="brief-ratio">Aspect ratio</label><select id="brief-ratio" name="ratio"><option>9:16 · Vertical</option><option>1:1 · Square</option><option>4:5 · Portrait</option><option>16:9 · Landscape</option><option>Flexible</option></select></div>
      <div class="form-field full"><label for="brief-idea">The idea *</label><textarea id="brief-idea" name="idea" required placeholder="What are you making, and what should it make people feel or do?"></textarea></div>
      <div class="form-field"><label for="brief-budget">Budget (₹)</label><input id="brief-budget" name="budget" type="number" min="0" placeholder="Optional" /></div>
      <div class="form-field"><label for="brief-deadline">Target deadline</label><input id="brief-deadline" name="deadline" type="date" /></div>
      <div class="form-field full"><label class="check-field"><input name="commercial" type="checkbox" /> Commercial usage rights are required</label></div>
      <input name="creator" type="hidden" value="${c?.id||""}" />
    </div><section class="match-preview" id="match-preview" aria-live="polite"></section><div class="form-actions"><button class="button button-secondary" type="button" data-close>Cancel</button><button class="button button-primary" type="submit">Save brief <span>↗</span></button></div></form>`);
  if(options.demo){
    $("#brief-title").value="City after rain · launch film";
    $("#brand-name").value="Monsoon Running · demo";
    $("#brief-type").value="Video";
    $("#brief-style").value="Cinematic, hopeful, fast-moving; rain into sunrise.";
    $("#brief-idea").value="Create a 20-second vertical launch film for a sustainable running jacket. Follow a city runner through Mumbai monsoon rain into a bright sunrise. Make it cinematic and optimistic for Instagram Reels; use Runway and DaVinci Resolve for AI-assisted footage and editorial finishing.";
    $("#ai-idea").value="A short cinematic, optimistic launch film for a sustainable running jacket, following a runner through monsoon rain into sunrise. Made for Instagram Reels.";
  }
  $("#brief-form").addEventListener("input",renderMatchPreview);
  $("#brief-form").addEventListener("change",renderMatchPreview);
  if(options.demo||c)renderMatchPreview();
$("#brief-title").focus();
}
function renderMatchPreview(){
  const form=$("#brief-form"),host=$("#match-preview");if(!form||!host)return;
  const fields=new FormData(form),brief={idea:fields.get("idea"),style:fields.get("style"),type:fields.get("type"),budget:fields.get("budget")};
  const selected=String(fields.get("creator")||"");
  const results=briefFitMatches(brief);
  if(!brief.idea?.trim()&&!brief.type&&!brief.style){host.innerHTML="";return;}
  host.innerHTML=`<div class="match-results-head"><div><span class="match-eyebrow">CREATORBRIDGE MATCH EXPLAINER</span><h3>Three creators to explore</h3><p>Based on the format, tools, and creative direction in this brief.</p></div><button class="button button-match" id="find-matches" type="button">Refresh matches <span>↻</span></button></div><div class="match-method"><span>01 · Format</span><span>02 · Named tools</span><span>03 · Creative direction</span>${brief.budget?"<span>04 · Sample rate</span>":""}</div><div class="match-list">${results.map((item,index)=>{
    const creator=item.creator,isSelected=selected===creator.id;
    return `<article class="match-result-card${isSelected?" is-selected":""}"><span class="match-rank">0${index+1}</span><span class="match-avatar" style="--avatar:${creator.palette[0]};--ink:${creator.palette[1]}">${escapeHtml(creator.initials)}</span><div class="match-result-main"><div class="match-creator-line"><strong>${escapeHtml(creator.name)}</strong><span>${escapeHtml(creator.specialty)}</span></div><div class="match-reasons">${(item.reasons.length?item.reasons:["Related creative profile"]).map(reason=>`<span>${escapeHtml(reason)}</span>`).join("")}</div></div><div class="match-score"><strong>${item.score}%</strong><small>brief fit</small></div><button class="button button-select-match${isSelected?" selected":""}" type="button" data-select-match="${creator.id}" aria-pressed="${isSelected}">${isSelected?"Selected ✓":"Choose"}</button></article>`;
  }).join("")}</div><p class="match-disclaimer">A transparent rules-based estimate, not an AI decision or guarantee. Demo profiles and rates are illustrative and unverified; confirm fit and pricing with creators.</p>`;
}
function renderBriefs(){
  const items=briefs(), host=$("#brief-list");
  if(!items.length){host.innerHTML='<div class="brief-empty"><div class="empty-symbol">▤</div><h2>Your next idea starts here.</h2><p>Create a brief to give creators a clear starting point for your campaign.</p><button class="button button-primary" id="empty-create">＋ Create your first brief</button></div>';return;}
  host.innerHTML=items.slice().reverse().map(b=>`<article class="brief-row"><div class="brief-main"><span class="brief-icon">▤</span><span><h3>${escapeHtml(b.title)}</h3><p>${escapeHtml(b.brand)} · ${escapeHtml(b.type)}${b.creator?` · For ${escapeHtml(byId(b.creator)?.name||"creator")}`:""}</p></span></div><div class="brief-meta"><span>${escapeHtml(b.createdAt)}</span><span class="status-pill">Draft</span><button class="view-profile" data-brief="${escapeHtml(b.id)}">View ↗</button></div></article>`).join("");
}
function showView(name){
  const views={explore:"#explore-view",briefs:"#briefs-view",complaints:"#complaints-view"};
  Object.entries(views).forEach(([key,selector])=>$(selector).classList.toggle("hidden",key!==name));
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("is-active",b.dataset.view===name));
  $("#breadcrumb-current").textContent={explore:"Explore creators",briefs:"My briefs",complaints:"Resolution studio"}[name]||"Explore creators";
  if(name==="briefs")renderBriefs();
  if(name==="complaints")setTimeout(()=>$("#complaint-input")?.focus(),0);
}
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
  complaintHistory=[];$("#complaint-messages").innerHTML='<div class="chat-date">TODAY · YOUR SESSION IS NOT SAVED</div><article class="chat-message assistant-message"><div class="message-avatar">B</div><div class="message-content"><span class="speaker-label">BRIDGEBUDDY <span>JUST NOW</span></span><p>Hi, I’m here to help you move a tough situation toward a clear next step. What happened, and what outcome would feel fair to you?</p><small>You can keep names and account details out of it.</small></div></article>';$("#complaint-suggestions").classList.remove("hidden");$("#complaint-input").value="";$("#complaint-char-count").textContent="0 / 3,000";$("#complaint-input").focus();
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

populateFilters();renderCreators();updateBriefCount();
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
$("#open-complaint-studio").addEventListener("click",()=>showView("complaints"));
$("#complaint-form").addEventListener("submit",event=>{event.preventDefault();const input=$("#complaint-input"),message=input.value;input.value="";$("#complaint-char-count").textContent="0 / 3,000";input.style.height="";sendComplaint(message);});
$("#complaint-input").addEventListener("input",event=>{$("#complaint-char-count").textContent=`${event.target.value.length.toLocaleString("en-IN")} / 3,000`;event.target.style.height="auto";event.target.style.height=`${Math.min(event.target.scrollHeight,120)}px`;});
$("#clear-complaint-chat").addEventListener("click",resetComplaintChat);
document.querySelectorAll("[data-scenario]").forEach(button=>button.addEventListener("click",()=>{showView("complaints");const input=$("#complaint-input");input.value=button.dataset.message||"";$("#complaint-char-count").textContent=`${input.value.length} / 3,000`;input.focus();}));
document.querySelectorAll("#complaint-suggestions [data-prompt]").forEach(button=>button.addEventListener("click",()=>{const input=$("#complaint-input");input.value=button.dataset.prompt;$("#complaint-char-count").textContent=`${input.value.length} / 3,000`;$("#complaint-form").requestSubmit();}));
$("#creator-grid").addEventListener("click",event=>{const button=event.target.closest("[data-profile]");if(button)profileModal(button.dataset.profile)});
$("#create-brief-top").addEventListener("click",()=>openBriefForm());$("#create-brief-list").addEventListener("click",()=>openBriefForm());$("#sidebar-create").addEventListener("click",()=>openBriefForm());
$("#try-match-demo").addEventListener("click",()=>openBriefForm("",{demo:true}));
backdrop.addEventListener("click",event=>{if(event.target===backdrop||event.target.closest("[data-close]"))closeModal();});
modal.addEventListener("click",event=>{
  const invite=event.target.closest("[data-start-brief]");if(invite){const id=invite.dataset.startBrief;closeModal();openBriefForm(id);return;}
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
  const row={title:entries.title.trim(),brand:entries.brand.trim(),contentType:entries.type,type:entries.type,style:entries.style.trim(),aspectRatio:entries.ratio,ratio:entries.ratio,idea:entries.idea.trim(),budget:entries.budget,deadline:entries.deadline,commercialUse:form.has("commercial"),commercial:form.has("commercial"),creator:entries.creator||""};
  const submit=async()=>{try{const saved=await apiRequest("/api/briefs",{method:"POST",body:JSON.stringify(row)});remoteBriefs=[...briefs(),saved];saveBriefs(remoteBriefs);closeModal();showView("briefs");notify("Campaign brief saved to the project database.");}catch{const all=[...localBriefs(),{...row,id:String(Date.now()),createdAt:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}];remoteBriefs=null;saveBriefs(all);closeModal();showView("briefs");notify("Saved in this browser. Start the API to sync briefs.");}};
  submit();
});
$("#brief-list").addEventListener("click",event=>{if(event.target.id==="empty-create")openBriefForm();const button=event.target.closest("[data-brief]");if(button){const row=briefs().find(b=>b.id===button.dataset.brief);if(row)showModal(`<div class="modal-head"><div><h2 id="modal-title">${escapeHtml(row.title)}</h2><p>${escapeHtml(row.brand)} · ${escapeHtml(row.type)} · Draft</p></div><button class="close-modal" data-close aria-label="Close">×</button></div><div class="modal-content"><div class="form-grid"><div class="profile-section"><h4>THE IDEA</h4><p>${escapeHtml(row.idea)}</p></div><div class="profile-section"><h4>CREATIVE DIRECTION</h4><p>${escapeHtml(row.style||"Not specified")} · ${escapeHtml(row.ratio)}</p></div><div class="profile-section"><h4>DETAILS</h4><p>Budget: ${row.budget?`₹${escapeHtml(row.budget)}`:"Not specified"}<br>Deadline: ${escapeHtml(row.deadline||"Not specified")}<br>Commercial rights: ${row.commercial?"Required":"Not specified"}</p></div></div></div>`);}});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!backdrop.classList.contains("hidden"))closeModal();});

