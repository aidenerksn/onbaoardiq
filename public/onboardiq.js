(function () {
  'use strict';

  // Resolve app_key from data attribute on this script tag
  var script = document.currentScript || document.querySelector('script[data-app-key]');
  var appKey = script && script.getAttribute('data-app-key');
  if (!appKey) return;

  var ENDPOINT = 'https://app.onboard.iq.io/api/track';

  // Session ID — persists for the browser tab lifetime
  var SK = '_oiq_sid';
  var sid = sessionStorage.getItem(SK);
  if (!sid) {
    sid = Date.now().toString(36) + Math.random().toString(36).slice(2);
    sessionStorage.setItem(SK, sid);
  }

  var pageStart = Date.now();

  // ── Core send ──────────────────────────────────────────────────────────────
  function send(event, data) {
    var payload = {
      app_key:    appKey,
      session_id: sid,
      event:      event,
      url:        location.href,
      ts:         Date.now()
    };
    if (data) {
      var keys = Object.keys(data);
      for (var i = 0; i < keys.length; i++) payload[keys[i]] = data[keys[i]];
    }
    try {
      fetch(ENDPOINT, {
        method:    'POST',
        headers:   { 'Content-Type': 'application/json' },
        body:      JSON.stringify(payload),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  // ── 1. Page view ───────────────────────────────────────────────────────────
  send('pageview', {
    title:    document.title,
    referrer: document.referrer
  });

  // ── 2 & 3. Clicks + rage-click detection ───────────────────────────────────
  var clickLog = {};

  document.addEventListener('click', function (e) {
    var el  = e.target;
    var tag = el.tagName.toLowerCase();
    var id  = el.id || null;
    var cls = typeof el.className === 'string' ? el.className.trim() || null : null;
    var key = tag + '|' + (id || '') + '|' + (cls || '');
    var now = Date.now();
    var rec = clickLog[key];

    if (!rec || now - rec.t > 2000) {
      clickLog[key] = { n: 1, t: now };
    } else {
      rec.n++;
      // Fire rage_click exactly once when threshold is hit
      if (rec.n === 3) {
        send('rage_click', { tag: tag, id: id, cls: cls });
      }
    }

    send('click', { tag: tag, id: id, cls: cls });
  }, true);

  // ── 4. Time on page — heartbeat every 30 s ────────────────────────────────
  setInterval(function () {
    send('time_on_page', {
      seconds: Math.round((Date.now() - pageStart) / 1000)
    });
  }, 30000);

  // ── 5. Form abandonment ────────────────────────────────────────────────────
  var focused = {};

  document.addEventListener('focusin', function (e) {
    var el  = e.target;
    var tag = el.tagName;
    if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') return;
    var key = el.name || el.id || el.getAttribute('type') || '_field';
    focused[key] = {
      tag:  tag.toLowerCase(),
      name: el.name || null,
      id:   el.id   || null,
      type: el.getAttribute('type') || null,
      done: false
    };
  }, true);

  document.addEventListener('submit', function (e) {
    var els = e.target.elements;
    for (var i = 0; i < els.length; i++) {
      var k = els[i].name || els[i].id || els[i].getAttribute('type') || '_field';
      if (focused[k]) focused[k].done = true;
    }
  }, true);

  // ── Flush on unload ────────────────────────────────────────────────────────
  function onUnload() {
    // Final time-on-page ping
    send('time_on_page', {
      seconds: Math.round((Date.now() - pageStart) / 1000),
      final:   true
    });
    // Report any unfocused-but-unsubmitted fields
    var keys = Object.keys(focused);
    for (var i = 0; i < keys.length; i++) {
      var f = focused[keys[i]];
      if (!f.done) {
        send('form_abandon', {
          field_tag:  f.tag,
          field_name: f.name,
          field_id:   f.id,
          field_type: f.type
        });
      }
    }
  }

  // pagehide fires more reliably on mobile; beforeunload covers desktop
  window.addEventListener('pagehide',     onUnload);
  window.addEventListener('beforeunload', onUnload);
})();
