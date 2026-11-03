/* GreenPath Community Foundation interactive features. */

document.addEventListener("DOMContentLoaded", function () {
    // Accessible primary navigation: toggle, dismiss and restore focus on mobile.
    // Find the shared header so the same menu code works on every website page.
    const siteHeader = document.querySelector("header");
    // Find the mobile menu button; safely return null if this page has no header.
    const menuToggle = siteHeader ? siteHeader.querySelector(".menu-toggle") : null;
    // Find the navigation panel that the button will show and hide.
    const primaryNavigation = siteHeader
        ? siteHeader.querySelector("#primary-navigation")
        : null;

    // Enable the collapsible menu only when all required HTML elements exist.
    if (siteHeader && menuToggle && primaryNavigation) {
        // Reveal the button only after its JavaScript behaviour is ready.
        menuToggle.hidden = false;
        // This class allows CSS to collapse the links on mobile without JavaScript fallback issues.
        siteHeader.classList.add("menu-enhanced");

        // Close the panel, reset its accessible state and optionally return keyboard focus.
        function closeMobileMenu(restoreFocus) {
            // Remove the open class so CSS hides the mobile navigation panel.
            siteHeader.classList.remove("menu-open");
            // Tell screen readers that the controlled navigation panel is now closed.
            menuToggle.setAttribute("aria-expanded", "false");
            // Restore the button label to Menu after closing the panel.
            menuToggle.querySelector(".menu-toggle-label").textContent = "Menu";
            // Return focus to the button when the user closes the panel with Escape.
            if (restoreFocus) menuToggle.focus();
        }

        // Toggle the navigation panel when the visitor activates the menu button.
        menuToggle.addEventListener("click", function () {
            // Read the current state so the next click opens or closes the panel correctly.
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
            // Apply or remove the CSS class that controls the panel visibility and icon shape.
            siteHeader.classList.toggle("menu-open", !isOpen);
            // Keep the accessible expanded state in sync with the visual menu state.
            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            // Update the visible button label so it describes the action available next.
            menuToggle.querySelector(".menu-toggle-label").textContent = isOpen ? "Menu" : "Close";
        });

        // Close the menu after a visitor chooses any page link.
        primaryNavigation.addEventListener("click", function (event) {
            if (event.target.closest("a")) closeMobileMenu(false);
        });

        // Allow keyboard users to dismiss an open menu with the Escape key.
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && siteHeader.classList.contains("menu-open")) {
                closeMobileMenu(true);
            }
        });

        // Close the panel when a click happens outside the header and menu.
        document.addEventListener("click", function (event) {
            if (siteHeader.classList.contains("menu-open") && !siteHeader.contains(event.target)) {
                closeMobileMenu(false);
            }
        });

        // Detect when the viewport crosses into desktop layout above the mobile breakpoint.
        // Guard matchMedia so older or embedded browsers can still use the other page features.
        if (typeof window.matchMedia === "function") {
            const desktopViewport = window.matchMedia("(min-width: 42.001rem)");

            // Ensure the mobile panel is not left open when the desktop layout returns.
            function handleNavigationViewportChange(event) {
                if (event.matches) closeMobileMenu(false);
            }

            // Use the modern media-query listener, with a fallback for older browsers.
            if (typeof desktopViewport.addEventListener === "function") {
                desktopViewport.addEventListener("change", handleNavigationViewportChange);
            } else if (typeof desktopViewport.addListener === "function") {
                desktopViewport.addListener(handleNavigationViewportChange);
            }
        }
    }

    // Accordion: open the selected answer and close the others.
    const accordionButtons = document.querySelectorAll(".accordion-trigger");

    accordionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const isExpanded = button.getAttribute("aria-expanded") === "true";
            const panelId = button.getAttribute("aria-controls");
            const panel = document.getElementById(panelId);

            // Close all answers before opening the selected answer.
            accordionButtons.forEach(function (otherButton) {
                const otherPanel = document.getElementById(
                    otherButton.getAttribute("aria-controls")
                );
                otherButton.setAttribute("aria-expanded", "false");
                if (otherPanel) {
                    otherPanel.hidden = true;
                }
            });

            // Toggle the selected answer and keep its accessibility state in sync.
            if (!isExpanded && panel) {
                button.setAttribute("aria-expanded", "true");
                panel.hidden = false;
            }
        });
    });

    // DOM manipulation: reveal additional impact information on demand.
    const impactToggle = document.querySelector(".impact-toggle");
    const impactExtraContent = document.getElementById("impact-extra-content");

    if (impactToggle && impactExtraContent) {
        impactToggle.addEventListener("click", function () {
            const isExpanded = impactToggle.getAttribute("aria-expanded") === "true";
            impactExtraContent.hidden = isExpanded;
            impactToggle.setAttribute("aria-expanded", String(!isExpanded));
            impactToggle.textContent = isExpanded
                ? "Show more about our impact"
                : "Show less about our impact";
        });
    }

    // DOM manipulation: reveal page sections when they enter the visitor's screen.
    const revealElements = document.querySelectorAll(
        "main > section, .faq-item"
    );

    revealElements.forEach(function (element) {
        element.classList.add("js-reveal");
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        // Keep all content visible in browsers without IntersectionObserver support.
        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });
    }

    // Search and filter programme cards by text and category.
    const programmeSearch = document.getElementById("programme-search");
    const programmeFilter = document.getElementById("programme-filter");
    const programmeCards = document.querySelectorAll("[data-programme-card]");
    const programmeResults = document.getElementById("programme-results");

    function filterProgrammes() {
        if (!programmeSearch || !programmeFilter) return;
        const searchTerm = programmeSearch.value.trim().toLowerCase();
        const selectedCategory = programmeFilter.value;
        let visibleCount = 0;
        programmeCards.forEach(function (card) {
            const matchesText = card.textContent.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === "all" || card.dataset.category === selectedCategory;
            card.hidden = !(matchesText && matchesCategory);
            if (!card.hidden) visibleCount += 1;
        });
        if (programmeResults) {
            programmeResults.textContent = "Showing " + visibleCount + (visibleCount === 1 ? " programme." : " programmes.");
        }
    }
    if (programmeSearch && programmeFilter) {
        programmeSearch.addEventListener("input", filterProgrammes);
        programmeFilter.addEventListener("change", filterProgrammes);
    }

    // Generate volunteer opportunity cards from GreenPath's three existing programme themes.
    const opportunitiesContainer = document.getElementById("opportunities-list");
    if (opportunitiesContainer) {
        const opportunities = [
            { title: "Tree-Planting Volunteer", category: "Tree Planting", description: "Help prepare planting areas, plant young trees and care for greener community spaces." },
            { title: "Recycling Education Support", category: "Recycling Education", description: "Support activities that teach households and learners to reduce, reuse and recycle." },
            { title: "Community Clean-Up Volunteer", category: "Community Clean-Ups", description: "Help remove litter and encourage responsible care of shared public spaces." }
        ];
        opportunitiesContainer.replaceChildren();
        opportunities.forEach(function (opportunity) {
            const card = document.createElement("article");
            card.className = "opportunity-card";
            const title = document.createElement("h3");
            title.textContent = opportunity.title;
            const category = document.createElement("p");
            category.className = "opportunity-category";
            category.textContent = opportunity.category;
            const description = document.createElement("p");
            description.textContent = opportunity.description;
            const link = document.createElement("a");
            link.href = "enquiry.html";
            link.className = "cta-button";
            link.textContent = "Enquire about this role";
            card.append(title, category, description, link);
            opportunitiesContainer.appendChild(card);
        });
    }

    // Open programme photos in an accessible image lightbox.
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.querySelector(".lightbox-close");
    let lastGalleryTrigger = null;

    function closeGalleryLightbox() {
        if (!lightbox) return;
        if (typeof lightbox.close === "function" && lightbox.open) {
            lightbox.close();
        } else {
            lightbox.removeAttribute("open");
            if (lastGalleryTrigger) lastGalleryTrigger.focus();
        }
    }

    document.querySelectorAll("[data-lightbox-src]").forEach(function (imageButton) {
        imageButton.addEventListener("click", function () {
            if (!lightbox || !lightboxImage) return;
            lastGalleryTrigger = imageButton;
            const altText = imageButton.dataset.lightboxAlt || "GreenPath programme image";
            lightboxImage.src = imageButton.dataset.lightboxSrc;
            lightboxImage.alt = altText;
            if (lightboxCaption) lightboxCaption.textContent = altText;

            if (typeof lightbox.showModal === "function") {
                lightbox.showModal();
            } else {
                lightbox.setAttribute("open", "");
            }
            if (lightboxClose) lightboxClose.focus();
            else lightbox.focus();
        });
    });

    if (lightboxClose) lightboxClose.addEventListener("click", closeGalleryLightbox);
    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) closeGalleryLightbox();
        });
        lightbox.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && typeof lightbox.showModal !== "function") {
                event.preventDefault();
                closeGalleryLightbox();
            }
        });
        lightbox.addEventListener("close", function () {
            if (lightboxImage) lightboxImage.removeAttribute("src");
            if (lastGalleryTrigger) lastGalleryTrigger.focus();
        });
    }

    // Submit the enquiry and contact forms through Web3Forms.
    // The access key is already a hidden form field, so FormData includes it once.
    document.querySelectorAll(".js-ajax-form").forEach(function (form) {
        // Prevent accidental duplicate event handlers if this script is ever re-initialised.
        if (form.dataset.web3formsReady === "true") return;
        form.dataset.web3formsReady = "true";

        const status = form.querySelector(".form-status");
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
        const accessKey = form.querySelector('input[name="access_key"]');
        const fields = Array.from(form.querySelectorAll(
            'input:not([type="hidden"]):not([name="botcheck"]), select, textarea'
        ));
        let isSubmitting = false;

        // Fail clearly when the endpoint or hidden access-key field is missing.
        if (form.action !== "https://api.web3forms.com/submit" || !accessKey || !accessKey.value.trim()) {
            if (status) {
                status.textContent = "This form is not configured correctly. Please contact the website administrator.";
            }
            if (submitButton) submitButton.disabled = true;
            return;
        }

        function showFieldError(field) {
            const errorElement = field.id
                ? document.getElementById(field.id + "-error")
                : null;
            if (!errorElement) return "";

            let message = "";
            if (field.validity.valueMissing) {
                message = "Please complete this field.";
            } else if (field.validity.typeMismatch) {
                message = "Please enter a valid email address.";
            } else if (field.validity.tooShort) {
                message = "Please enter at least " + field.minLength + " characters.";
            } else if (field.validity.tooLong) {
                message = "Please keep this to " + field.maxLength + " characters or fewer.";
            } else if (field.validity.patternMismatch) {
                message = "Please enter a valid value in the requested format.";
            }

            // HTML telephone validation does not enforce a minimum digit count by itself.
            if (field.type === "tel" && field.value &&
                field.value.replace(/[^0-9]/g, "").length < 7) {
                message = "Please enter a telephone number containing at least 7 digits.";
            }

            errorElement.textContent = message;
            field.setAttribute("aria-invalid", message ? "true" : "false");
            return message;
        }

        // Clear or update field-level feedback as visitors complete the form.
        fields.forEach(function (field) {
            field.addEventListener("input", function () {
                showFieldError(field);
            });
            field.addEventListener("change", function () {
                showFieldError(field);
            });
        });

        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Ignore rapid repeated submissions while the current request is pending.
            if (isSubmitting) return;
            if (status) status.textContent = "";

            let firstInvalid = null;
            fields.forEach(function (field) {
                if (showFieldError(field) && !firstInvalid) firstInvalid = field;
            });

            // Keep native required/type checks alongside the accessible custom messages.
            if (!form.checkValidity() || firstInvalid) {
                if (status) {
                    status.textContent = "Please correct the highlighted fields before submitting.";
                }
                if (firstInvalid) firstInvalid.focus();
                else form.reportValidity();
                return;
            }

            isSubmitting = true;
            const originalLabel = submitButton
                ? (submitButton.tagName === "INPUT" ? submitButton.value : submitButton.textContent)
                : "";
            const controller = new AbortController();
            const timeoutId = window.setTimeout(function () {
                controller.abort();
            }, 15000);

            if (submitButton) {
                submitButton.disabled = true;
                if (submitButton.tagName === "INPUT") {
                    submitButton.value = "Sending...";
                } else {
                    submitButton.textContent = "Sending...";
                }
            }
            if (status) status.textContent = "Sending your message securely...";

            try {
                // FormData carries the hidden access_key and botcheck fields automatically.
                // Do not append a second access_key: that can create duplicate form values.
                const response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: { "Accept": "application/json" },
                    signal: controller.signal
                });

                const responseText = await response.text();
                let result;
                try {
                    result = JSON.parse(responseText);
                } catch (parseError) {
                    throw new Error("The form service returned an unreadable response. Please try again later.");
                }

                // HTTP 200 alone is not enough: require Web3Forms' explicit success flag.
                if (!response.ok || !result || result.success !== true) {
                    throw new Error(result && result.message
                        ? result.message
                        : "The form service could not accept your submission.");
                }

                form.reset();
                fields.forEach(function (field) {
                    field.removeAttribute("aria-invalid");
                    const errorElement = field.id
                        ? document.getElementById(field.id + "-error")
                        : null;
                    if (errorElement) errorElement.textContent = "";
                });

                if (status) {
                    status.textContent = "Thank you. Your " +
                        (form.dataset.formName === "enquiry" ? "enquiry" : "message") +
                        " has been submitted successfully.";
                }
            } catch (error) {
                if (status) {
                    status.textContent = error && error.name === "AbortError"
                        ? "The request took too long. Please check your connection and try again."
                        : (error && error.message
                            ? error.message
                            : "We could not send your message. Please try again later.");
                }
            } finally {
                window.clearTimeout(timeoutId);
                isSubmitting = false;
                if (submitButton) {
                    submitButton.disabled = false;
                    if (submitButton.tagName === "INPUT") {
                        submitButton.value = originalLabel;
                    } else {
                        submitButton.textContent = originalLabel;
                    }
                }
            }
        });
    });

    // Map: display Gauteng as the broad service region stated on the home page.
    // This is a regional reference marker, not a verified office or project address.
    const mapElement = document.getElementById("greenpath-map");

    if (mapElement && typeof L !== "undefined") {
        const map = L.map("greenpath-map").setView([-26.0, 28.1], 7);
        const mapStatus = mapElement.parentElement
            ? mapElement.parentElement.querySelector(".map-note")
            : null;

        const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);

        tileLayer.on("tileerror", function () {
            if (mapStatus) {
                mapStatus.textContent = "Some map tiles could not load. Check your internet connection or try again later.";
                mapStatus.setAttribute("role", "status");
                mapStatus.setAttribute("aria-live", "polite");
            }
        });

        L.marker([-26.0, 28.1]).addTo(map)
            .bindPopup(
                "<strong>GreenPath service region</strong><br>" +
                "Gauteng, South Africa<br>" +
                "Contact GreenPath for confirmed project and collection-point locations."
            )
            .openPopup();

        // Recalculate map dimensions when the page layout finishes rendering.
        window.setTimeout(function () {
            map.invalidateSize();
        }, 250);
    } else if (mapElement) {
        mapElement.textContent = "The map could not load because the map library is unavailable. Please check your internet connection and refresh the page.";
        mapElement.setAttribute("role", "status");
    }
});
