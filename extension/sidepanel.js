const API_PRODUCTION = "https://creator-bridge-eight.vercel.app";
const API_LOCAL = "http://localhost:8787";
const $ = selector => document.querySelector(selector);
const messages = $("#messages");
const form = $("#chat-form");
const input = $("#message-input");
const sendButton = $("#send-button");
let history = [];
let busy = false;
let attachedContext = null;
let apiBase = API_PRODUCTION;

function appendMessage(role, text, label = role === "user" ? "YOU" : "BRIDGEBUDDY") {
  const article = document.createElement("article");
  const avatar = document.createElement("span");
  const bubble = document.createElement("div");
  const speaker = document.createElement("span");
  const paragraph = document.createElement("p");
  article.className = `message ${role}`;
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? "Y" : "B";
  bubble.className = "bubble";
  speaker.className = "speaker";
  speaker.textContent = label;
  paragraph.textContent = text;
  bubble.append(speaker, paragraph);
  article.append(avatar, bubble);
  messages.append(article);
  messages.scrollTop = messages.scrollHeight;
  return { article, bubble };
}

function appendResult(result) {
  const { bubble } = appendMessage("assistant", result.summary || "Here is a calm next step.", result.source === "gemini" ? "BRIDGEBUDDY · AI GUIDE" : "BRIDGEBUDDY · GUIDED DEMO");
  const card = document.createElement("div");
  card.className = "result-card";
  const meta = document.createElement("div");
  meta.className = "result-meta";
  meta.textContent = `${result.category || "Complaint"} · ${result.urgency || "Routine"}`;
  card.append(meta);

  if (result.clarifyingQuestion) addSection(card, "ONE USEFUL QUESTION", result.clarifyingQuestion);
  if (Array.isArray(result.nextSteps) && result.nextSteps.length) {
    const section = document.createElement("section");
    section.className = "result-section";
    const heading = document.createElement("h3");
    heading.textContent = "A FAIR WAY FORWARD";
    const list = document.createElement("ol");
    result.nextSteps.slice(0, 4).forEach(step => {
      const item = document.createElement("li");
      item.textContent = String(step);
      list.append(item);
    });
    section.append(heading, list);
    card.append(section);
  }
  if (result.messageDraft) {
    const section = document.createElement("section");
    section.className = "result-section";
    const heading = document.createElement("h3");
    heading.textContent = "MESSAGE YOU CAN EDIT";
    const draft = document.createElement("div");
    draft.className = "draft";
    draft.textContent = result.messageDraft;
    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "copy-button";
    copy.textContent = "Copy draft";
    copy.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(draft.textContent); copy.textContent = "Copied"; }
      catch { copy.textContent = "Select and copy the draft"; }
    });
    section.append(heading, draft, copy);
    card.append(section);
  }
  bubble.append(card);
  messages.scrollTop = messages.scrollHeight;
}

function addSection(parent, title, text) {
  const section = document.createElement("section");
  section.className = "result-section";
  const heading = document.createElement("h3");
  heading.textContent = title;
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  section.append(heading, paragraph);
  parent.append(section);
}

async function sendMessage(rawMessage) {
  const message = rawMessage.trim().slice(0, 3000);
  if (!message || busy) return;
  busy = true;
  sendButton.disabled = true;
  $("#suggestions").hidden = true;
  appendMessage("user", message);
  const thinking = appendMessage("assistant", "…", "BRIDGEBUDDY · THINKING");
  thinking.bubble.querySelector("p").className = "typing-dots";
  try {
    const response = await fetch(`${apiBase}/api/ai/complaint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: history.slice(-8), context: attachedContext })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || `Request failed (${response.status})`);
    thinking.article.remove();
    appendResult(result);
    history = [...history, { role: "user", content: message }, { role: "assistant", content: [result.summary, result.clarifyingQuestion, ...(result.nextSteps || []), result.messageDraft].filter(Boolean).join("\n") }].slice(-8);
  } catch (error) {
    thinking.article.remove();
    appendMessage("assistant", `${error.message || "Could not reach BridgeBuddy."} Check your connection and try again.`, "BRIDGEBUDDY · CONNECTION ISSUE");
  } finally {
    busy = false;
    sendButton.disabled = false;
    input.focus();
  }
}

async function checkConnection() {
  const state = $("#connection-state");
  for (const base of [API_PRODUCTION, API_LOCAL]) {
    try {
      const response = await fetch(`${base}/api/health`, { signal: AbortSignal.timeout(4500) });
      if (response.ok) {
        apiBase = base;
        state.innerHTML = `<i></i> ${base === API_LOCAL ? "Local API connected" : "CreatorBridge connected"}`;
        return;
      }
    } catch { /* try the next configured API */ }
  }
  state.innerHTML = '<i class="offline"></i> API unavailable';
}

$("#attach-page").addEventListener("click", async () => {
  const status = $("#page-context");
  try {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (!tab?.url || !/^https?:/.test(tab.url)) throw new Error("This page cannot be attached.");
    attachedContext = { title: String(tab.title || "Untitled page").slice(0, 180), url: String(tab.url).slice(0, 500) };
    status.textContent = `Attached: ${attachedContext.title} · click again to replace`;
    status.classList.add("attached");
  } catch (error) {
    status.textContent = error.message || "Could not attach this page.";
    attachedContext = null;
  }
});

$("#new-chat").addEventListener("click", () => {
  history = [];
  attachedContext = null;
  $("#page-context").textContent = "Nothing from this page is attached.";
  $("#page-context").classList.remove("attached");
  messages.innerHTML = '<article class="message assistant"><span class="avatar">B</span><div class="bubble"><span class="speaker">BRIDGEBUDDY</span><p>Hi. What happened, and what would feel like a fair outcome to you?</p></div></article>';
  $("#suggestions").hidden = false;
  input.value = "";
  $("#char-count").textContent = "0 / 3,000";
  input.focus();
});

form.addEventListener("submit", event => {
  event.preventDefault();
  const message = input.value;
  input.value = "";
  $("#char-count").textContent = "0 / 3,000";
  sendMessage(message);
});
input.addEventListener("input", () => { $("#char-count").textContent = `${input.value.length.toLocaleString()} / 3,000`; });
document.querySelectorAll("[data-prompt]").forEach(button => button.addEventListener("click", () => { input.value = button.dataset.prompt; $("#char-count").textContent = `${input.value.length} / 3,000`; form.requestSubmit(); }));
checkConnection();

