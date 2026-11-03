/* GreenPath Community Foundation interactive features. */

document.addEventListener("DOMContentLoaded", function () {
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

    // Open programme photos in a larger image lightbox.
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.querySelector(".lightbox-close");
    document.querySelectorAll("[data-lightbox-src]").forEach(function (imageButton) {
        imageButton.addEventListener("click", function () {
            if (!lightbox || !lightboxImage) return;
            const altText = imageButton.dataset.lightboxAlt || "GreenPath programme image";
            lightboxImage.src = imageButton.dataset.lightboxSrc;
            lightboxImage.alt = altText;
            if (lightboxCaption) lightboxCaption.textContent = altText;
            if (typeof lightbox.showModal === "function") lightbox.showModal();
            else lightbox.setAttribute("open", "");
        });
    });
    function closeGalleryLightbox() {
        if (!lightbox) return;
        if (typeof lightbox.close === "function" && lightbox.open) lightbox.close();
        else lightbox.removeAttribute("open");
    }
    if (lightboxClose) lightboxClose.addEventListener("click", closeGalleryLightbox);
    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) closeGalleryLightbox();
        });
        lightbox.addEventListener("close", function () {
            if (lightboxImage) lightboxImage.removeAttribute("src");
        });
    }

    // Map: display Gauteng as the broad service region stated on the home page.
    // This is a regional reference marker, not a verified office or project address.
    const mapElement = document.getElementById("greenpath-map");

    if (mapElement && typeof L !== "undefined") {
        const map = L.map("greenpath-map").setView([-26.0, 28.1], 7);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);

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
        mapElement.textContent = "The map could not load. Please check your internet connection and try again.";
    }
});
