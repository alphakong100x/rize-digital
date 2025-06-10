/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Lead Generation Service Page', () => {
    let leadGenHtml;

    beforeAll(() => {
        // Load the lead-generation.html file
        const leadGenPath = path.join(__dirname, '../lead-generation.html');
        leadGenHtml = fs.readFileSync(leadGenPath, 'utf8');
        
        // Set up DOM
        document.documentElement.innerHTML = leadGenHtml;
    });

    test('should have a main headline with the text "Strategic Lead Generation"', () => {
        const heading = document.querySelector('h1');
        expect(heading).toBeTruthy();
        // We check for part of the headline to be less brittle
        expect(heading.textContent).toContain('Strategic Lead Generation');
    });

    test('should contain the hero subtitle about qualified prospects', () => {
        const subtitle = document.querySelector('.hero-subtitle');
        expect(subtitle).toBeTruthy();
        expect(subtitle.textContent).toContain('Consistent, High-Quality Leads Engineered for Your Success');
    });

    test('should have the main approach section', () => {
        const approachSection = document.querySelector('.approach-section');
        expect(approachSection).toBeTruthy();
        
        const approachHeading = approachSection.querySelector('h2');
        expect(approachHeading).toBeTruthy();
        expect(approachHeading.textContent).toContain('Our Approach: Precision Targeting & Exclusive Partnership');
    });

    test('should contain feature cards for the approach', () => {
        const featureCards = document.querySelectorAll('.feature-card');
        expect(featureCards.length).toBeGreaterThanOrEqual(3);
        
        // Check for specific features
        const cardTexts = Array.from(featureCards).map(card => card.textContent);
        const combinedText = cardTexts.join(' ');
        expect(combinedText).toContain('Strategic Multi-Channel Execution');
        expect(combinedText).toContain('Conversion-Focused Design');
        expect(combinedText).toContain('Unwavering Exclusivity');
    });

    test('should have the process section with steps', () => {
        const processSection = document.querySelector('.process-section');
        expect(processSection).toBeTruthy();
        
        const steps = processSection.querySelectorAll('.step');
        expect(steps.length).toBe(6);
        
        // Check first and last step
        expect(steps[0].textContent).toContain('Discovery & Strategy Foundation');
        expect(steps[5].textContent).toContain('Transparent Reporting & Strategic Insights');
    });

    test('should contain benefits section with benefit items', () => {
        const benefitsSection = document.querySelector('.benefits-section');
        expect(benefitsSection).toBeTruthy();
        
        const benefitItems = benefitsSection.querySelectorAll('.benefit-item');
        expect(benefitItems.length).toBe(6);
        
        // Check for specific benefits
        const benefitTexts = Array.from(benefitItems).map(item => item.textContent);
        const combinedText = benefitTexts.join(' ');
        expect(combinedText).toContain('Exclusive Market Advantage');
        expect(combinedText).toContain('Predictable Lead Flow');
    });

    test('should have industries section', () => {
        const industriesSection = document.querySelector('.industries-section');
        expect(industriesSection).toBeTruthy();
        
        const industryItems = industriesSection.querySelectorAll('.industry-item');
        expect(industryItems.length).toBeGreaterThanOrEqual(7);
        
        // Check for specific industries
        const industryTexts = Array.from(industryItems).map(item => item.textContent);
        const combinedText = industryTexts.join(' ');
        expect(combinedText).toContain('Tree services');
        expect(combinedText).toContain('Fencing contractors');
    });

    test('should contain CTA section with buttons', () => {
        const ctaSection = document.querySelector('.cta-section');
        expect(ctaSection).toBeTruthy();
        
        const ctaButtons = ctaSection.querySelectorAll('.btn-primary, .btn-secondary');
        expect(ctaButtons.length).toBe(2);
        
        // Check button texts
        const buttonTexts = Array.from(ctaButtons).map(btn => btn.textContent);
        expect(buttonTexts.some(text => text.includes('Free Lead Generation Strategy Session'))).toBe(true);
        expect(buttonTexts.some(text => text.includes('Case Studies'))).toBe(true);
    });
});
