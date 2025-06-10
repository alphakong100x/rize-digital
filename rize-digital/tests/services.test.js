// tests/services.test.js
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Define the path to the HTML file we want to test
const htmlPath = path.resolve(__dirname, '../services.html');

// Read the HTML file's content
const html = fs.readFileSync(htmlPath, 'utf8');

describe('Services Page', () => {
  let document;

  beforeEach(() => {
    // Create a JSDOM instance
    const dom = new JSDOM(html);
    // Set the document object for our tests
    document = dom.window.document;
  });

  it('should have a main headline with the text "Our Digital Marketing Services"', () => {
    const heading = document.querySelector('h1');
    expect(heading).not.toBeNull(); // Check that an H1 tag exists
    expect(heading.textContent).toBe('Our Digital Marketing Services');
  });

  it('should display a grid with 6 service cards', () => {
    const cards = document.querySelectorAll('.service-card');
    expect(cards.length).toBe(6);
  });

  it('should have the first service card with correct content and link', () => {
    const firstCard = document.querySelector('.service-card');
    expect(firstCard).not.toBeNull();
    
    const cardTitle = firstCard.querySelector('h3');
    const cardLink = firstCard.querySelector('a');

    expect(cardTitle.textContent).toBe('Web Development');
    expect(cardLink.href).toContain('website-development.html');
  });
});
