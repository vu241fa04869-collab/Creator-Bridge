# Hackathon submission notes

## Project summary

**CreatorBridge AI** helps brands find AI-native creative talent and turn a rough campaign idea into a structured, editable brief. The prototype brings creator discovery, profile details, and campaign requirements into one workflow.

**Team:** BYTE BLAST  
**Challenge:** AI Content Creator Marketplace

## 45-second pitch

Brands often know the campaign they want but do not know which AI creator has the right tools, style, or workflow. CreatorBridge AI turns the campaign idea into a shared brief and a shortlist of three creators, with a reason beside every recommendation. Brands can inspect each creator's workflow, select a match, and keep the brief attached to that creator. A separate Gemini-powered starter can shape a rough idea into an editable draft; BridgeBuddy helps people resolve project friction with calm, practical next steps. The sample profiles are clearly marked as demonstrations, and the match score is a transparent rules-based estimate—not a claim that AI knows a creator's real ability.

Creator Pulse adds recent, source-linked announcements from OpenAI and Google. Creators and brands can switch perspectives to see practical questions to consider, then carry a story into a new campaign brief. The feed shows publisher headlines and excerpts directly; the perspective prompts are product guidance, not news reporting.

## Live demo sequence

1. On **Explore creators**, click **Try the sample match**. The pre-filled launch-film brief makes the demo work without a Gemini key.
2. Point to the three recommended creators. Show that the fit estimate uses the requested format, any explicitly named tools, and overlapping creative directions; entering a budget adds the illustrative sample rate.
3. Open a creator's profile if you want to inspect their listed tools and workflow. Choose one from the shortlist to attach that creator to the campaign brief.
4. Change the format or creative idea and show the shortlist recompute. The reasons and fit score update with the brief.
5. Save the campaign and open it from **My briefs** to show the creator association. The Gemini starter remains available as a separate editable drafting tool when configured.
6. Close with BridgeBuddy's complaint-resolution flow, then say which profile data is illustrative and what a real marketplace would need to verify.
7. If time allows, open **Creator Pulse**, switch between the Creator and Brand perspectives, and use one article as the starting point for an original campaign brief.

## Criteria mapping

| Judging area | What to show |
| --- | --- |
| Creator profiles and portfolios | Tools, skills, workflow, profile details, and selected concept tiles |
| Discovery and filtering | Search plus combined specialty, tool, and content type filters |
| Brief-to-creator matching | Three ranked suggestions, visible fit reasons, live updates, and a selected creator saved on the brief |
| Industry context and perspective | Recent OpenAI and Google announcements with direct source links, topic filters, Creator/Brand lens, and story-to-brief action |
| AI and responsible product design | Gemini is an editable draft helper; the fit estimate is rules-based and explained, and sample creator data is labeled |
| Campaign briefs | Structured editable brief, optional Gemini starter, saved brief list and detail view |
| User experience | Responsive marketplace, empty states, clear demo labels, complaint-resolution assistant, and working navigation |
| Demo and presentation | Follow the six-step story above, name the prototype limits clearly, and use the deployed URL |

## Three-person assignment

- **Member 1 — Interface and creator content:** polish the marketplace and profile layouts; add real portfolio media only with permission.
- **Member 2 — API and MongoDB:** set up Atlas, verify creator and brief records, and maintain the filter and save endpoints.
- **Member 3 — AI and release:** configure Gemini, review generated briefs, deploy, check the public flow, and deliver the presentation.

## Before submitting

- [ ] Set `MONGODB_URI` and `GEMINI_API_KEY` in Vercel Environment Variables; never commit either secret.
- [ ] Confirm `/api/health` reports MongoDB and AI as configured on the live server.
- [ ] Replace sample creator identities, illustrative rates, and concept covers with approved creator information and work, or keep their demo labels visible.
- [x] Publish the source to [Creator-Bridge on GitHub](https://github.com/vu241fa04869-collab/Creator-Bridge).
- [ ] Import the repository into Vercel using the included `vercel.json` configuration.
- [ ] Deploy the app and paste the live site URL into the submission form.
- [ ] Test search, combined filters, profile opening, brief generation, brief editing, saving, and reopening on the deployed site.
- [ ] Open the deployed site in a clean browser session and make sure the API URL and CORS settings are correct.
- [ ] Rehearse the demo and submit before the event deadline.
