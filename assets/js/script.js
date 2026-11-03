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
