function processTestBadges() {
    const badges = document.querySelectorAll(
        'span[class="m_5add502a mantine-Badge-label"]',
    );

    badges.forEach((badge) => {
        // Skip if the percentage is already there
        if (badge.dataset.testPercentageAdded) return;

        const text = badge.textContent;

        // Match pattern a/b TESTS with optional whitespace around the slash
        const match = text.match(/(\d+)\s?\/\s?(\d+) TESTS/);
        if (!match) return;

        const a = parseFloat(match[1]);
        const b = parseFloat(match[2]);

        let percentage = ((a / b) * 100).toFixed(1);

        if (percentage[percentage.length - 1] === "0") {
            // Remove trailing .0 for whole numbers
            percentage = percentage.slice(0, -2);
        }

        badge.textContent = `${text} | ${percentage}%`;
        badge.dataset.testPercentageAdded = "true";
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
