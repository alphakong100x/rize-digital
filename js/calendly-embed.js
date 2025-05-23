document.addEventListener('DOMContentLoaded', function() {
    const calendlyContainer = document.getElementById('calendly-embed-container');
    
    if (calendlyContainer) {
        // First check if the container has the placeholder class
        if (calendlyContainer.classList.contains('embed-placeholder')) {
            // If we have the actual embed code, we'd replace the placeholder
            // This is where the Calendly embed would be injected
            
            // Example of how the code would look:
            /*
            calendlyContainer.innerHTML = `
                <div class="calendly-inline-widget" 
                     data-url="https://calendly.com/rizedigital/strategy-call" 
                     style="min-width:320px;height:700px;"></div>
                <script type="text/javascript" 
                        src="https://assets.calendly.com/assets/external/widget.js" 
                        async></script>
            `;
            calendlyContainer.classList.remove('embed-placeholder');
            */
            
            // For now, we'll leave the placeholder
            console.log('Calendly embed placeholder is ready for embedding');
        }
    }
});





