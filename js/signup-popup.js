/* SaniCrete email capture popup — exit-intent + engagement fallback
   Posts directly to Mailchimp's embedded-form endpoint (no API key exposed). */
(function () {
  var KEY = 'sc_popup_seen';
  var DAYS = 30;
  var shown = false;

  function seen() {
    try { var v = localStorage.getItem(KEY); return v && (Date.now() - +v) < DAYS * 864e5; }
    catch (e) { return false; }
  }
  function mark() { try { localStorage.setItem(KEY, Date.now()); } catch (e) {} }

  function build() {
    var o = document.createElement('div');
    o.id = 'sc-popup';
    o.innerHTML =
      '<div class="sc-pop-back"></div>' +
      '<div class="sc-pop" role="dialog" aria-modal="true" aria-labelledby="sc-pop-h">' +
        '<button class="sc-pop-x" aria-label="Close">&times;</button>' +
        '<h3 id="sc-pop-h">Get 25% off your first SaniPatch</h3>' +
        '<p class="sc-pop-sub">Plus practical floor-repair tips for food plants. New customers only. No spam, unsubscribe anytime.</p>' +
        '<form class="sc-pop-form" action="https://sanicrete.us15.list-manage.com/subscribe/post?u=1b90550e594ba5119498c43eb&amp;id=b9adf19471" method="post" target="_blank" novalidate>' +
          '<input type="email" name="EMAIL" required placeholder="you@company.com" aria-label="Email address">' +
          '<div style="position:absolute;left:-5000px" aria-hidden="true">' +
            '<input type="text" name="b_1b90550e594ba5119498c43eb_b9adf19471" tabindex="-1" value="">' +
          '</div>' +
          '<input type="hidden" name="SOURCE" value="' + (document.title || '').slice(0, 60) + '">' +
          '<button type="submit">Send my code</button>' +
        '</form>' +
        '<p class="sc-pop-fine">By signing up you agree to our <a href="/privacy.html">Privacy Policy</a>.</p>' +
      '</div>';
    document.body.appendChild(o);

    function close() { o.classList.remove('sc-open'); mark(); }
    o.querySelector('.sc-pop-x').addEventListener('click', close);
    o.querySelector('.sc-pop-back').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    o.querySelector('.sc-pop-form').addEventListener('submit', function () {
      mark();
      if (typeof scTrack === 'function') scTrack('email_signup', 'popup', 50);
      setTimeout(function () { o.classList.remove('sc-open'); }, 400);
    });
    requestAnimationFrame(function () { o.classList.add('sc-open'); });
  }

  function fire() {
    if (shown || seen()) return;
    shown = true;
    build();
  }

  if (seen()) return;
  // exit intent (desktop)
  document.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget && e.clientY <= 5) fire();
  });
  // engagement fallback: 50s on page, or 60% scroll (covers mobile)
  setTimeout(fire, 50000);
  window.addEventListener('scroll', function () {
    var h = document.body.scrollHeight - window.innerHeight;
    if (h > 0 && window.scrollY / h > 0.6) fire();
  }, { passive: true });
})();
