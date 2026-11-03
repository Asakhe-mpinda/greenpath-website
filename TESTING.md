# Testing and assessment evidence

This file is a manual test plan for the GreenPath Community Foundation website. **All items below are pending until a tester performs them and records the result.** Do not mark a test as passed based only on the presence of source code.

## Test environment record

Complete this section when testing:

- Date and time:
- Tester:
- Browser and version:
- Operating system/device:
- Website tested: local URL or deployed URL
- Screen sizes tested:
- Git commit tested:

## Functional test matrix

| ID | Feature | Test procedure | Expected result | Result / evidence |
|---|---|---|---|---|
| T01 | Main navigation and skip link | Open each page, use the skip link and follow header/footer links. | Skip link moves to main content; active header link exposes `aria-current="page"`; links open correct pages. | Pending — record screenshots and any failures. |
| T02 | Shared CSS and images | Load each page and inspect its images and layout. | Stylesheets and images load without missing-file errors or horizontal overflow. | Pending. |
| T03 | Programme search | On Programmes, enter a word found in one programme and then a word with no match. | Matching cards remain visible; non-matching cards are hidden; result count updates. | Pending — screenshot both outcomes. |
| T04 | Programme category filter | Select each available category and then select All. | Only cards in the selected category are shown; All restores every programme. | Pending — screenshot selected filter and results. |
| T05 | Volunteer opportunities | Open Programmes and inspect the generated volunteer opportunity cards and their links. | The three programme-related opportunity cards appear; each enquiry link opens the enquiry page. | Pending — screenshot. |
| T06 | Image gallery | Open a gallery image, then close the enlarged view using its close control, Escape and keyboard focus restoration. | Correct image and caption appear in the lightbox; it closes without leaving the page. | Pending — screenshot open lightbox. |
| T07 | FAQ accordion | Open one FAQ answer, then open another. | The selected answer opens and the previously open answer closes; expanded state is exposed to assistive technology. | Pending — screenshot. |
| T08 | Impact toggle | Activate the show-more/show-less control. | Additional content is revealed and hidden; button text and expanded state update. | Pending. |
| T09 | Environmental map and tile errors | Open the page containing the map online; optionally block tile requests to simulate a failure. | Map appears with controls and attribution; tile failures produce an accessible status message. | Pending — screenshot loaded map and error state if tested. |
| T10 | Enquiry form — invalid | Submit Get Involved with required fields empty, then test an invalid email and invalid telephone value. | Browser/JavaScript validation prevents submission and relevant error messages are displayed. | Pending — screenshot invalid state. |
| T11 | Enquiry form — valid and network failure | Enter fictional test details and submit after completing required Web3Forms setup; test a slow/offline request. | Sending state appears; success is shown only for an explicit successful JSON response; timeout or invalid responses show an error and restore the button. | Pending — use test data and verify the receiving mailbox separately. |
| T12 | Contact form — invalid | Submit Contact with required fields empty and test an invalid email. | Submission is blocked and field-specific errors are visible. | Pending — screenshot invalid state. |
| T13 | Contact form — valid and server response | Enter fictional test details and submit after completing required Web3Forms setup; verify the response and receiving mailbox. | The form resets and shows success only when Web3Forms explicitly confirms acceptance; unreadable or unsuccessful responses show an error. | Pending — verify the receiving mailbox separately. |
| T14 | Keyboard accessibility | Navigate each page and the gallery using only a keyboard; open and close the lightbox, including its fallback where available. | Focus indicators are visible; gallery close control receives focus; closing returns focus to the thumbnail. | Pending. |
| T15 | Responsive layout and viewport sweep | Test every page at 320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1366, 1440, 1600, 1920, 2560 and 3840 CSS px; include portrait/landscape and widths immediately around breakpoints. | Navigation, forms, images, cards, gallery, footer and maps adapt without unintended horizontal scrolling, clipping or overlap. | Pending — record actual browser, device, widths, orientation and screenshots; do not mark simulated widths as physical-device tests. |
| T16 | SEO metadata | Inspect each page source or use browser developer tools. | Each main page has a unique title, meta description and meaningful H1; image alt text is appropriate. | Pending — capture metadata evidence. |
| T17 | Crawl file | Open `/robots.txt` on the local or deployed site. | The file is served and contains the intended crawl directive. | Pending. |
| T18 | Deployment | Open the published URL over HTTPS and visit all five pages. | GitHub Pages deployment succeeds; all pages and relative assets load at the published address. | Pending — record deployed URL and deployment status. |

## Responsive browser coverage

Use browser responsive-design tools for viewport simulation, then confirm representative real devices when available. Record the browser and version for every run. Suggested browser coverage: current Chrome, Edge, Firefox, Safari and Samsung Internet where available. Test both portrait and landscape on touch devices, keyboard-only navigation on desktop, and 200% zoom. Viewport simulation does not replace real-device or cross-browser testing.

## Evidence to capture

Create an evidence folder outside the source pages or in your assessment submission, and save clearly named screenshots such as:

- `01-home-desktop.png`
- `02-home-mobile.png`
- `03-programme-search-match.png`
- `04-programme-filter.png`
- `05-gallery-lightbox.png`
- `06-map-loaded.png`
- `07-enquiry-invalid.png`
- `08-enquiry-success.png`
- `09-contact-invalid.png`
- `10-contact-success.png`
- `11-responsive-desktop.png`
- `12-responsive-mobile.png`
- `13-seo-metadata.png`
- `14-github-commits.png`
- `15-github-pages-live.png`

Only capture a success-state form screenshot after a real submission has been accepted. Use fictional test details and do not expose private personal information in evidence.

## Before submitting

- [ ] Enable GitHub Pages from branch `main`, folder `/(root)`.
- [ ] Confirm the final live URL shown by GitHub Pages and update `README.md` if it differs from the expected URL.
- [ ] Test the deployed website, not only the local copy.
- [ ] Confirm every internal link, image, CSS file and JavaScript file loads after deployment.
- [ ] Test map and gallery interactions.
- [ ] Test both invalid and valid form submissions; verify the recipient mailbox if delivery is part of the assessment.
- [ ] Capture desktop and mobile evidence.
- [ ] Review the GitHub commit history and include the repository URL in the submission.
- [ ] Replace each Pending result above with the actual result and link or filename of its evidence.

## Important limitations

A source-code review cannot prove that the deployed website works in a real browser. The live site, responsive breakpoints, external map services and form email delivery require manual testing. Web3Forms account configuration and access-key settings may be required before a valid submission can be delivered.


## Mobile navigation test case

| ID | Test | Procedure | Expected result | Status |
|---|---|---|---|---|
| T19 | Mobile menu — all pages | On each of the five pages, use a 320px, 375px, 430px and 672px viewport. Activate the Menu button, then activate each navigation link. | Menu opens as a full-width vertical panel; all five links remain readable and tappable; selecting a link navigates to the correct page and closes the panel. No horizontal overflow or clipped controls. | Pending — record browser/version and screenshots. |
| T20 | Mobile menu — keyboard and pointer | With the menu open, press Escape; reopen it and click outside; then reopen and tab through its links. | Escape closes the panel and returns focus to the Menu button; outside click closes it; keyboard focus remains visible and links can be activated. | Pending — record browser/version and result. |
| T21 | Mobile menu — resize and no-JavaScript fallback | Open the menu below 672px, resize above 672px, then test with JavaScript disabled. | Resizing to desktop closes the panel and restores horizontal navigation. Without JavaScript, the menu button stays hidden and all navigation links remain available. | Pending — record browser/version and result. |
