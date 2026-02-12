// CloudFront Function: URL Normalization for SEO
// Attach to CloudFront distribution as a "viewer-request" function
// This eliminates duplicate URLs that cause Google Search Console issues
//
// What it does:
// 1. Redirects /index.html → / (prevents duplicate homepage)
// 2. Redirects extensionless URLs → .html (e.g., /about → /about.html)
// 3. Redirects trailing-slash URLs → .html (e.g., /about/ → /about.html)
// 4. Passes through static assets untouched (images, CSS, JS, etc.)

function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Pass through static assets — don't modify these
    if (uri.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|webp|webm|mp4|woff|woff2|ttf|eot|pdf|xml|txt|json|map)$/)) {
        return request;
    }

    // Redirect /index.html to / (canonical homepage)
    if (uri === '/index.html') {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: '/' },
                'cache-control': { value: 'max-age=3600' }
            }
        };
    }

    // Pass through .html URLs (these are the canonical versions)
    if (uri.endsWith('.html')) {
        return request;
    }

    // Root path — pass through (CloudFront default root object handles this)
    if (uri === '/') {
        return request;
    }

    // Redirect extensionless or trailing-slash URLs to .html canonical version
    // Examples: /about → /about.html, /about/ → /about.html
    //           /blog/post-name → /blog/post-name.html
    var cleanUri = uri.endsWith('/') ? uri.slice(0, -1) : uri;
    return {
        statusCode: 301,
        statusDescription: 'Moved Permanently',
        headers: {
            'location': { value: cleanUri + '.html' },
            'cache-control': { value: 'max-age=3600' }
        }
    };
}
