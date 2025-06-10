/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Contact Page', () => {
    let contactHtml;

    beforeAll(() => {
        // Load the contact.html file
        const contactPath = path.join(__dirname, '../contact.html');
        contactHtml = fs.readFileSync(contactPath, 'utf8');
        
        // Set up DOM
        document.documentElement.innerHTML = contactHtml;
    });

    test('should exist and contain main heading', () => {
        const heading = document.querySelector('h1');
        expect(heading).toBeTruthy();
        expect(heading.textContent.trim()).toBe('Get Your Free Consultation');
    });

    test('should contain a contact form with submit button', () => {
        const form = document.querySelector('form');
        expect(form).toBeTruthy();
        
        const submitButton = form.querySelector('button[type="submit"]');
        expect(submitButton).toBeTruthy();
    });

    test('should contain name input field', () => {
        const nameInput = document.querySelector('input[name="name"]');
        expect(nameInput).toBeTruthy();
        expect(nameInput.type).toBe('text');
        
        const nameLabel = document.querySelector('label[for="name"]');
        expect(nameLabel).toBeTruthy();
    });

    test('should contain all required form fields', () => {
        // Email field
        const emailInput = document.querySelector('input[name="email"]');
        expect(emailInput).toBeTruthy();
        expect(emailInput.type).toBe('email');
        
        // Phone field
        const phoneInput = document.querySelector('input[name="phone"]');
        expect(phoneInput).toBeTruthy();
        expect(phoneInput.type).toBe('tel');
        
        // Company field
        const companyInput = document.querySelector('input[name="company"]');
        expect(companyInput).toBeTruthy();
        expect(companyInput.type).toBe('text');
        
        // Message field
        const messageTextarea = document.querySelector('textarea[name="message"]');
        expect(messageTextarea).toBeTruthy();
    });

    test('should contain business information section', () => {
        const businessInfo = document.querySelector('.business-info');
        expect(businessInfo).toBeTruthy();
        
        const businessTitle = businessInfo.querySelector('h2');
        expect(businessTitle).toBeTruthy();
        expect(businessTitle.textContent.trim()).toBe('Get In Touch');
    });
});
