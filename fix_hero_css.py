import re

with open('styles.css', 'r') as f:
    content = f.read()

# I want to replace the `.hero-glass-wrapper { display: none; }` with a properly scaled one.
# And replace `.glass-card { display: none !important; }` with selective hiding.

old_css = """    /* Hide all complex floating cards on mobile to reduce clutter completely */
    .glass-card {
        display: none !important;
    }

    .hero-glass-wrapper {
        display: none; /* Remove entirely on mobile since cards are gone */
    }"""

new_css = """    /* Hide SOME complex floating cards on mobile to reduce clutter, but keep the core ones */
    .gc-2, .gc-3, .gc-4, .gc-6, .gc-8 {
        display: none !important;
    }
    
    /* Keep gc-1, gc-5, gc-7 but scale them to fit nicely */
    .hero-glass-wrapper {
        transform: scale(0.65); /* Scale down so they aren't cramped */
        transform-origin: top center;
        margin-top: -20px;
        height: 250px;
    }
    
    .gc-1 { top: 0; left: 50%; transform: translateX(-50%); } /* Net worth center */
    .gc-7 { top: 120px; left: 10%; } /* Goal left */
    .gc-5 { top: 140px; right: 10%; } /* Savings right */
"""

content = content.replace(old_css, new_css)

with open('styles.css', 'w') as f:
    f.write(content)

