// Mobile menu toggle
document.getElementById('mobileToggle').addEventListener('click', function() {
    document.getElementById('navMenu').classList.toggle('active');
});

// Mobile dropdown toggles
document.querySelectorAll('.nav-item').forEach(function(item) {
    var link = item.querySelector('.nav-link');
    var dropdown = item.querySelector('.dropdown');
    if (!dropdown || !link) return;

    link.addEventListener('click', function(e) {
        // Only toggle on mobile (when hamburger is visible)
        if (window.innerWidth <= 768) {
            e.preventDefault();
            // Close other open dropdowns
            document.querySelectorAll('.nav-item.dropdown-open').forEach(function(other) {
                if (other !== item) other.classList.remove('dropdown-open');
            });
            item.classList.toggle('dropdown-open');
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav')) {
        document.getElementById('navMenu').classList.remove('active');
        document.querySelectorAll('.nav-item.dropdown-open').forEach(function(item) {
            item.classList.remove('dropdown-open');
        });
    }
});
