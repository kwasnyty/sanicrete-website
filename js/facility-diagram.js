// Facility Diagram — Image Hotspot Tooltip Interactivity
(function() {
    var container = document.querySelector('.diagram-image-container');
    if (!container) return;

    var tooltip = container.querySelector('.diagram-tooltip');
    var tooltipTitle = tooltip.querySelector('.diagram-tooltip-title');
    var tooltipProduct = tooltip.querySelector('.diagram-tooltip-product');
    var hotspots = container.querySelectorAll('.diagram-hotspot');
    var activeZone = null;

    function showTooltip(zone, clientX, clientY) {
        var zoneName = zone.getAttribute('data-zone');
        var product = zone.getAttribute('data-product');
        tooltipTitle.textContent = zoneName;
        tooltipProduct.textContent = '\u2192 ' + product;

        // Position tooltip relative to container
        var containerRect = container.getBoundingClientRect();
        var tipX = clientX - containerRect.left + 15;
        var tipY = clientY - containerRect.top - 60;

        // Boundary checking
        tooltip.style.display = 'block';
        var tipRect = tooltip.getBoundingClientRect();
        if (tipX + tipRect.width > containerRect.width - 10) {
            tipX = clientX - containerRect.left - tipRect.width - 15;
        }
        if (tipY < 5) {
            tipY = clientY - containerRect.top + 20;
        }

        tooltip.style.left = tipX + 'px';
        tooltip.style.top = tipY + 'px';
    }

    function hideTooltip() {
        tooltip.style.display = 'none';
    }

    hotspots.forEach(function(zone) {
        // Desktop hover
        zone.addEventListener('mouseenter', function(e) {
            showTooltip(zone, e.clientX, e.clientY);
        });
        zone.addEventListener('mousemove', function(e) {
            showTooltip(zone, e.clientX, e.clientY);
        });
        zone.addEventListener('mouseleave', function() {
            hideTooltip();
        });

        // Touch: first tap = tooltip, second tap = navigate
        zone.addEventListener('touchstart', function(e) {
            if (activeZone === zone) return; // second tap navigates
            e.preventDefault();
            if (activeZone) activeZone.classList.remove('diagram-hotspot-active');
            activeZone = zone;
            zone.classList.add('diagram-hotspot-active');
            var touch = e.touches[0];
            showTooltip(zone, touch.clientX, touch.clientY);
        }, { passive: false });

        // Keyboard
        zone.addEventListener('focus', function() {
            var rect = zone.getBoundingClientRect();
            showTooltip(zone, rect.left + rect.width / 2, rect.top);
        });
        zone.addEventListener('blur', function() {
            hideTooltip();
        });
    });

    // Close on outside tap
    document.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.diagram-hotspot')) {
            if (activeZone) {
                activeZone.classList.remove('diagram-hotspot-active');
                activeZone = null;
            }
            hideTooltip();
        }
    });
})();
