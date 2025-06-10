// tests/pricing.test.js
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Define the path to the HTML file we want to test
const htmlPath = path.resolve(__dirname, '../pricing.html');

// Read the HTML file's content
const html = fs.readFileSync(htmlPath, 'utf8');

describe('Pricing Page', () => {
  let document;

  beforeEach(() => {
    // Create a JSDOM instance
    const dom = new JSDOM(html);
    // Set the document object for our tests
    document = dom.window.document;
  });

  it('should have a main headline with the text "Transparent Pricing for Guaranteed Results"', () => {
    const heading = document.querySelector('h1');
    expect(heading).not.toBeNull(); // Check that an H1 tag exists
    expect(heading.textContent).toBe('Transparent Pricing for Guaranteed Results');
  });

  it('should display 3 pricing packages', () => {
    const packages = document.querySelectorAll('.pricing-card');
    expect(packages.length).toBe(3);
  });

  it('should mark the "Regional Dominance" package as "Most Popular"', () => {
    const popularCard = document.querySelector('.pricing-card--popular');
    expect(popularCard).not.toBeNull();
    
    const cardTitle = popularCard.querySelector('h3');
    const popularBadge = popularCard.querySelector('.popular-badge');
    
    expect(cardTitle.textContent).toBe('Regional Dominance');
    expect(popularBadge.textContent).toBe('Most Popular');
  });

  it('should display the correct price for "Local Dominance" package', () => {
    const cards = document.querySelectorAll('.pricing-card');
    const localCard = Array.from(cards).find(card => 
      card.querySelector('h3').textContent === 'Local Dominance'
    );
    
    expect(localCard).not.toBeNull();
    const priceElement = localCard.querySelector('.price');
    expect(priceElement.textContent).toBe('$2,700/mo');
  });
});
