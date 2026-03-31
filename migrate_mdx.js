const fs = require('fs');
const glob = require('glob');

function migrateCodeBlocks(content) {
    let newContent = content;

    // We can just find <CodeBlock and then find its closing />
    let startIndex = newContent.indexOf('<CodeBlock');
    while (startIndex !== -1) {
        let endIndex = newContent.indexOf('/>', startIndex);
        if (endIndex === -1) break; // malformed?

        const block = newContent.substring(startIndex, endIndex + 2);
        
        // Extract the array contents inside codes={[ ... ]}
        // Instead of strict regex, let's just find the code property.
        let codeStr = '';
        let codeMatch = block.match(/code:\s*`([\s\S]*?)`/);
        if (codeMatch) {
            codeStr = codeMatch[1];
        } else {
            codeMatch = block.match(/code:\s*"([\s\S]*?)"/);
            if (codeMatch) codeStr = codeMatch[1];
        }

        let language = '';
        let langMatch = block.match(/language:\s*"([^"]*)"/);
        if (!langMatch) {
            langMatch = block.match(/language:\s*'([^']*)'/);
        }
        if (langMatch) language = langMatch[1];

        // Replace if we successfully extracted the code string
        if (codeMatch) {
            const replacement = `\`\`\`${language}\n${codeStr.trim()}\n\`\`\``;
            newContent = newContent.substring(0, startIndex) + replacement + newContent.substring(endIndex + 2);
            // Search for the next <CodeBlock starting from the end of the replacement
            startIndex = newContent.indexOf('<CodeBlock', startIndex + replacement.length);
        } else {
            // Move on to the next one
            startIndex = newContent.indexOf('<CodeBlock', endIndex + 2);
        }
    }

    return newContent;
}

const files = glob.sync('src/**/*.mdx');

for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    const migrated = migrateCodeBlocks(original);
    if (original !== migrated) {
        fs.writeFileSync(file, migrated, 'utf8');
        console.log(`Migrated: ${file}`);
    }
}
