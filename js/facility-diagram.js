// Facility Diagram - Tooltip and Interactivity
(function() {
    var svg = document.querySelector('.facility-diagram');
    if (!svg) return;

    var tooltip = svg.querySelector('.diagram-tooltip');
    var tooltipBg = tooltip.querySelector('.diagram-tooltip-bg');
    var tooltipTitle = tooltip.querySelector('.diagram-tooltip-title');
    var tooltipProduct = tooltip.querySelector('.diagram-tooltip-product');
    var zones = svg.querySelectorAll('.diagram-zone');
    var activeZone = null;

    // Get SVG point from mouse event
    function getSVGPoint(evt) {
        var pt = svg.createSVGPoint();
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
    }

    // Show tooltip at position
    function showTooltip(zone, x, y) {
        var zoneName = zone.getAttribute('data-zone');
        var product = zone.getAttribute('data-product');
        tooltipTitle.textContent = zoneName;
        tooltipProduct.textContent = '→ ' + product;

        // Measure text width for tooltip sizing
        var titleLen = zoneName.length * 8 + 24;
        var productLen = (product.length + 2) * 7.5 + 24;
        var tooltipWidth = Math.max(titleLen, productLen, 180);
        tooltipBg.setAttribute('width', tooltipWidth);

        // Position with boundary checking
        var tooltipX = x + 15;
        var tooltipY = y - 70;
        if (tooltipX + tooltipWidth > 985) tooltipX = x - tooltipWidth - 15;
        if (tooltipY < 20) tooltipY = y + 20;

        tooltip.setAttribute('transform', 'translate(' + tooltipX + ',' + tooltipY + ')');
        tooltip.style.display = '';
    }

    function hideTooltip() {
        tooltip.style.display = 'none';
    }

    // Desktop: mouse events
    zones.forEach(function(zone) {
        zone.addEventListener('mouseenter', function(e) {
            var pt = getSVGPoint(e);
            showTooltip(zone, pt.x, pt.y);
        });

        zone.addEventListener('mousemove', function(e) {
            var pt = getSVGPoint(e);
            showTooltip(zone, pt.x, pt.y);
        });

        zone.addEventListener('mouseleave', function() {
            hideTooltip();
        });

        // Touch: first tap = show tooltip, second tap = navigate
        zone.addEventListener('touchstart', function(e) {
            if (activeZone === zone) {
                // Second tap - let the link navigate
                return;
            }
            e.preventDefault();
            // Deactivate previous
            if (activeZone) {
                activeZone.classList.remove('diagram-zone-active');
            }
            activeZone = zone;
            zone.classList.add('diagram-zone-active');

            var touch = e.touches[0];
            var pt = getSVGPoint(touch);
            showTooltip(zone, pt.x, pt.y);
        }, { passive: false });

        // Keyboard: focus/blur
        zone.addEventListener('focus', function() {
            var rect = zone.querySelector('rect') || zone.querySelector('line') || zone.querySelector('circle');
            if (rect) {
                var x = parseFloat(rect.getAttribute('cx') || rect.getAttribute('x1') || rect.getAttribute('x')) || 500;
                var y = parseFloat(rect.getAttribute('cy') || rect.getAttribute('y1') || rect.getAttribute('y')) || 300;
                showTooltip(zone, x, y);
            }
        });

        zone.addEventListener('blur', function() {
            hideTooltip();
        });
    });

    // Close tooltip on outside tap
    document.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.diagram-zone')) {
            if (activeZone) {
                activeZone.classList.remove('diagram-zone-active');
                activeZone = null;
            }
            hideTooltip();
        }
    });
})();
