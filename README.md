# CreatorBridge AI

CreatorBridge AI is a hackathon marketplace prototype where brands can discover AI creators, inspect their tools and workflows, and create campaign briefs. The project includes a Vite frontend, an Express API, MongoDB support, a local JSON fallback for brief storage, and an optional Gemini powered brief starter.

## Run locally

You need Node.js 20 or newer. From this project folder:

```powershell
npm install
Copy-Item server/.env.example server/.env
npm run dev
```

Open `http://localhost:5173`. The API runs at `http://localhost:8787`; its health endpoint is `/api/health`.

The app works without credentials: the API serves eight sample profiles and saves briefs to `server/data/briefs.json`. To use MongoDB, set `MONGODB_URI` in `server/.env`. On an empty database, the server seeds the sample creator records. MongoDB is recommended for hosted demos because most hosts do not preserve local files between deployments.

To enable real AI brief generation, set `GEMINI_API_KEY` in `server/.env`, restart the server, then use **Create a brief → AI brief starter**. The API key stays server-side. Change `GEMINI_MODEL` if your Google AI Studio project uses a different enabled model. AI output is an editable first draft, not a substitute for reviewing the brief.

## Features

- Creator discovery with combined search, specialty, AI tool, and content type filters.
- Creator portfolio/profile views with listed skills, tools, workflow, and illustrative rates.
- Campaign briefs with content type, style, aspect ratio, commercial usage, budget, deadline, and optional creator association.
- Brief list and detail views, saved in MongoDB or the local JSON fallback.
- Gemini structured-output endpoint that turns an idea into editable brief fields.
- Responsive desktop and mobile layout.
- Seed profiles and portfolio concepts are explicitly labeled as demos and unverified; there is no fake verification badge. The concept covers are code-built placeholders, not generated artwork. Replace them with approved creator work before presenting a real marketplace.

## API

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Service and integration status |
| `GET` | `/api/creators` | List profiles; accepts combined `search`, `specialty`, `tool`, and `type` parameters |
| `GET` | `/api/creators/:id` | Get one creator profile |
| `GET` | `/api/briefs` | List saved campaign briefs |
| `POST` | `/api/briefs` | Validate and save a campaign brief |
| `POST` | `/api/ai/brief` | Generate a structured first-draft brief with Gemini |

Briefs are shared by the demo API and there is no login or per-user access control yet. Use sample data for the public demo; add authentication before using real client or creator data.

## Three-person work split

1. **Member 1 — UI and creator profiles:** refine the marketplace, curate real portfolio examples with permission, and check responsive layouts.
2. **Member 2 — API and data:** configure MongoDB Atlas, review creator/brief schemas, improve validation, and maintain API endpoints.
3. **Member 3 — AI, integration, and demo:** configure the Gemini key, review AI output and error handling, deploy, prepare the README/demo, and coordinate the final submission.

Keep API fields stable while working in parallel. Use the endpoint table above as the integration contract.

## Deployment

### One service on Render

This is the simplest deployment. The repository includes a `render.yaml` Blueprint for a single Node web service. In Render, create a Blueprint from the GitHub repo and review the service before deploying. The Express server serves the built frontend and API from the same origin; the service uses `/api/health` for its health check. Add `MONGODB_URI` and `GEMINI_API_KEY` in Render's environment settings for persistent briefs and live AI generation. `GEMINI_MODEL` defaults to `gemini-3.8-flash`.

### Vercel frontend + Render API

For separate services, set the Vercel root directory to `client`, build command to `npm run build`, and output directory to `dist`. Set `VITE_API_URL` to the Render API base URL. Deploy the API from the repository root on Render with build command `npm install` and start command `npm run start:api`. Add the Vercel site URL to `CORS_ALLOWED_ORIGINS` on Render. Set `MONGODB_URI` and `GEMINI_API_KEY` on the API service.

The source repository is [vu241fa04869-collab/Creator-Bridge](https://github.com/vu241fa04869-collab/Creator-Bridge). Before sharing the live URL, verify creator filters, profile details, creating and reopening a brief, and the AI draft flow with the deployment's actual keys. Do not commit `.env` or API keys. Publishing the service requires a hosting account and the server environment secrets.

## Suggested demo run-through

1. Search for a video creator and filter by Runway.
2. Open a profile and show its workflow, tools, and unverified demo label.
3. Start a brief from that profile; ask Gemini to structure a rough campaign idea.
4. Edit the generated fields, save the brief, then reopen it from **My briefs**.
5. Close by showing the working deployment and repository setup instructions.

## Project files

- `client/` — Vite frontend.
- `server/src/routes/` — creator, brief, and AI API routes.
- `server/src/models/` — MongoDB schemas.
- `server/data/creators.json` — clearly labeled demo seed data.
- `server/.env.example` — environment variable template.

