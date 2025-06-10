const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Case Study Detail Page - HVAC Contractor', () => {
    let dom;
    let document;

    beforeAll(() => {
        const filePath = path.join(__dirname, '../case-study-hvac.html');
        const html = fs.readFileSync(filePath, 'utf8');
        dom = new JSDOM(html);
        document = dom.window.document;
    });

    test('should have a main headline with "Case Study: HVAC Contractor"', () => {
        const mainHeadline = document.querySelector('h1');
        expect(mainHeadline).toBeTruthy();
        expect(mainHeadline.textContent.trim()).toBe('Case Study: HVAC Contractor');
    });

    test('should have a "The Challenge" section', () => {
        const challengeHeading = document.querySelector('h2');
        expect(challengeHeading).toBeTruthy();
        expect(challengeHeading.textContent.trim()).toBe('The Challenge');
    });

    test('should have a "The Solution" section', () => {
        const headings = document.querySelectorAll('h2');
        const solutionHeading = Array.from(headings).find(h => h.textContent.trim() === 'The Solution');
        expect(solutionHeading).toBeTruthy();
    });

    test('should have a "The Results" section', () => {
        const headings = document.querySelectorAll('h2');
        const resultsHeading = Array.from(headings).find(h => h.textContent.trim() === 'The Results');
        expect(resultsHeading).toBeTruthy();
    });
});
