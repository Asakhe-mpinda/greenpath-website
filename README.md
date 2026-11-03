# GreenPath Community Foundation

A responsive, five-page informational website for the GreenPath Community Foundation project. It introduces the organisation, explains its environmental programmes, and provides separate volunteer/sponsorship and general-contact enquiry forms.

## Project pages

- **Home** — `index.html`: introduction, calls to action and environmental map.
- **About Us** — `pages/about.html`: organisation background, mission, vision and team.
- **Programmes** — `pages/services.html`: tree planting, recycling education and community clean-ups, with programme search/filter and an image gallery.
- **Get Involved** — `pages/enquiry.html`: volunteer, sponsor and programme enquiry form.
- **Contact Us** — `pages/contact.html`: contact information, location maps and general contact form.

Shared front-end files are in `assets/css/styles.css` and `assets/js/script.js`.

## Features

- Responsive layouts and shared navigation across the five pages, with fluid content widths, responsive typography, flexible card grids, touch-sized controls, safe-area spacing and viewport-aware dialogs/maps.
- Interactive environmental map using Leaflet and OpenStreetMap tiles.
- Programme text search and category filtering.
- Image gallery with an enlarged lightbox view.
- JavaScript-generated volunteer opportunity cards.
- FAQ accordion, impact-content toggle and scroll-reveal effects.
- Separate enquiry and general-contact forms with HTML5 and JavaScript validation, accessible error messages, and AJAX submission through Web3Forms, with request timeouts and explicit response validation.
- Page-specific titles and meta descriptions, Open Graph title/description metadata, descriptive image alternatives, skip links, current-page navigation state, keyboard focus styling, and a `robots.txt` file.

## Run locally

This is a static HTML/CSS/JavaScript website; no build step or package installation is required.

1. Clone or download this repository.
2. Open the project folder in a terminal.
3. Start a local web server from the repository root:

   ```bash
   python -m http.server 8000
   ```

4. Visit [http://localhost:8000](http://localhost:8000) in a browser.
5. Open the five pages using the navigation menu. Keep the folder structure intact so the relative CSS and JavaScript paths continue to work.

You can also open `index.html` directly, but using a local server is recommended for consistent browser behaviour.

## Publishing with GitHub Pages

The repository source is available at:

**GitHub repository:** https://github.com/Asakhe-mpinda/greenpath-website

**Expected GitHub Pages address:** https://asakhe-mpinda.github.io/greenpath-website/

> **Deployment status:** The expected address above is the standard GitHub Pages project-site URL, not confirmation that Pages has been enabled or that the live site has passed testing. The deployment must be enabled and verified in the repository before submitting it as a working live URL.

To publish:

1. Open the repository on GitHub and select **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** and save.
3. The committed workflow at `.github/workflows/deploy-pages.yml` runs when changes are pushed to `main`, or when manually started from the Actions tab.
4. If GitHub asks for permission, allow the workflow to deploy to Pages. Check the **Actions** tab and wait for the **Deploy GreenPath website to GitHub Pages** run to complete successfully.
5. Open the published URL shown in **Settings → Pages**. Confirm that it loads over HTTPS.
6. Test every page, navigation link, image, stylesheet, JavaScript interaction, map and form on the published site. Re-test after any deployment change.

The root `index.html` is the site entry point, so the project is structured for a root-based GitHub Pages deployment. If a custom domain is configured later, update this README and the SEO metadata only after the domain is verified.

## Forms and external services

Both forms submit asynchronously to the Web3Forms endpoint (`https://api.web3forms.com/submit`) using the configured access key in each form. The shared JavaScript validates the fields, shows a sending state, stops requests that exceed 15 seconds, checks the HTTP and JSON response, and displays success only when Web3Forms returns an explicit successful response. **Successful live email delivery has not been confirmed.** Complete any required Web3Forms dashboard setup and submit a fictional test enquiry before relying on delivery. Never use a real visitor's personal information for testing.

The map uses Leaflet 1.9.4 with OpenStreetMap map tiles. The Contact page also embeds Google Maps location searches. These features require an internet connection and the relevant third-party services to be available. Tile-loading failures now produce an accessible status message; successful map rendering still needs to be checked in a browser.

## Responsive navigation

The shared header now uses an accessible mobile menu on narrow screens. The menu button is enabled when the shared JavaScript loads; without JavaScript, the navigation links remain visible. On mobile, visitors can open and close the vertical navigation panel, use the Escape key to close it and return focus to the button, tap a link to close the panel, or resize to desktop to restore the full horizontal navigation. The menu supports keyboard focus, touch-sized controls and reduced-motion preferences. Check the menu on all five pages at narrow phone, tablet and desktop widths; see `TESTING.md` for the manual test case.

## Testing and assessment evidence

See [TESTING.md](TESTING.md) for the test matrix and a checklist of screenshots/evidence to capture. Evidence should be collected from the running local or deployed website; this repository documentation does not claim that browser, device, map or email-delivery tests have already been performed.

Recommended evidence to save in an assessment evidence folder:

- Desktop and mobile screenshots of each main page.
- Programme search and category-filter results.
- Environmental map with loaded tiles and gallery lightbox open.
- Valid and invalid form attempts, including the visible success response after a real test submission.
- Responsive layout checks at mobile and desktop widths.
- SEO checks for page titles, descriptions, image alternatives and crawl file.
- GitHub commit history and the final published website.

## Development history

- [CHANGELOG.md](CHANGELOG.md) records the Part 2 corrections/improvements and Part 3 functionality added to the project.
- Use clear, focused commit messages, for example `feat: add programme search and filter`, `fix: validate enquiry form`, and `docs: update README and changelog`.

## References, libraries and APIs

- **HTML Living Standard** — WHATWG: https://html.spec.whatwg.org/
- **CSS** — MDN Web Docs: https://developer.mozilla.org/docs/Web/CSS
- **JavaScript** — MDN Web Docs: https://developer.mozilla.org/docs/Web/JavaScript
- **Leaflet 1.9.4** — interactive map library, loaded from unpkg: https://leafletjs.com/reference.html and https://unpkg.com/leaflet@1.9.4/dist/leaflet.js
- **OpenStreetMap** — map tile service and attribution: https://www.openstreetmap.org/copyright
- **Web3Forms** — AJAX form endpoint and documentation: https://web3forms.com/ and https://docs.web3forms.com/.
- **Google Maps** — embedded map search URLs used on the Contact page: https://www.google.com/maps

Third-party services may change their terms, availability or implementation. Check their current documentation before making significant changes.
