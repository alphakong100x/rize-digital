(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        window.dataLayer = window.dataLayer || [];

        function trackOutboundLink(clickedUrl) {
            const eventData = {
                'event': 'outbound_link_click', // Event name for GTM trigger
                'clicked_url': clickedUrl
            };

            try {
                // Attempt to get the hostname from the clicked URL
                const urlObject = new URL(clickedUrl);
                eventData.link_domain = urlObject.hostname;
            } catch (e) {
                // If URL parsing fails (e.g., for non-standard URLs that might have passed initial checks)
                // console.warn('Could not parse URL for domain:', clickedUrl, e);
                eventData.link_domain = 'unknown'; 
            }
            
            window.dataLayer.push(eventData);
            // For debugging purposes, you might uncomment the following line:
            // console.log('Outbound link click tracked:', eventData);
        }

        const links = document.querySelectorAll('a[href]');
        const currentHostname = window.location.hostname;

        links.forEach(link => {
            // Ensure it's an HTTP or HTTPS protocol
            if (!link.protocol.startsWith('http')) {
                return; // Skip mailto:, tel:, javascript:, etc.
            }

            // Check if the link's hostname is different from the current site's hostname
            // and ensure link.hostname is not empty (it shouldn't be for http/https links)
            if (link.hostname && link.hostname !== currentHostname) {
                // This is an outbound link
                link.addEventListener('click', function () {
                    // 'this.href' provides the fully resolved URL of the link
                    trackOutboundLink(this.href);
                });

                // Enhance security and performance for links opening in a new tab
                if (link.target === '_blank') {
                    let relValue = link.getAttribute('rel') || '';
                    const relParts = relValue.split(' ').filter(part => part.length > 0); // Handle multiple existing values
                    
                    if (!relParts.includes('noopener')) {
                        relParts.push('noopener');
                        link.setAttribute('rel', relParts.join(' ').trim());
                    }
                }
            }
        });
    });
})();


