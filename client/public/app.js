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
function openBriefForm(creatorId=""){
  const c=creatorId?byId(creatorId):null;
  showModal(`<div class="modal-head"><div><h2 id="modal-title">Create a campaign brief</h2><p>Set the direction. Your creator brings it to life.</p></div><button class="close-modal" data-close aria-label="Close">×</button></div>
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
      ${c?`<input name="creator" type="hidden" value="${c.id}" />`:""}
    </div><div class="form-actions"><button class="button button-secondary" type="button" data-close>Cancel</button><button class="button button-primary" type="submit">Save brief <span>↗</span></button></div></form>`);
$("#brief-title").focus();
}
function renderBriefs(){
  const items=briefs(), host=$("#brief-list");
  if(!items.length){host.innerHTML='<div class="brief-empty"><div class="empty-symbol">▤</div><h2>Your next idea starts here.</h2><p>Create a brief to give creators a clear starting point for your campaign.</p><button class="button button-primary" id="empty-create">＋ Create your first brief</button></div>';return;}
  host.innerHTML=items.slice().reverse().map(b=>`<article class="brief-row"><div class="brief-main"><span class="brief-icon">▤</span><span><h3>${escapeHtml(b.title)}</h3><p>${escapeHtml(b.brand)} · ${escapeHtml(b.type)}${b.creator?` · For ${escapeHtml(byId(b.creator)?.name||"creator")}`:""}</p></span></div><div class="brief-meta"><span>${escapeHtml(b.createdAt)}</span><span class="status-pill">Draft</span><button class="view-profile" data-brief="${escapeHtml(b.id)}">View ↗</button></div></article>`).join("");
}
function showView(name){const explore=name==="explore";$("#explore-view").classList.toggle("hidden",!explore);$("#briefs-view").classList.toggle("hidden",explore);document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("is-active",b.dataset.view===name));$("#breadcrumb-current").textContent=explore?"Explore creators":"My briefs";if(!explore)renderBriefs();}
function notify(message){const toast=$("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2400);}

populateFilters();renderCreators();updateBriefCount();
async function hydrateFromApi(){
  try{const records=await apiRequest("/api/creators");if(Array.isArray(records)&&records.length){creators=records;document.querySelectorAll("#specialty-filter option:not(:first-child),#tool-filter option:not(:first-child),#type-filter option:not(:first-child)").forEach(option=>option.remove());populateFilters();renderCreators();}}
  catch{notify("API offline — showing the included demo creators.");}
  await refreshRemoteBriefs();
}
hydrateFromApi();
["#search-input","#specialty-filter","#tool-filter","#type-filter","#sort-select"].forEach(selector=>$(selector).addEventListener(selector==="#search-input"?"input":"change",renderCreators));
$("#clear-filters").addEventListener("click",clearFilters);
document.querySelectorAll(".nav-item").forEach(button=>button.addEventListener("click",()=>showView(button.dataset.view)));
$("#creator-grid").addEventListener("click",event=>{const button=event.target.closest("[data-profile]");if(button)profileModal(button.dataset.profile)});
$("#create-brief-top").addEventListener("click",()=>openBriefForm());$("#create-brief-list").addEventListener("click",()=>openBriefForm());$("#sidebar-create").addEventListener("click",()=>openBriefForm());
backdrop.addEventListener("click",event=>{if(event.target===backdrop||event.target.closest("[data-close]"))closeModal();});
modal.addEventListener("click",event=>{const invite=event.target.closest("[data-start-brief]");if(invite){const id=invite.dataset.startBrief;closeModal();openBriefForm(id);}});
modal.addEventListener("click",async event=>{
  const button=event.target.closest("#generate-ai");if(!button)return;
  const idea=$("#ai-idea").value.trim(), status=$("#ai-status");if(!idea){status.textContent="Add a rough idea first.";return;}
  button.disabled=true;button.textContent="Generating…";status.textContent="Asking Gemini to shape your idea…";
  try{
    const draft=await apiRequest("/api/ai/brief",{method:"POST",body:JSON.stringify({idea})});
    $("#brief-title").value=draft.title||"Campaign brief";$("#brief-type").value=draft.contentType||"Campaign";$("#brief-style").value=draft.style||"";$("#brief-ratio").value=draft.aspectRatio||"Flexible";
    $("#brief-idea").value=[draft.campaignObjective&&`Objective: ${draft.campaignObjective}`,draft.targetAudience&&`Audience: ${draft.targetAudience}`,draft.deliverables?.length&&`Deliverables: ${draft.deliverables.join(", ")}`,`Original idea: ${idea}`].filter(Boolean).join("\n\n");
    event.target.querySelector('[name="commercial"]').checked=Boolean(draft.commercialUse);status.textContent="AI draft ready. Review and edit every field before saving.";$("#brief-title").focus();
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
