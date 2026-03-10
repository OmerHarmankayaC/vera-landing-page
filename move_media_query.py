import re

with open('styles.css', 'r') as f:
    content = f.read()

# Find the start of the mobile block
start_marker = "/* Mobile Elements Hidden on Desktop */"
start_idx = content.find(start_marker)

# Find the end of the mobile block: the closing brace of the @media (max-width: 768px)
# Let's find the closing brace by counting braces or finding the exact line
lines = content[start_idx:].split('\n')
brace_count = 0
in_media = False
end_idx = 0

for i, line in enumerate(lines):
    if "@media (max-width: 768px)" in line:
        in_media = True
    
    if in_media:
        brace_count += line.count('{')
        brace_count -= line.count('}')
        
        if brace_count == 0:
            end_idx = i
            break

block_to_move = '\n'.join(lines[:end_idx+1])
remaining_content_after_block = '\n'.join(lines[end_idx+1:])

new_content = content[:start_idx] + remaining_content_after_block + '\n\n' + block_to_move + '\n'

with open('styles.css', 'w') as f:
    f.write(new_content)
