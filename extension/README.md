# BridgeBuddy extension

BridgeBuddy adds the CreatorBridge complaint-resolution assistant as a Chromium side panel.

## Install for local use

1. Open `chrome://extensions` (or the matching extensions page in a Chromium browser).
2. Turn on **Developer mode**.
3. Select **Load unpacked** and choose this `extension` folder.
4. Click the BridgeBuddy toolbar icon to open the panel.

The extension connects to `https://creator-bridge-eight.vercel.app` first and tries `http://localhost:8787` if the hosted API is unavailable. Change `API_PRODUCTION` in `sidepanel.js` and the production host permission in `manifest.json` if the app's domain changes.

## Privacy and behavior

- Chat messages stay in the side panel's memory and are cleared when the panel is refreshed or **New chat** is selected.
- The panel does not scrape or read the active page.
- **Attach this page** requires a click and shares only the current tab's title and URL with the complaint API.
- The Gemini key stays on the server. Without it, the API returns a labeled guided-demo response.
- BridgeBuddy gives practical communication guidance, not legal decisions. Users should review any message draft before sending.

The extension uses the API route `POST /api/ai/complaint` from this project.

