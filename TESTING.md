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
| T01 | Main navigation | Open each page and follow every header/footer navigation link. | Each link opens the correct page; no broken internal links. | Pending — record screenshots and any failures. |
| T02 | Shared CSS and images | Load each page and inspect its images and layout. | Stylesheets and images load without missing-file errors or horizontal overflow. | Pending. |
| T03 | Programme search | On Programmes, enter a word found in one programme and then a word with no match. | Matching cards remain visible; non-matching cards are hidden; result count updates. | Pending — screenshot both outcomes. |
| T04 | Programme category filter | Select each available category and then select All. | Only cards in the selected category are shown; All restores every programme. | Pending — screenshot selected filter and results. |
| T05 | Volunteer opportunities | Open Get Involved and inspect generated opportunity cards and their links. | The three programme-related opportunity cards appear; each enquiry link opens the enquiry page. | Pending — screenshot. |
| T06 | Image gallery | Open a gallery image, then close the enlarged view using its close control and Escape where supported. | Correct image and caption appear in the lightbox; it closes without leaving the page. | Pending — screenshot open lightbox. |
| T07 | FAQ accordion | Open one FAQ answer, then open another. | The selected answer opens and the previously open answer closes; expanded state is exposed to assistive technology. | Pending — screenshot. |
| T08 | Impact toggle | Activate the show-more/show-less control. | Additional content is revealed and hidden; button text and expanded state update. | Pending. |
| T09 | Environmental map | Open the page containing the map while connected to the internet. | Map appears with usable controls and map tiles; attribution is visible. | Pending — screenshot loaded map. |
| T10 | Enquiry form — invalid | Submit Get Involved with required fields empty, then test an invalid email and invalid telephone value. | Browser/JavaScript validation prevents submission and relevant error messages are displayed. | Pending — screenshot invalid state. |
| T11 | Enquiry form — valid | Enter valid test details and submit after confirming FormSubmit activation. | A sending state appears followed by a success message only when the service confirms acceptance. | Pending — use test data and record the response; do not assume delivery. |
| T12 | Contact form — invalid | Submit Contact with required fields empty and test an invalid email. | Submission is blocked and field-specific errors are visible. | Pending — screenshot invalid state. |
| T13 | Contact form — valid | Enter valid test details and submit after confirming FormSubmit activation. | A sending state appears followed by a success message only when the service confirms acceptance. | Pending — verify the receiving mailbox separately. |
| T14 | Responsive layout | Test at a narrow mobile width (for example 375 px), a tablet width and a desktop width. | Navigation, forms, images, cards and map fit the viewport; no content is clipped or requires unintended horizontal scrolling. | Pending — save mobile and desktop screenshots. |
| T15 | SEO metadata | Inspect each page source or use browser developer tools. | Each main page has a unique title, meta description and meaningful H1; image alt text is appropriate. | Pending — capture metadata evidence. |
| T16 | Crawl file | Open `/robots.txt` on the local or deployed site. | The file is served and contains the intended crawl directive. | Pending. |
| T17 | Deployment | Open the published URL over HTTPS and visit all five pages. | GitHub Pages deployment succeeds; all pages and relative assets load at the published address. | Pending — record deployed URL and deployment status. |

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

A source-code review cannot prove that the deployed website works in a real browser. The live site, responsive breakpoints, external map services and form email delivery require manual testing. FormSubmit's first-use email activation may be required before a valid submission can be delivered.
