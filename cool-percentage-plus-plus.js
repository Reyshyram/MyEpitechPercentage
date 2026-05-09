function processTestBadges() {
    const badges = document.querySelectorAll(
        'span[class="m_5add502a mantine-Badge-label"]',
    );

    badges.forEach((badge) => {
        const text = badge.textContent;

        // Match pattern a/b TESTS with optional whitespace around the slash
        const match = text.match(/(\d+)\s?\/\s?(\d+) TESTS/);

        const existingSpan = badge.querySelector("[data-test-percentage-span]");

        if (!match) {
            if (existingSpan) existingSpan.remove();
            return;
        }

        const a = parseFloat(match[1]);
        const b = parseFloat(match[2]);

        let percentage = ((a / b) * 100).toFixed(1);

        if (percentage.endsWith("0")) {
            // Remove trailing .0 for whole numbers
            percentage = percentage.slice(0, -2);
        }

        const newText = ` | ${percentage}%`;

        if (existingSpan) {
            if (existingSpan.textContent !== newText) {
                existingSpan.textContent = newText;
            }
        } else {
            const percentageSpan = document.createElement("span");
            percentageSpan.textContent = newText;
            percentageSpan.dataset.testPercentageSpan = "true";
            badge.appendChild(percentageSpan);
        }
    });
}

// Run at first load
processTestBadges();

// To reload when content is changed
const observer = new MutationObserver(() => {
    processTestBadges();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
