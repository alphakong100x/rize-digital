// tests/case-studies.test.js
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Define the path to the HTML file we want to test
const htmlPath = path.resolve(__dirname, '../case-studies.html');

describe('Case Studies Page', () => {
  let document;

  beforeEach(() => {
    // Read the HTML file's content
    const html = fs.readFileSync(htmlPath, 'utf8');
    // Create a JSDOM instance
    const dom = new JSDOM(html);
    // Set the document object for our tests
    document = dom.window.document;
  });

  it('should have a main headline with the text "Proven Results for Home Service Businesses"', () => {
    const heading = document.querySelector('h1');
    expect(heading).not.toBeNull(); // Check that an H1 tag exists
    expect(heading.textContent).toBe('Proven Results for Home Service Businesses');
  });

  it('should display a grid of 3 case study cards', () => {
    const cards = document.querySelectorAll('.case-study-card');
    expect(cards.length).toBe(3);
  });

  it('should have the first card with HVAC Contractor content and correct link', () => {
    const firstCard = document.querySelector('.case-study-card');
    expect(firstCard).not.toBeNull();
    
    const cardLink = firstCard.querySelector('a');
    expect(cardLink).not.toBeNull();
    expect(cardLink.href).toContain('case-study-hvac.html');
    expect(firstCard.textContent).toContain('HVAC Contractor');
  });

  it('should have the second card with Excavation content and correct link', () => {
    const cards = document.querySelectorAll('.case-study-card');
    const secondCard = cards[1];
    expect(secondCard).not.toBeNull();
    
    const cardLink = secondCard.querySelector('a');
    expect(cardLink).not.toBeNull();
    expect(cardLink.href).toContain('case-study-excavation.html');
    expect(secondCard.textContent).toContain('Excavation');
  });

  it('should have the third card with Fencing content and correct link', () => {
    const cards = document.querySelectorAll('.case-study-card');
    const thirdCard = cards[2];
    expect(thirdCard).not.toBeNull();
    
    const cardLink = thirdCard.querySelector('a');
    expect(cardLink).not.toBeNull();
    expect(cardLink.href).toContain('case-study-fencing.html');
    expect(thirdCard.textContent).toContain('Fencing');
  });
});
