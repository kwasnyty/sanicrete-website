// CloudFront Function: URL Normalization for SEO
// Attach to CloudFront distribution as a "viewer-request" function
// This eliminates duplicate URLs that cause Google Search Console issues
//
// What it does:
// 1. Redirects legacy/old URLs to current paths (e.g., old TDS links)
// 2. Redirects /index.html → / (prevents duplicate homepage)
// 3. Redirects extensionless URLs → .html (e.g., /about → /about.html)
// 4. Redirects trailing-slash URLs → .html (e.g., /about/ → /about.html)
// 5. Passes through static assets untouched (images, CSS, JS, etc.)

function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Redirect old/legacy URLs to current paths
    var redirects = {
        '/info/sl-stx-data/sl-tds.pdf': '/downloads/sanicrete-sl-tds.pdf',
        // Legacy pages that no longer exist — redirect to best match
        '/sanitary.html': '/products/sanitary-drains.html',
        '/industrial.html': '/industries/commercial.html',
        '/services.html': '/process.html',
        '/products.html': '/',
        '/home.html': '/',
        '/flooring.html': '/',
        '/epoxy.html': '/products/sanicoat.html',
        '/urethane.html': '/products/sanicrete-sl.html',
        '/info.html': '/resources.html',
        '/contactus.html': '/contact.html',
        '/selection.html': '/',
        '/residentialflooring.html': '/',
        // Old case studies
        '/case-study/BaremansCS': '/projects.html',
        '/info/KerryFoodCS': '/projects.html',
        // Old data sheet and color guide paths
        '/info/sl-stx-data/unsealed-color-selection.pdf': '/downloads/sanicrete-unsealed-color-guide.pdf',
        '/info/sanicoat-data/SaniCoatTDS.pdf': '/downloads/sanicoat-150p-tds.pdf',
        '/info/saniflake-data/premier-color.pdf': '/downloads/saniflake-premier-color-guide.jpg'
    };
    if (redirects[uri]) {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: redirects[uri] },
                'cache-control': { value: 'max-age=86400' }
            }
        };
    }

    // Catch-all: any old case study or /info/ path not matched above
    if (uri.startsWith('/case-study') || uri.startsWith('/casestudies')) {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: '/projects.html' },
                'cache-control': { value: 'max-age=86400' }
            }
        };
    }
    if (uri.startsWith('/info/') && !uri.startsWith('/info.html')) {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: '/resources.html' },
                'cache-control': { value: 'max-age=86400' }
            }
        };
    }

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
