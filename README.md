# InstaDemo

A local-only educational demo showing form validation, a Next.js route handler, and CSV logging. It uses a fictional brand and should only be tested with made-up values.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://127.0.0.1:3000`.

Enter a fictional email and dummy password. The server creates `data/submissions.csv` with `timestamp`, `email`, `password_masked`, `password_length`, and `status` columns. The original password is never written to the CSV, logs, or any other persistent storage. After submission, the app shows a completion page with a link back to the demo.

This project is intentionally not an imitation of a real service. Never enter a real password.
