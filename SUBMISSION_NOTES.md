# Hackathon submission notes

## Project summary

**CreatorBridge AI** helps brands find AI-native creative talent and turn a rough campaign idea into a structured, editable brief. The prototype brings creator discovery, profile details, and campaign requirements into one workflow.

**Team:** BYTE BLAST  
**Challenge:** AI Content Creator Marketplace

## 45-second pitch

Brands often know the campaign they want but do not know which AI creator has the right tools, style, or workflow. CreatorBridge AI makes that match easier: search creators by specialty, tool, and content type; review how they work; then create a clear brief with format, style, usage rights, budget, and deadline. A Gemini-powered starter can turn a rough idea into an editable draft, so the brand and creator begin with the same expectations.

## Live demo sequence

1. Search **Runway** and filter **Video** to narrow the creator list.
2. Open a profile and show the sample concepts, tool list, skills, and workflow.
3. Choose **Invite to a brief**, enter a rough campaign idea, and generate a Gemini draft.
4. Edit the title, deliverables, style, aspect ratio, usage rights, budget, or deadline.
5. Save the brief and reopen it from **My briefs**.
6. Mention that the visible profiles and concept tiles are demonstration data until the team replaces them with approved creator work.

## Criteria mapping

| Judging area | What to show |
| --- | --- |
| Creator profiles and portfolios | Tools, skills, workflow, profile details, and selected concept tiles |
| Discovery and filtering | Search plus combined specialty, tool, and content type filters |
| Campaign briefs | Structured form, editable Gemini starter, saved brief list and detail view |
| User experience | Responsive marketplace, empty states, clear demo labels, working navigation |
| Demo and presentation | Follow the six-step scenario above and use the deployed URL |

## Three-person assignment

- **Member 1 — Interface and creator content:** polish the marketplace and profile layouts; add real portfolio media only with permission.
- **Member 2 — API and MongoDB:** set up Atlas, verify creator and brief records, and maintain the filter and save endpoints.
- **Member 3 — AI and release:** configure Gemini, review generated briefs, deploy, check the public flow, and deliver the presentation.

## Before submitting

- [ ] Set `MONGODB_URI` and `GEMINI_API_KEY` in the API host environment; never commit either secret.
- [ ] Confirm `/api/health` reports MongoDB and AI as configured on the live server.
- [ ] Replace sample creator identities, illustrative rates, and concept covers with approved creator information and work, or keep their demo labels visible.
- [x] Publish the source to [Creator-Bridge on GitHub](https://github.com/vu241fa04869-collab/Creator-Bridge).
- [ ] Deploy the app and paste the live site URL into the submission form.
- [ ] Test search, combined filters, profile opening, brief generation, brief editing, saving, and reopening on the deployed site.
- [ ] Open the deployed site in a clean browser session and make sure the API URL and CORS settings are correct.
- [ ] Rehearse the demo and submit before the event deadline.

