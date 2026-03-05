(function() {
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
      50% { box-shadow: 0 4px 40px rgba(27,79,216,0.9); }
    }
    #sp-chat-btn:hover { transform: scale(1.1); }
    #sp-chat-btn svg { width: 28px; height: 28px; fill: white; }
    #sp-notif {
      position: absolute; top: -4px; right: -4px;
      background: #EF4444; color: white; border-radius: 50%;
      width: 20px; height: 20px; font-size: 0.7rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    #sp-chat-window {
      position: fixed; bottom: 6rem; right: 2rem; z-index: 9998;
      width: 360px; height: 520px; border-radius: 20px;
      background: white; box-shadow: 0 20px 60px rgba(0,0,0,0.18);
      display: none; flex-direction: column; overflow: hidden;
      border: 1px solid #E5E7EB;
    }
    #sp-chat-window.open { display: flex; animation: slideUp 0.3s ease; }
    @keyframes slideUp {
      from { opacity:0; transform:translateY(20px); }
      to { opacity:1; transform:translateY(0); }
    }
    .sp-header {
      background: linear-gradient(135deg, #1B4FD8, #3D6FE8);
      padding: 1rem 1.2rem; display: flex; align-items: center; gap: 0.8rem;
    }
    .sp-avatar { font-size: 1.8rem; }
    .sp-header h4 { color: white; font-size: 0.95rem; font-weight: 700; margin: 0; font-family: Inter, sans-serif; }
    .sp-header p { color: rgba(255,255,255,0.85); font-size: 0.72rem; margin: 0; font-family: Inter, sans-serif; }
    .sp-dot { width:8px; height:8px; background:#22C55E; border-radius:50%; display:inline-block; margin-right:4px; }
    .sp-close { margin-left:auto; background:none; border:none; color:white; font-size:1.3rem; cursor:pointer; }
    .sp-messages {
      flex:1; overflow-y:auto; padding:1rem;
      display:flex; flex-direction:column; gap:0.7rem; background:#F9FAFB;
    }
    .sp-msg {
      max-width:85%; padding:0.7rem 1rem; border-radius:16px;
      font-size:0.83rem; line-height:1.55; font-family:Inter,sans-serif;
      animation: msgIn 0.3s ease;
    }
    @keyframes msgIn {
      from { opacity:0; transform:translateY(6px); }
      to { opacity:1; transform:translateY(0); }
    }
    .sp-msg.bot {
      background:white; color:#1A1A2E; border-bottom-left-radius:4px;
      box-shadow:0 2px 8px rgba(0,0,0,0.07); align-self:flex-start;
    }
    .sp-msg.user {
      background:linear-gradient(135deg,#1B4FD8,#3D6FE8);
      color:white; border-bottom-right-radius:4px; align-self:flex-end;
    }
    .sp-typing {
      display:flex; gap:4px; align-items:center; padding:0.7rem 1rem;
      background:white; border-radius:16px; border-bottom-left-radius:4px;
      align-self:flex-start; box-shadow:0 2px 8px rgba(0,0,0,0.07);
    }
    .sp-typing span {
      width:7px; height:7px; background:#1B4FD8; border-radius:50%;
      animation:dot 1.2s infinite;
    }
    .sp-typing span:nth-child(2){animation-delay:0.2s;}
    .sp-typing span:nth-child(3){animation-delay:0.4s;}
    @keyframes dot {
      0%,60%,100%{transform:translateY(0);opacity:0.4;}
      30%{transform:translateY(-6px);opacity:1;}
    }
    .sp-quick { display:flex; flex-wrap:wrap; gap:0.4rem; padding:0.6rem 1rem; background:#F9FAFB; }
    .sp-qbtn {
      background:white; border:1.5px solid #1B4FD8; color:#1B4FD8;
      border-radius:20px; padding:0.3rem 0.8rem; font-size:0.75rem;
      font-weight:600; cursor:pointer; transition:all 0.2s; font-family:Inter,sans-serif;
    }
    .sp-qbtn:hover { background:#1B4FD8; color:white; }
    .sp-input-wrap {
      padding:0.8rem; border-top:1px solid #E5E7EB;
      display:flex; gap:0.5rem; background:white;
    }
    #sp-input {
      flex:1; border:1.5px solid #E5E7EB; border-radius:25px;
      padding:0.55rem 1rem; font-size:0.83rem; outline:none;
      font-family:Inter,sans-serif; transition:border-color 0.2s;
    }
    #sp-input:focus { border-color:#1B4FD8; }
    #sp-send {
      width:38px; height:38px; border-radius:50%;
      background:linear-gradient(135deg,#1B4FD8,#3D6FE8);
      border:none; cursor:pointer; display:flex;
      align-items:center; justify-content:center; flex-shrink:0;
    }
    #sp-send svg { width:16px; height:16px; fill:white; }
    @media(max-width:480px){
      #sp-chat-window{width:calc(100vw - 2rem);right:1rem;}
    }
  `;
  document.head.appendChild(style);

  // Knowledge base
  const KB = [
    {
      keys: ['service', 'offer', 'do', 'help', 'what'],
      answer: `Here's what Samuel offers:\n\n⚡ GoHighLevel Setup & Automation\n📧 Email Marketing & Sequences\n🔗 CRM Automation\n🚀 Sales Funnels & Landing Pages\n🤖 AI Chatbot Integration\n🌐 Web Design & Development\n🔌 Zapier & Third-Party Integrations\n\nWant to know more about any specific service?`
    },
    {
      keys: ['price', 'cost', 'charge', 'rate', 'how much', 'fee', 'pay'],
      answer: `Samuel offers custom pricing based on your project needs. There's no fixed rate — every business is different!\n\n💡 Book a FREE 30-minute discovery call to get a custom quote:\n👉 calendly.com/petersamuellex/government-contract\n\nNo pressure, no obligation!`
    },
    {
      keys: ['start', 'begin', 'hire', 'work', 'process', 'onboard'],
      answer: `Getting started is simple:\n\n1️⃣ Book a free discovery call\n2️⃣ Samuel reviews your needs\n3️⃣ You get a custom proposal\n4️⃣ Work begins!\n\n📅 Book here: calendly.com/petersamuellex/government-contract`
    },
    {
      keys: ['us', 'usa', 'uk', 'canada', 'country', 'location', 'timezone', 'where'],
      answer: `Yes! Samuel works with clients in:\n\n🇺🇸 United States\n🇬🇧 United Kingdom\n🇨🇦 Canada\n\nHe's flexible with time zones and responds within 24 hours. You can book a call at your convenience!`
    },
    {
      keys: ['ghl', 'gohighlevel', 'highlevel', 'crm'],
      answer: `Samuel is a GoHighLevel expert with 3+ years of experience! He can help with:\n\n✅ Full GHL account setup\n✅ Pipeline & workflow automation\n✅ Sub-account management\n✅ Email & SMS campaigns\n✅ Calendar & booking setup\n✅ AI conversation bots\n\nBook a free audit: calendly.com/petersamuellex/government-contract`
    },
    {
      keys: ['email', 'newsletter', 'campaign', 'sequence', 'automation'],
      answer: `Samuel builds email systems that work 24/7! Including:\n\n📧 Welcome sequences\n📧 Nurture campaigns\n📧 Re-engagement emails\n📧 Sales sequences\n📧 Newsletter setup\n\nPlatforms: Beehiiv, Mailchimp, Klaviyo, ActiveCampaign, GHL & more!`
    },
    {
      keys: ['review', 'rating', 'testimonial', 'client', 'experience', 'result'],
      answer: `Samuel has a 5.0★ rating on Fiverr with 50+ happy clients!\n\n💬 "His professionalism and attention to detail consistently exceed expectations" — acresIdual 🇺🇸\n\n💬 "He goes above and beyond to make sure I am satisfied" — kenwade33 🇺🇸\n\nSee more results at: petersamuelagada.github.io/portfolio.html`
    },
    {
      keys: ['time', 'long', 'deadline', 'fast', 'quick', 'deliver'],
      answer: `Project timelines depend on scope:\n\n⚡ Landing page: 3–5 days\n⚡ Full GHL setup: 7–14 days\n⚡ Complete automation system: 2–4 weeks\n\nSamuel always gives a clear timeline before starting. Book a call to discuss your project!`
    },
    {
      keys: ['contact', 'reach', 'talk', 'speak', 'call', 'whatsapp', 'email'],
      answer: `You can reach Samuel here:\n\n📅 Book a free call: calendly.com/petersamuellex/government-contract\n📧 Email: petersamuellex@gmail.com\n💬 WhatsApp: +234 810 643 3379\n\nHe responds within 24 hours!`
    },
    {
      keys: ['funnel', 'landing', 'page', 'website', 'web'],
      answer: `Samuel builds high-converting funnels and websites!\n\n✅ Sales funnels\n✅ Landing pages\n✅ Opt-in pages\n✅ Booking pages\n✅ Full websites\n\nAll integrated with your CRM so every lead is captured automatically. Book a free call to discuss!`
    },
    {
      keys: ['hello', 'hi', 'hey', 'good', 'morning', 'afternoon', 'evening'],
      answer: `Hi there! 👋 Great to meet you!\n\nI'm Samuel's AI assistant. I can answer questions about his services, experience, pricing and how he can help your business.\n\nWhat would you like to know?`
    },
  ];

  function getReply(msg) {
    const lower = msg.toLowerCase();
    for (const item of KB) {
      if (item.keys.some(k => lower.includes(k))) {
        return item.answer;
      }
    }
    return `Great question! For the best answer, reach Samuel directly:\n\n📅 Book a free call: calendly.com/petersamuellex/government-contract\n💬 WhatsApp: +234 810 643 3379\n📧 Email: petersamuellex@gmail.com\n\nHe'll be happy to help! 🚀`;
  }

  // Build UI
  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  wrap.innerHTML = `
    <button id="sp-chat-btn" title="Chat with us">
      <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
      <div id="sp-notif">1</div>
    </button>
    <div id="sp-chat-window">
      <div class="sp-header">
        <div class="sp-avatar">🤖</div>
        <div>
          <h4>Samuel's AI Assistant</h4>
          <p><span class="sp-dot"></span>Online — replies instantly</p>
        </div>
        <button class="sp-close" id="sp-close">✕</button>
      </div>
      <div class="sp-messages" id="sp-msgs"></div>
      <div class="sp-quick" id="sp-quick"></div>
      <div class="sp-input-wrap">
        <input id="sp-input" type="text" placeholder="Type your question..."/>
        <button id="sp-send"><svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg></button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  const win = document.getElementById('sp-chat-window');
  const msgs = document.getElementById('sp-msgs');
  const input = document.getElementById('sp-input');
  const quick = document.getElementById('sp-quick');

  const quickList = ['What services do you offer?','How much do you charge?','How do I get started?','Do you work with US/UK clients?','How long does a project take?'];

  function showQuick() {
    quick.innerHTML = '';
    quickList.forEach(q => {
      const b = document.createElement('button');
      b.className = 'sp-qbtn';
      b.textContent = q;
      b.onclick = () => send(q);
      quick.appendChild(b);
    });
  }

  function addMsg(text, who) {
    const d = document.createElement('div');
    d.className = `sp-msg ${who}`;
    d.style.whiteSpace = 'pre-wrap';
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function typing() {
    const t = document.createElement('div');
    t.className = 'sp-typing'; t.id = 'sp-typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
    return t;
  }

  function send(text) {
    if (!text.trim()) return;
    quick.innerHTML = '';
    addMsg(text, 'user');
    input.value = '';
    const t = typing();
    setTimeout(() => {
      t.remove();
      addMsg(getReply(text), 'bot');
      showQuick();
    }, 900);
  }

  function openChat() {
    win.classList.add('open');
    const n = document.getElementById('sp-notif');
    if (n) n.remove();
    if (msgs.children.length === 0) {
      const hour = new Date().getHours();
      const g = hour < 12 ? 'Good morning! 🌅' : hour < 17 ? 'Good afternoon! ☀️' : 'Good evening! 🌙';
      setTimeout(() => {
        addMsg(`${g} I'm Samuel's AI Assistant!\n\nI can answer questions about his services, pricing, and how he can help grow your business. What would you like to know? 👇`, 'bot');
        showQuick();
      }, 400);
    }
  }

  document.getElementById('sp-chat-btn').onclick = openChat;
  document.getElementById('sp-close').onclick = () => win.classList.remove('open');
  document.getElementById('sp-send').onclick = () => send(input.value);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') send(input.value); });

  // Show greeting bubble after 3 seconds
  setTimeout(() => {
    const bubble = document.createElement('div');
    bubble.id = 'sp-greeting';
    bubble.style.cssText = `
      position:fixed; bottom:7rem; right:2rem; z-index:9997;
      background:white; border-radius:16px; border-bottom-right-radius:4px;
      padding:0.9rem 1.2rem; box-shadow:0 8px 32px rgba(0,0,0,0.15);
      border:1px solid #E5E7EB; max-width:240px;
      font-family:Inter,sans-serif; font-size:0.83rem;
      color:#1A1A2E; line-height:1.5; cursor:pointer;
      animation:slideUp 0.4s ease;
    `;
    const hour = new Date().getHours();
    const g = hour < 12 ? 'Good morning! 🌅' : hour < 17 ? 'Good afternoon! ☀️' : 'Good evening! 🌙';
    bubble.innerHTML = `
      <button onclick="this.parentElement.remove()" style="float:right;background:none;border:none;cursor:pointer;font-size:1rem;color:#6B7280;margin-left:8px;">✕</button>
      <strong>${g}</strong><br/>
      👋 I'm Samuel's AI Assistant!<br/>
      Ask me anything about his services — I reply instantly! 💬
      <div style="margin-top:0.6rem;color:#1B4FD8;font-weight:700;font-size:0.78rem;">Click to chat →</div>
    `;
    bubble.onclick = (e) => {
      if (e.target.tagName !== 'BUTTON') { bubble.remove(); openChat(); }
    };
    document.body.appendChild(bubble);
    setTimeout(() => { if (bubble.parentElement) bubble.remove(); }, 10000);
  }, 3000);

  // Auto open after 45s if not opened
  setTimeout(() => { if (!win.classList.contains('open')) openChat(); }, 45000);

})();
