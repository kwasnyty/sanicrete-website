/* Upgrades any .newsletter-form to post to Mailchimp (hidden iframe, no page leave)
   and reveal the discount code inline. Falls back gracefully if JS is unavailable. */
(function () {
  var CODE = 'SANIPATCH25';
  var MC = 'https://sanicrete.us15.list-manage.com/subscribe/post?u=1b90550e594ba5119498c43eb&id=b9adf19471';

  function upgrade(form) {
    if (form.dataset.scReady) return;
    form.dataset.scReady = '1';
    if (!document.querySelector('iframe[name=sc-sink]')) {
      var fr = document.createElement('iframe');
      fr.name = 'sc-sink'; fr.style.display = 'none'; fr.title = 'hidden';
      document.body.appendChild(fr);
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type=email]');
      var email = input ? input.value.trim() : '';
      if (!email || email.indexOf('@') < 1) { if (input) input.focus(); return; }

      var mc = document.createElement('form');
      mc.action = MC; mc.method = 'post'; mc.target = 'sc-sink'; mc.style.display = 'none';
      mc.innerHTML =
        '<input name="EMAIL" value="' + email.replace(/"/g, '&quot;') + '">' +
        '<input name="SOURCE" value="newsletter-' + (location.pathname.replace(/[^a-z0-9]/gi,'') || 'home').slice(0,30) + '">' +
        '<input name="b_1b90550e594ba5119498c43eb_b9adf19471" value="">';
      document.body.appendChild(mc); mc.submit();

      if (typeof scTrack === 'function') scTrack('email_signup', 'newsletter', 50);

      var done = document.createElement('div');
      done.className = 'sc-nl-done';
      done.innerHTML =
        '<p><strong>You\'re in.</strong> 25% off your first SaniPatch:</p>' +
        '<div class="sc-code">' + CODE + '</div>' +
        '<a class="sc-shop" href="https://square.link/u/EgQnaCny" target="_blank" rel="noopener">Shop SaniPatch &rarr;</a>' +
        '<p style="font-size:.8rem;color:#888;margin-top:10px;">Enter at checkout. One use per customer.</p>';
      form.parentNode.replaceChild(done, form);
    });
  }

  function init(){ Array.prototype.forEach.call(document.querySelectorAll('.newsletter-form'), upgrade); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
