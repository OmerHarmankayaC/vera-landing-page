const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const visualPanel = document.querySelector('.feature-visual-panel');
if (visualPanel) {
    console.log("Found visual panel in DOM.");
    console.log("Inner HTML:", visualPanel.innerHTML.substring(0, 100) + "...");
} else {
    console.log("NOT FOUND visual panel");
}
