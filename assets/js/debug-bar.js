(() => {

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  }

  function showBar() {
    debugBar.style.display = '';
    debugBar.style.opacity = 1;
  }

  function hideBar() {
    debugBar.style.opacity = 0;
    setTimeout(() => { debugBar.style.display = 'none'; }, 300);
  }

  function getStoredVisibility() {
    const raw = safeGet(storageKey);
    if (raw === null) return true;
    try { return JSON.parse(raw); } catch { return true; }
  }

  function setStoredVisibility(visible) {
    safeSet(storageKey, JSON.stringify(visible));
  }

  // Close other <details> when one opens
  // Set aria-expanded on summary when toggling
  function toggleDetails(event) {
    if (!event.target.open) {
      setAria(event.target.querySelector('summary'), false);
      return;
    }
    for (const d of detailsList) {
      d.open = d === event.target;
      setAria(d.querySelector('summary'), d.open);
    }
  }

  function setAria(btn, isOpen) {
    btn.setAttribute('aria-expanded', isOpen);
  }

  const storageKey = 'hugo.debug_bar';
  const detailsList = document.querySelectorAll('details');
  const toggle = document.getElementById('hdb-toggle');
  const visible = getStoredVisibility();
  const debugBar = document.getElementById('hdb-content');

  if (!debugBar) return;

  if (visible) showBar();
  else hideBar();

  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();

      setAria(toggle, visible);
      const nowVisible = !getStoredVisibility();
      setStoredVisibility(nowVisible);
      
      if (nowVisible) showBar();
      else hideBar();

      setAria(toggle, nowVisible);
    });
  }

  for (const d of detailsList) {
    d.addEventListener('toggle', toggleDetails);
  }
})();
