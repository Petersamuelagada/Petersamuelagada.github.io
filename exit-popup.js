(function() {

  // Don't show if already shown in this session
  if (sessionStorage.getItem('sp-exit-shown')) return;

  const style = document.createElement('style');
  style.textContent = `
    #sp-exit-overlay {
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(0,0,0,0.6);
      display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(4px);
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    #sp-exit-box {
      background: white; border-radius: 24px;
      max-width: 480px; width: 90%; overflow: hidden;
      box-shadow: 0 32px 80px rgba(0,0,0,0.3);
      animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
      position: relative;
    }
    @keyframes popIn {
      from { opacity: 0; transform: scale(0.85); }
      to { opacity: 1; transform: scale(1); }
    }
    #sp-exit-top {
      background: linear-gradient(135deg, #1B4FD8 0%, #3D6FE8 100%);
      padding: 2.5rem 2rem 2rem;
      text-align: center; position: relative;
    }
    #sp-exit-close {
      position: absolute; top: 1rem; right: 1rem;
      background: rgba(255,255,255,0.2); border: none;
      color: white; width: 32px; height: 32px; border-radius: 50%;
      cursor: pointer; font-size: 1rem; display: flex;
      align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    #sp-exit-close:hover { background: rgba(255,255,255,0.35); }
    #sp-exit-emoji { font-size: 3rem; margin-bottom: 0.8rem; }
    #sp-exit-top h2 {
      color: white; font-family: 'Playfair Display', serif;
      font-size: 1.6rem; font-weight: 700; line-height: 1.3;
      margin: 0 0 0.5rem;
    }
    #sp-exit-top p {
      color: rgba(255,255,255,0.85); font-size: 0.88rem;
      margin: 0; font-family: Inter, sans-serif;
    }
    #sp-exit-body { padding: 1.8rem 2rem; font-family: Inter, sans-serif; }
    #sp-exit-body ul {
      list-style: none; margin: 0 0 1.5rem; padding: 0;
      display: flex; flex-direction: column; gap: 0.7rem;
    }
    #sp-exit-body ul li {
      display: flex; align-items: center; gap: 0.7rem;
      font-size: 0.88rem; color: #374151;
    }
    #sp-exit-body ul li span.icon {
      width: 28px; height: 28px; background: #EEF3FF;
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 0.85rem; flex-shrink: 0;
    }
    #sp-exit-cta {
      display: block; width: 100%; padding: 0.9rem;
      background: linear-gradient(135deg, #1B4FD8, #3D6FE8);
      color: white; border: none; border-radius: 12px;
      font-size: 1rem; font-weight: 700; cursor: pointer;
      font-family: Inter, sans-serif; transition: transform 0.2s, box-shadow 0.2s;
      text-decoration: none; text-align: center;
      box-shadow: 0 4px 20px rgba(27,79,216,0.4);
    }
    #sp-exit-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(27,79,216,0.5); }
    #sp-exit-skip {
      display: block; text-align: center; margin-top: 0.9rem;
      font-size: 0.78rem; color: #9CA3AF; cursor: pointer;
      font-family: Inter, sans-serif; transition: color 0.2s;
    }
    #sp-exit-skip:hover { color: #6B7280; }
    #sp-exit-badge {
      display: flex; align-items: center; justify-content: center;
      gap: 0.5rem; margin-bottom: 1.2rem;
    }
    #sp-exit-badge span {
      background: #FEF3C7; color: #92400E;
      font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.8rem;
      border-radius: 20px; font-family: Inter, sans-serif;
    }
  `;
  document.head.appendChild(style);

  function showPopup() {
    if (sessionStorage.getItem('sp-exit-shown')) return;
    sessionStorage.setItem('sp-exit-shown', '1');

    const overlay = document.createElement('div');
    overlay.id = 'sp-exit-overlay';
    overlay.innerHTML = `
      <div id="sp-exit-box">
        <div id="sp-exit-top">
          <button id="sp-exit-close">✕</button>
          <div id="sp-exit-emoji">⚡</div>
          <h2>Wait — Before You Go!</h2>
          <p>Most businesses lose 60% of leads because of broken automation. Let's fix yours — for FREE.</p>
        </div>
        <div id="sp-exit-body">
          <div id="sp-exit-badge">
            <span>🎁 FREE 30-Minute Strategy Call</span>
          </div>
          <ul>
            <li><span class="icon">✅</span> I'll audit your current CRM or GHL setup</li>
            <li><span class="icon">✅</span> Show you exactly where leads are falling through</li>
            <li><span class="icon">✅</span> Give you a clear action plan — no fluff</li>
            <li><span class="icon">✅</span> No pressure. No pitch. Just real advice.</li>
          </ul>
          <a id="sp-exit-cta" href="https://calendly.com/petersamuellex/government-contract" target="_blank">
            👉 Book My Free Strategy Call Now
          </a>
          <span id="sp-exit-skip">No thanks, I don't want free advice</span>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Close handlers
    document.getElementById('sp-exit-close').onclick = close;
    document.getElementById('sp-exit-skip').onclick = close;
    overlay.onclick = (e) => { if (e.target === overlay) close(); };

    function close() {
      overlay.style.animation = 'fadeOut 0.25s ease forwards';
      overlay.style.cssText += 'animation: fadeOut 0.25s ease forwards;';
      setTimeout(() => overlay.remove(), 250);
    }
  }

  // Desktop — mouse leaves to top of page
  let triggered = false;
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 5 && !triggered) {
      triggered = true;
      setTimeout(showPopup, 200);
    }
  });

  // Mobile — back button / page hide
  window.addEventListener('pagehide', () => {
    if (!triggered) { triggered = true; showPopup(); }
  });

  // Fallback — show after 60 seconds if still on page
  setTimeout(() => {
    if (!triggered && !sessionStorage.getItem('sp-exit-shown')) {
      triggered = true;
      showPopup();
    }
  }, 60000);

})();
