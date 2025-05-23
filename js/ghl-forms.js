document.addEventListener('DOMContentLoaded', function() {
    const ghlFormContainers = document.querySelectorAll('.ghl-form-container');
    
    if (ghlFormContainers.length) {
        ghlFormContainers.forEach(container => {
            // Check if the container has the placeholder class
            if (container.classList.contains('embed-placeholder')) {
                // Here is where we would replace the placeholder with the actual GHL form
                // Example of how the code might look:
                /*
                const formId = container.getAttribute('data-form-id');
                if (formId) {
                    container.innerHTML = `
                        <iframe 
                            src="https://app.gohighlevel.com/v1/forms/${formId}"
                            frameborder="0" 
                            scrolling="no" 
                            style="width: 100%; height: 100%; min-height: 600px;">
                        </iframe>
                    `;
                    container.classList.remove('embed-placeholder');
                }
                */
                
                // For now, we'll leave the placeholder
                console.log('GHL form placeholder is ready for embedding');
            }
        });
    }
});





