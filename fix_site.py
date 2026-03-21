import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# Footer switcher regex
footer_regex = re.compile(
    r'\s*<div class="lang-switcher"\s+style="background:\s*rgba\(15,\s*23,\s*42,\s*0\.04\);\s*padding:\s*4px;\s*border-radius:\s*8px;\s*margin:\s*0;"[^>]*>\s*<button class="lang-btn(?: active)?" data-lang="tr"[^>]*>TR</button>\s*<button class="lang-btn(?: active)?" data-lang="en"[^>]*>EN</button>\s*</div>',
    re.MULTILINE
)

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Remove footer switcher
    new_content = footer_regex.sub('', content)
    
    # Fix mobile top bar in index.html
    if f == 'index.html':
        if '<header class="mobile-app-header">' in new_content and 'display: flex; gap: 12px; align-items: center;' not in new_content.split('<header class="mobile-app-header">')[1][:500]:
            target = '<button class="mobile-menu-btn" id="mobileMenuBtn">'
            replacement = """<div style="display: flex; gap: 12px; align-items: center;">
            <div class="lang-switcher" style="background: rgba(15, 23, 42, 0.04); padding: 4px; border-radius: 8px;">
                <button class="lang-btn active" data-lang="tr" style="font-size: 0.75rem; padding: 4px 8px;">TR</button>
                <button class="lang-btn" data-lang="en" style="font-size: 0.75rem; padding: 4px 8px;">EN</button>
            </div>
            <button class="mobile-menu-btn" id="mobileMenuBtn">"""
            
            new_content = new_content.replace(target, replacement)
            
            # Close the div after the button
            target_close = '</button>\n    </header>'
            replacement_close = '</button>\n        </div>\n    </header>'
            new_content = new_content.replace(target_close, replacement_close)

    # Move lang-switcher out of nav-links for other pages so it shows on mobile navbar
    if f != 'index.html' and 'class="nav-wrapper"' in new_content:
        # Extract the switcher from nav-links
        nav_switcher_regex = re.compile(r'\s*<div class="lang-switcher">\s*<button class="lang-btn(?: active)?" data-lang="tr">TR</button>\s*<button class="lang-btn(?: active)?" data-lang="en">EN</button>\s*</div>', re.MULTILINE)
        
        match = nav_switcher_regex.search(new_content)
        if match:
            switcher_html = match.group(0)
            # Remove it from the current position
            new_content = new_content[:match.start()] + new_content[match.end():]
            
            # Insert it right before the action button in navbar
            # Action button looks like: <button class="btn btn-primary"
            btn_pos = new_content.find('<button class="btn btn-primary"')
            if btn_pos != -1:
                new_content = new_content[:btn_pos] + switcher_html.strip() + '\n            ' + new_content[btn_pos:]

    if content != new_content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated {f}")

# Fix CSS overflow issue
with open('styles.css', 'r', encoding='utf-8') as css_file:
    css_content = css_file.read()

if 'overflow-x: hidden;' in css_content and 'html, body {' not in css_content:
    # Add html, body overflow fix
    css_fix = """
html, body {
    overflow-x: hidden;
    width: 100%;
    position: relative;
    max-width: 100vw;
}
"""
    css_content = css_fix + css_content
    with open('styles.css', 'w', encoding='utf-8') as css_file:
        css_file.write(css_content)
    print("Updated styles.css with overflow fix")
