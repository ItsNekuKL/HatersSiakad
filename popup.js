document.getElementById('runBtn').addEventListener('click', async () => {
  const opts = {
    visibility: document.getElementById('chk-visibility').checked,
    jquery:     document.getElementById('chk-jquery').checked,
    timer:      document.getElementById('chk-timer').checked,
    storage:    document.getElementById('chk-storage').checked,
    copas:      document.getElementById('chk-copas').checked,
    select:     document.getElementById('chk-select').checked,
  };

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: runHelper,
    args: [opts],
  });

  const status = document.getElementById('status');
  status.textContent = '✅ Berhasil dijalankan!';
  setTimeout(() => { status.textContent = ''; }, 3000);
});

function runHelper(opts) {
  // ── 1. Nipu Visibility ──────────────────────────────────────────
  if (opts.visibility) {
    try {
      Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: true });
      Object.defineProperty(document, 'hidden', { value: false, writable: true });
    } catch (e) {
      // sudah di-define sebelumnya, skip
    }
    // Prevent visibilitychange event dari jalan
    document.addEventListener('visibilitychange', e => e.stopImmediatePropagation(), true);
    window.addEventListener('blur', e => e.stopImmediatePropagation(), true);
    window.addEventListener('focus', e => e.stopImmediatePropagation(), true);
  }

  // ── 2. Kill jQuery Events ───────────────────────────────────────
  if (opts.jquery && typeof $ !== 'undefined') {
    $(window).off("blur focus");
    $(document).off("visibilitychange");
  }

  // ── 3. Bantai Semua Timer ───────────────────────────────────────
  if (opts.timer) {
    for (let i = 1; i < 99999; i++) window.clearInterval(i);
  }

  // ── 4. Reset Cheat Counter ──────────────────────────────────────
  if (opts.storage) {
    localStorage.setItem("cheat", 0);
  }

  // ── 5. Bypass Copy-Paste ────────────────────────────────────────
  if (opts.copas) {
    const jebolCopas = (e) => e.stopImmediatePropagation();
    ['copy', 'paste', 'cut', 'contextmenu', 'selectstart'].forEach(event => {
      document.addEventListener(event, jebolCopas, true);
    });

    if (typeof $ !== 'undefined') {
      $(document).off("copy paste cut contextmenu selectstart");
      $('*').off("copy paste cut contextmenu selectstart");
    }
  }

  // ── 6. Force User Select via CSS ───────────────────────────────
  if (opts.select) {
    const existing = document.getElementById('__helper_select_style__');
    if (!existing) {
      const style = document.createElement('style');
      style.id = '__helper_select_style__';
      style.innerHTML = '* { -webkit-user-select: text !important; user-select: text !important; }';
      document.head.appendChild(style);
    }
  }
}
