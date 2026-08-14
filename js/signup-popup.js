/* SaniCrete email capture — exit-intent + engagement fallback.
   Submits to Mailchimp via hidden iframe (user stays on page), then reveals the code instantly. */
(function () {
  var KEY = 'sc_popup_seen', DAYS = 30, CODE = 'SANIPATCH25', shown = false;

  // Two audiences, two offers. Product page = discount code (immediate purchase intent).
  // Blog/service pages = free assessment (these readers are researching a real floor project,
  // worth far more than a $47 patch-kit discount).
  var isProduct = /sanipatch/i.test(location.pathname);
  var OFFER = isProduct ? {
    h: 'Get 25% off your first SaniPatch',
    sub: 'Plus practical floor-repair tips for food plants. New customers only. No spam, unsubscribe anytime.',
    btn: 'Get my code',
    kind: 'code'
  } : {
    h: 'Free floor assessment for your plant',
    sub: 'Tell us where to reach you and Tyler will review your floor situation - wear, drains, shutdown windows - and what it would take to fix. No pressure, no obligation.',
    btn: 'Request my assessment',
    kind: 'assessment'
  };

  function seen(){ try{var v=localStorage.getItem(KEY);return v&&(Date.now()-+v)<DAYS*864e5;}catch(e){return false;} }
  function mark(){ try{localStorage.setItem(KEY,Date.now());}catch(e){} }

  function build() {
    var o = document.createElement('div');
    o.id = 'sc-popup';
    o.innerHTML =
      '<div class="sc-pop-back"></div>' +
      '<div class="sc-pop" role="dialog" aria-modal="true" aria-labelledby="sc-pop-h">' +
        '<button class="sc-pop-x" aria-label="Close">&times;</button>' +
        '<div class="sc-step sc-step-1">' +
          '<h3 id="sc-pop-h">' + OFFER.h + '</h3>' +
          '<p class="sc-pop-sub">' + OFFER.sub + '</p>' +
          '<form class="sc-pop-form" novalidate>' +
            '<input type="email" name="EMAIL" required placeholder="you@company.com" aria-label="Email address">' +
            '<button type="submit">' + OFFER.btn + '</button>' +
          '</form>' +
          '<p class="sc-pop-fine">By signing up you agree to our <a href="/privacy.html">Privacy Policy</a>.</p>' +
        '</div>' +
        '<div class="sc-step sc-step-2" hidden>' +
          (OFFER.kind === 'code'
            ? '<h3>Here\'s your code</h3>' +
              '<p class="sc-pop-sub">25% off your first SaniPatch order. We also emailed it to you.</p>' +
              '<div class="sc-code">' + CODE + '</div>' +
              '<button type="button" class="sc-copy">Copy code</button>' +
              '<a class="sc-shop" href="https://square.link/u/EgQnaCny" target="_blank" rel="noopener">Shop SaniPatch &rarr;</a>' +
              '<p class="sc-pop-fine">Enter it at checkout. One use per customer.</p>'
            : '<h3>Request received</h3>' +
              '<p class="sc-pop-sub">We will review your facility and follow up. If you would rather talk now, call anytime.</p>' +
              '<a class="sc-shop" href="tel:7345509445">Call (734) 550-9445</a>' +
              '<p class="sc-pop-fine">No spam. Unsubscribe anytime.</p>') +
        '</div>' +
      '</div>' +
      '<iframe name="sc-sink" style="display:none" title="hidden"></iframe>';
    document.body.appendChild(o);

    var f = o.querySelector('.sc-pop-form');
    function close(){ o.classList.remove('sc-open'); mark(); }
    o.querySelector('.sc-pop-x').addEventListener('click', close);
    o.querySelector('.sc-pop-back').addEventListener('click', close);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });

    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = f.querySelector('input[name=EMAIL]').value.trim();
      if (!email || email.indexOf('@') < 1) { f.querySelector('input').focus(); return; }
      // post to Mailchimp through a hidden iframe so the visitor never leaves the page
      var mc = document.createElement('form');
      mc.action = 'https://sanicrete.us15.list-manage.com/subscribe/post?u=1b90550e594ba5119498c43eb&id=b9adf19471';
      mc.method = 'post'; mc.target = 'sc-sink'; mc.style.display = 'none';
      mc.innerHTML =
        '<input name="EMAIL" value="' + email.replace(/"/g,'&quot;') + '">' +
        '<input name="SOURCE" value="' + (document.title||'').slice(0,60).replace(/"/g,'') + '">' +
        '<input name="b_1b90550e594ba5119498c43eb_b9adf19471" value="">';
      document.body.appendChild(mc); mc.submit();
      mark();
      if (typeof scTrack === 'function') scTrack('email_signup', OFFER.kind === 'code' ? 'popup-sanipatch' : 'popup-assessment', OFFER.kind === 'code' ? 50 : 200);
      o.querySelector('.sc-step-1').hidden = true;
      o.querySelector('.sc-step-2').hidden = false;
    });

    var cp = o.querySelector('.sc-copy'); if (cp) cp.addEventListener('click', function () {
      var btn = this;
      try { navigator.clipboard.writeText(CODE); btn.textContent = 'Copied'; }
      catch (e) { btn.textContent = 'Select and copy: ' + CODE; }
      setTimeout(function(){ btn.textContent = 'Copy code'; }, 2200);
    });

    requestAnimationFrame(function(){ o.classList.add('sc-open'); });
  }

  function fire(){ if(shown||seen())return; shown=true; build(); }
  if (seen()) return;

  // Landing pages get exit-intent ONLY (visitors are still orienting - never interrupt).
  // Content pages also use scroll/time, since intent is already established.
  var me = document.currentScript || document.querySelector('script[src*="signup-popup"]');
  var exitOnly = me && me.getAttribute('data-sc-exit-only') === '1';

  document.addEventListener('mouseout', function(e){ if(!e.relatedTarget && e.clientY<=5) fire(); });
  if (!exitOnly) {
    setTimeout(fire, 50000);
    window.addEventListener('scroll', function(){
      var h=document.body.scrollHeight-window.innerHeight;
      if(h>0 && window.scrollY/h>0.6) fire();
    }, {passive:true});
  }
})();
