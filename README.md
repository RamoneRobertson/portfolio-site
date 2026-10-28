# Ramone Robertson · Portfolio

Personal portfolio for a backend engineer: featured projects with architecture write-ups, experience, skills and contact details. Live at [ramonerobertson.dev](https://ramonerobertson.dev).

It's a static [Astro](https://astro.build) site, served from S3 behind CloudFront and deployed by GitHub Actions on every push to `main`.

## Stack

- **Site:** Astro 7, TypeScript, plain CSS (no framework)
- **Icons:** [simple-icons](https://simpleicons.org) for brand logos, plus hand-drawn line icons for AWS services
- **Hosting:** S3 + CloudFront, with a visitor counter on API Gateway, Lambda and DynamoDB
- **CI/CD:** GitHub Actions with OIDC (no stored AWS keys)

## Running it locally

Requires Node 22.23.4 or newer (CI uses Node 24).

```bash
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/ locally
```

## Project structure

```
src/
  data/site.ts              # name, intro, about, experience, timeline, skills, certifications
  content/projects/*.md     # one file per project (front matter + case study)
  content.config.ts         # schema for project files
  components/               # page sections (Hero, Projects, Experience, Skills, About, ...)
  layouts/Base.astro        # <head>, header, footer, loading screen
  lib/icons.ts              # icon for each skill name
  lib/text.ts               # **term** highlights and stat parsing
  pages/                    # index, 404 and /projects/<id>/ case studies
  styles/global.css         # design tokens (colors, type, spacing) for light and dark mode
public/                     # files served as-is (favicon, portrait)
.github/workflows/deploy.yml
```

## Editing content

Almost everything you'd want to change lives in two places.

### Site copy: `src/data/site.ts`

Name, role, intro, About text and photos, Boeing experience, timeline, skills and certifications. In experience and timeline bullets, wrap a phrase in `**double asterisks**` to give it a soft highlight.

- **Skills:** list only tools used in the featured projects. A skill gets an icon if its exact name is in `src/lib/icons.ts`; add one there for a new tool.
- **Certifications:** `certs` drives the badges at the top of the hero. Each entry has an issuer, a name, an icon and a link to the Credly badge.

### Projects: `src/content/projects/*.md`

Each project is a Markdown file. The front matter fills the cards and carousel; the body is the case study page. The fields are documented in `src/content.config.ts`. The ones you'll use most:

| Field | What it does |
| --- | --- |
| `order` | Sort order (lower first) |
| `featured` | Shows the project in the hero carousel and the Projects section |
| `published` | `false` hides it everywhere without deleting the file |
| `status` | `in-progress` adds an "In progress" label |
| `stack` | Tech chips on cards and the case study |
| `diagram` | Architecture diagram: each inner list is one column, boxes written as `"Name \| detail"` |
| `repo`, `demo` | GitHub and live site buttons on the cards |
| `video`, `image` | Demo media from `public/projects/`; without them the carousel shows an architecture sketch |

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main` (or manually). It builds the site, syncs `dist/` to S3 and invalidates CloudFront. Hashed assets are cached for a year; HTML is always revalidated.

Set these as repository **variables** (Settings → Secrets and variables → Actions → Variables):

| Variable | Value |
| --- | --- |
| `AWS_DEPLOY_ROLE_ARN` | IAM role GitHub Actions assumes through OIDC |
| `S3_BUCKET` | Bucket that holds the site |
| `CLOUDFRONT_DISTRIBUTION_ID` | Distribution in front of the bucket |

Set the S3 / CloudFront error document to `404.html`. The visitor counter calls `visitorApi` in `src/data/site.ts`; if that API is unreachable, the counter stays hidden.

## Before deploying

- [ ] Replace placeholder links marked `# TODO` in `src/content/projects/` (Aux Battle repo and demo, Mofumo demo)
- [ ] Replace the placeholder Credly links in `certs` in `src/data/site.ts`
- [ ] Set the deploy variables above and the `404.html` error document
- [ ] Add the Terraform for the hosting stack (the Serverless Portfolio case study says it's all in Terraform)

To list the remaining placeholders:

```bash
grep -rn "TODO" src
```
