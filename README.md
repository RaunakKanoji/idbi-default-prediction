# MSME Risk360

Track 04-only predictive default risk workspace for IDBI Bank. The prototype focuses on 12-month Probability of Default, early-warning signals, explainable risk drivers, intervention workflows, portfolio monitoring and model governance.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Main routes

- `/app/overview` — portfolio risk command centre
- `/app/portfolio` — searchable MSME portfolio directory
- `/app/portfolio/[msmeId]/risk` — borrower-level risk summary and explainability
- `/app/early-warning` — signal queue
- `/app/risk-assessments` — assessment register
- `/app/loans`, `/app/documents`, `/app/cases`, `/app/reports`
- `/app/model-governance`, `/app/data-sources`, `/app/administration`, `/app/settings`

The UI uses seeded demonstration data in `lib/risk-data.ts`; it does not make autonomous lending decisions.
