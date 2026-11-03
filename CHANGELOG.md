# Changelog

All notable project corrections and feature additions are recorded here. Entries are grouped by the coursework part they support; the Git commit history remains the authoritative record of individual changes.

## Part 2 — Corrections and improvements

### Structure, presentation and accessibility
- Standardised the five main pages around shared navigation, footer links and the shared stylesheet.
- Improved responsive layout behaviour for smaller screens and touch devices.
- Added or refined semantic page headings and descriptive content structure.
- Improved image alternative text and loading behaviour, including lazy loading for suitable below-the-fold images and prioritised loading for the home-page hero image.
- Added visible keyboard-focus styling and accessible labels/status messaging to interactive form controls.

### Search-engine optimisation
- Added unique page titles and meta descriptions to the Home, About Us, Programmes, Get Involved and Contact pages.
- Added Open Graph title and description metadata.
- Ensured each main page has a meaningful primary heading.
- Added `robots.txt` to permit normal public crawling.
- Documented remaining domain-dependent SEO work in `SEO-GUIDE.md`; canonical URLs and a sitemap must use a confirmed production domain rather than an assumed address.

## Part 3 — New features and functionality

### Interactive website features
- Added programme search and category filtering on the Programmes page.
- Added dynamically generated volunteer opportunity cards based on the three programme themes.
- Added an image gallery lightbox so programme images can be opened in a larger view.
- Added FAQ accordion behaviour and an expandable impact-content section.
- Added scroll-reveal effects with a fallback that keeps content visible when Intersection Observer is unavailable.
- Added an interactive Leaflet map using OpenStreetMap tiles.

### Forms and validation
- Created a dedicated Get Involved form for volunteer, sponsor and programme enquiries.
- Created a separate Contact form for general messages, feedback, partnership and media enquiries.
- Added native HTML validation attributes and JavaScript checks for required fields, email format, length and telephone input.
- Added field-specific error feedback, accessible invalid-state attributes, submission status messages and AJAX form submission through FormSubmit.
- Added a hidden honeypot field as a basic spam deterrent.

### Documentation and project delivery
- Added this changelog to record corrections and new functionality.
- Updated `README.md` with the page overview, features, local run instructions, GitHub repository link, expected GitHub Pages address, deployment steps, test evidence checklist and external references.
- Added `TESTING.md` to record manual verification steps and assessment evidence still to be collected.
- Added `.github/workflows/deploy-pages.yml` to automate static-site deployment to GitHub Pages after pushes to `main` or a manual workflow run.

## Deployment and verification notes

- The repository includes a GitHub Actions deployment workflow for a root-based GitHub Pages site because `index.html` is in the repository root. In GitHub Settings → Pages, select **GitHub Actions** as the source before deployment can run.
- The expected project-site URL is `https://asakhe-mpinda.github.io/greenpath-website/`. It must not be treated as a verified live website until the Pages deployment succeeds and the published pages are tested.
- FormSubmit may require activation by the receiving mailbox owner. Live email delivery has not been confirmed.
- Map tiles, Google Maps embeds and form delivery depend on third-party services and an internet connection.
- Browser/device testing, successful live form delivery and assessment screenshots must be completed and recorded separately; documentation alone is not proof that those tests passed.
