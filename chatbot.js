// ===== AI CHATBOT =====
(function() {
  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #sp-chat-btn {
      position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #1B4FD8, #3D6FE8);
      box-shadow: 0 4px 24px rgba(27,79,216,0.5);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; border: none; transition: transform 0.3s;
      animation: chatPulse 2s infinite;
    }
    @keyframes chatPulse {
      0%,100% { box-shadow: 0 4px 24px rgba(27,79,216,0.5); }
      50% { box-shadow: 0 4px 40px rgba(27,79,216,0.8); }
    }
    #sp-chat-btn:hover { transform: scale(1.1); }
    #sp-chat-btn svg { width: 28px; height: 28px; fill: white; }
    #sp-chat-window {
      position: fixed; bottom: 6rem; right: 2rem; z-index: 9998;
      width: 360px; height: 520px; border-radius: 20px;
      background: white; box-shadow: 0 20px 60px rgba(0,0,0,0.15);
      display: none; flex-direction: column; overflow: hidden;
      border: 1px solid #E5E7EB; animation: slideUp 0.3s ease;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    #sp-chat-window.open { display: flex; }
    .sp-chat-header {
      background: linear-gradient(135deg, #1B4FD8, #3D6FE8);
      padding: 1.2rem 1.5rem; display: flex; align-items: center; gap: 0.8rem;
    }
    .sp-chat-avatar {
      width: 42px; height: 42px; border-radius: 50%;
      background: rgba(255,255,255,0.2); display: flex;
      align-items: center; justify-content: center; font-size: 1.3rem;
      flex-shrink: 0;
    }
    .sp-chat-header-info h4 { color: white; font-size: 0.95rem; font-weight: 700; margin: 0; }
    .sp-chat-header-info p { color: rgba(255,255,255,0.8); font-size: 0.75rem; margin: 0; }
    .sp-online-dot {
      width: 8px; height: 8px; background: #22C55E; border-radius: 50%;
      display: inline-block; margin-right: 4px; animation: pulse 2s infinite;
    }
    .sp-chat-close {
      margin-left: auto; background: none; border: none;
      color: white; font-size: 1.4rem; cursor: pointer; opacity: 0.8;
    }
    .sp-chat-messages {
      flex: 1; overflow-y: auto; padding: 1.2rem;
      display: flex; flex-direction: column; gap: 0.8rem;
      background: #F9FAFB;
    }
    .sp-msg {
      max-width: 82%; padding: 0.7rem 1rem; border-radius: 16px;
      font-size: 0.85rem; line-height: 1.5; animation: msgIn 0.3s ease;
    }
    @keyframes msgIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .sp-msg.bot {
      background: white; color: #1A1A2E; border-bottom-left-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06); align-self: flex-start;
    }
    .sp-msg.user {
      background: linear-gradient(135deg, #1B4FD8, #3D6FE8);
      color: white; border-bottom-right-radius: 4px; align-self: flex-end;
    }
    .sp-typing {
      display: flex; gap: 4px; align-items: center;
      padding: 0.7rem 1rem; background: white; border-radius: 16px;
      border-bottom-left-radius: 4px; align-self: flex-start;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .sp-typing span {
      width: 7px; height: 7px; background: #1B4FD8; border-radius: 50%;
      animation: typingDot 1.2s infinite;
    }
    .sp-typing span:nth-child(2) { animation-delay: 0.2s; }
    .sp-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typingDot {
      0%,60%,100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }
    .sp-quick-replies {
      display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0.5rem 1.2rem;
      background: #F9FAFB;
    }
    .sp-quick-btn {
      background: white; border: 1.5px solid #1B4FD8; color: #1B4FD8;
      border-radius: 20px; padding: 0.35rem 0.9rem; font-size: 0.78rem;
      font-weight: 600; cursor: pointer; transition: all 0.2s;
      font-family: 'Inter', sans-serif;
    }
    .sp-quick-btn:hover { background: #1B4FD8; color: white; }
    .sp-chat-input-wrap {
      padding: 1rem; border-top: 1px solid #E5E7EB; display: flex; gap: 0.5rem;
      background: white;
    }
    #sp-chat-input {
      flex: 1; border: 1.5px solid #E5E7EB; border-radius: 25px;
      padding: 0.6rem 1rem; font-size: 0.85rem; outline: none;
      font-family: 'Inter', sans-serif; transition: border-color 0.2s;
    }
    #sp-chat-input:focus { border-color: #1B4FD8; }
    #sp-chat-send {
      width: 40px; height: 40px; border-radius: 50%;
      background: linear-gradient(135deg, #1B4FD8, #3D6FE8);
      border: none; cursor: pointer; display: flex;
      align-items: center; justify-content: center; flex-shrink: 0;
      transition: transform 0.2s;
    }
    #sp-chat-send:hover { transform: scale(1.1); }
    #sp-chat-send svg { width: 18px; height: 18px; fill: white; }
    .sp-notification-badge {
      position: absolute; top: -4px; right: -4px;
      background: #EF4444; color: white; border-radius: 50%;
      width: 20px; height: 20px; font-size: 0.7rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    @media (max-width: 480px) {
      #sp-chat-window { width: calc(100vw - 2rem); right: 1rem; bottom: 5rem; }
    }
  `;
  document.head.appendChild(style);

  // Build HTML
  const chatHTML = `
    <button id="sp-chat-btn" title="Chat with Samuel">
      <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.149-1.16l-.295-.18-3.046.905.905-3.046-.18-.295A8 8 0 1112 20z"/><path d="M8 10.5h8M8 13.5h5" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>
      <div class="sp-notification-badge" id="sp-notif">1</div>
    </button>
    <div id="sp-chat-window">
      <div class="sp-chat-header">
        <div class="sp-chat-avatar">🤖</div>
        <div class="sp-chat-header-info">
          <h4>Samuel's AI Assistant</h4>
          <p><span class="sp-online-dot"></span>Online — replies instantly</p>
        </div>
        <button class="sp-chat-close" id="sp-close">✕</button>
      </div>
      <div class="sp-chat-messages" id="sp-messages"></div>
      <div class="sp-quick-replies" id="sp-quick"></div>
      <div class="sp-chat-input-wrap">
        <input type="text" id="sp-chat-input" placeholder="Ask me anything..." />
        <button id="sp-chat-send">
          <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
        </button>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.style.position = 'relative';
  wrapper.innerHTML = chatHTML;
  document.body.appendChild(wrapper);

  // State
  const messages = [];
  const messagesEl = document.getElementById('sp-messages');
  const input = document.getElementById('sp-chat-input');
  const quickEl = document.getElementById('sp-quick');

  // Quick replies
  const quickReplies = [
    'What services do you offer?',
    'How much do you charge?',
    'How do I get started?',
    'Do you work with US clients?',
  ];

  function showQuickReplies() {
    quickEl.innerHTML = '';
    quickReplies.forEach(q => {
      const btn = document.createElement('button');
      btn.className = 'sp-quick-btn';
      btn.textContent = q;
      btn.onclick = () => sendMessage(q);
      quickEl.appendChild(btn);
    });
  }

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `sp-msg ${sender}`;
    msg.textContent = text;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    messages.push({ role: sender === 'user' ? 'user' : 'assistant', content: text });
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'sp-typing';
    typing.id = 'sp-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('sp-typing');
    if (t) t.remove();
  }

  async function sendMessage(text) {
    if (!text.trim()) return;
    quickEl.innerHTML = '';
    addMessage(text, 'user');
    input.value = '';
    showTyping();

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: `You are Samuel Peter's AI assistant on his website. Samuel is a GoHighLevel Expert and Email Marketing Specialist who helps businesses in the US, UK and Canada. 

Key facts:
- Services: GoHighLevel setup & automation, Email marketing sequences, CRM automation, Sales funnels, AI chatbots, Web design, Zapier integrations
- Rating: 5.0★ on Fiverr with 50+ happy clients
- Experience: 3+ years
- Serves: US, UK and Canada clients
- Book a free call: https://calendly.com/petersamuellex/government-contract
- Email: petersamuellex@gmail.com
- WhatsApp: +234 810 643 3379

Be friendly, helpful and concise. Always end responses by encouraging them to book a free call or contact Samuel. Keep replies under 3 sentences. Never make up prices - say "Book a free call to get a custom quote".`,
          messages: messages.filter(m => m.role === 'user' || m.role === 'assistant').slice(-6)
        })
      });

      const data = await response.json();
      removeTyping();
      const reply = data.content[0].text;
      addMessage(reply, 'bot');
    } catch (err) {
      removeTyping();
      addMessage("I'm having a small hiccup! Please WhatsApp Samuel directly at +234 810 643 3379 or book a free call at calendly.com/petersamuellex/government-contract 🚀", 'bot');
    }
  }

  // Toggle chat
  document.getElementById('sp-chat-btn').onclick = () => {
    const win = document.getElementById('sp-chat-window');
    const notif = document.getElementById('sp-notif');
    win.classList.toggle('open');
    if (notif) notif.remove();
    if (win.classList.contains('open') && messagesEl.children.length === 0) {
      setTimeout(() => {
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Good morning! 🌅' : hour < 17 ? 'Good afternoon! ☀️' : 'Good evening! 🌙';
        addMessage(`${greeting} I'm Samuel's AI Assistant! I can answer questions about his services, pricing, and how he can help your business. What would you like to know? 👇`, 'bot');
        showQuickReplies();
      }, 500);
    }
  };

  document.getElementById('sp-close').onclick = () => {
    document.getElementById('sp-chat-window').classList.remove('open');
  };

  document.getElementById('sp-chat-send').onclick = () => sendMessage(input.value);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(input.value); });

  // Auto open after 30 seconds
  setTimeout(() => {
    const win = document.getElementById('sp-chat-window');
    if (!win.classList.contains('open')) {
      win.classList.add('open');
      const notif = document.getElementById('sp-notif');
      if (notif) notif.remove();
      setTimeout(() => {
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Good morning! 🌅' : hour < 17 ? 'Good afternoon! ☀️' : 'Good evening! 🌙';
        addMessage(`${greeting} I'm Samuel's AI Assistant! I can answer questions about his services, pricing, and how he can help your business. What would you like to know? 👇`, 'bot');
        showQuickReplies();
      }, 500);
    }
  }, 30000);

})();
