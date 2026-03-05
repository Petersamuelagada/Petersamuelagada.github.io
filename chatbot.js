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

  // ===================== KNOWLEDGE BASE =====================
  const KB = [

    // GREETINGS
    {
      keys: ['hello', 'hi', 'hey', 'howdy', 'sup', 'good morning', 'good afternoon', 'good evening', 'greetings', 'what\'s up', 'whats up'],
      answer: `Hi there! 👋 Welcome!\n\nI'm Samuel's AI Assistant. I'm here to answer any questions about his services, pricing, experience, and how he can help grow your business.\n\nWhat would you like to know? 😊`
    },

    // WHO IS SAMUEL
    {
      keys: ['who is samuel', 'who are you', 'about samuel', 'tell me about', 'background', 'bio', 'samuel peter'],
      answer: `Samuel Peter is a GoHighLevel Expert & Email Marketing Specialist with 3+ years of experience helping businesses in the US, UK, and Canada.\n\n🏆 50+ clients served\n⭐ 5.0 rating on Fiverr\n🇺🇸 Specialises in US, UK & Canada markets\n\nHe helps businesses automate their marketing, build high-converting landing pages, and set up complete CRM systems so they can grow without doing everything manually.\n\nSee his full story: petersamuelagada.github.io/about.html`
    },

    // SERVICES
    {
      keys: ['service', 'offer', 'what do you do', 'help with', 'speciali'],
      answer: `Here's everything Samuel offers:\n\n⚡ GoHighLevel Setup & Automation\n📧 Email Marketing & Sequences\n🔗 CRM Setup & Automation\n🚀 Sales Funnels & Landing Pages\n🤖 AI Chatbot Integration\n🌐 Web Design (GHL & Custom)\n🔌 Zapier & Pabbly Automation\n📱 SMS Marketing\n📊 Pipeline & Workflow Setup\n📅 Calendar & Booking Systems\n\nNeed something specific? Just ask!`
    },

    // GOHIGHLEVEL
    {
      keys: ['ghl', 'gohighlevel', 'go high level', 'highlevel', 'high level'],
      answer: `Samuel is a GoHighLevel expert! He can build and manage:\n\n✅ Full GHL account setup from scratch\n✅ CRM pipeline & deal stages\n✅ Automated workflows & triggers\n✅ Email & SMS campaigns\n✅ Booking calendar & appointment system\n✅ Sub-account setup & management\n✅ AI conversation bots\n✅ Landing pages & funnels inside GHL\n✅ Reporting & analytics dashboard\n\n📅 Book a free GHL audit: calendly.com/petersamuellex/government-contract`
    },

    // CRM
    {
      keys: ['crm', 'pipeline', 'leads', 'lead management', 'contact management'],
      answer: `Samuel builds complete CRM systems that manage your leads automatically!\n\n🔧 What he sets up:\n• 5-stage sales pipeline\n• Automatic lead capture from all sources\n• Instant response to new leads (60 seconds!)\n• Follow-up sequences that run 24/7\n• Lead scoring & tagging\n• Deal tracking & reporting\n\nResult: No more leads falling through the cracks! 💪`
    },

    // EMAIL MARKETING
    {
      keys: ['email', 'newsletter', 'campaign', 'sequence', 'drip', 'broadcast', 'open rate', 'click rate', 'mailchimp', 'klaviyo', 'activecampaign', 'beehiiv'],
      answer: `Samuel builds email systems that get results!\n\n📧 Services include:\n• Welcome & onboarding sequences\n• Nurture campaigns\n• Sales email sequences\n• Re-engagement campaigns\n• Weekly newsletters\n• Abandoned cart emails\n\n📊 Platforms: GoHighLevel, Mailchimp, Klaviyo, ActiveCampaign, Beehiiv\n\n⭐ Results: One client's open rate went from 18% → 47% after Samuel rebuilt their sequence!`
    },

    // AUTOMATION
    {
      keys: ['automat', 'workflow', 'zapier', 'pabbly', 'integrat', 'connect', 'trigger', 'webhook'],
      answer: `Samuel is an automation expert! He can connect and automate almost any tool:\n\n🔌 Platforms he works with:\n• GoHighLevel workflows\n• Zapier (1000s of app connections)\n• Pabbly Connect\n• Make (formerly Integromat)\n• Webhooks & API integrations\n\n💡 Example: He built a Voice AI system that automatically calls new leads and syncs data to CRM — completely hands-free!`
    },

    // AI CHATBOT
    {
      keys: ['chatbot', 'ai bot', 'chat bot', 'ai agent', 'voice agent', 'voice ai', 'bot', 'ai assistant', 'conversational'],
      answer: `Samuel builds AI chatbots and voice agents for businesses! 🤖\n\n✅ Custom AI trained on YOUR business\n✅ Answers customer questions 24/7\n✅ Qualifies leads automatically\n✅ Books appointments hands-free\n✅ Voice AI that calls leads automatically\n✅ Integrates with your CRM\n\nHe built a Voice AI system for a client that automatically calls every new lead — zero manual work! 🔥`
    },

    // LANDING PAGES & FUNNELS
    {
      keys: ['landing page', 'funnel', 'sales page', 'opt-in', 'optin', 'squeeze page', 'website', 'web design', 'page design'],
      answer: `Samuel builds high-converting landing pages and sales funnels!\n\n🚀 Types he builds:\n• Lead capture pages\n• Sales pages\n• VSL (Video Sales Letter) pages\n• Application funnels\n• Webinar registration pages\n• Product launch funnels\n• Full business websites\n\n📍 Built inside GoHighLevel, WordPress, or custom HTML/CSS\n\nView his portfolio: petersamuelagada.github.io/portfolio.html`
    },

    // PRICING
    {
      keys: ['price', 'cost', 'how much', 'charge', 'rate', 'fee', 'budget', 'afford', 'expensive', 'cheap', 'quote', 'pay', 'payment'],
      answer: `Samuel uses custom pricing — no fixed packages because every project is different!\n\n💡 Typical ranges (approximate):\n• Landing page: starts from $150\n• Full GHL setup: starts from $300\n• Email sequence: starts from $100\n• Full automation system: starts from $500\n\nThe best way to get an exact quote is a FREE 30-min discovery call:\n👉 calendly.com/petersamuellex/government-contract\n\nNo pressure, no obligation!`
    },

    // HOW TO GET STARTED
    {
      keys: ['get started', 'how to start', 'how do i', 'begin', 'hire', 'work with', 'onboard', 'process', 'steps'],
      answer: `Getting started with Samuel is easy:\n\n1️⃣ Book a FREE 30-min strategy call\n2️⃣ Tell him about your business & goals\n3️⃣ He'll audit what you have & what you need\n4️⃣ You receive a custom proposal & timeline\n5️⃣ Work begins — usually within 24-48 hours!\n\n📅 Book here: calendly.com/petersamuellex/government-contract`
    },

    // TIMELINE / HOW LONG
    {
      keys: ['how long', 'timeline', 'deadline', 'fast', 'quick', 'turnaround', 'delivery', 'when', 'days', 'weeks'],
      answer: `Project timelines depending on scope:\n\n⚡ Simple landing page: 3–5 days\n⚡ Email sequence (5-7 emails): 3–5 days\n⚡ Full GHL setup: 7–14 days\n⚡ Complete automation system: 2–4 weeks\n⚡ Full website with automation: 10–14 days\n\nSamuel always gives a clear timeline upfront before starting. Rush delivery available for urgent projects!`
    },

    // LOCATION / TIMEZONE
    {
      keys: ['location', 'country', 'timezone', 'us', 'usa', 'uk', 'canada', 'nigeria', 'remote', 'online', 'where are you'],
      answer: `Samuel works 100% remotely and serves clients globally!\n\n🇺🇸 United States — primary market\n🇬🇧 United Kingdom\n🇨🇦 Canada\n🌍 Other countries — also welcome!\n\nHe's flexible with time zones and communicates via:\n💬 WhatsApp\n📧 Email\n📹 Zoom/Google Meet\n\nHe typically responds within 24 hours.`
    },

    // EXPERIENCE & SKILLS
    {
      keys: ['experience', 'skill', 'expert', 'years', 'qualified', 'certified', 'trained', 'knowledge'],
      answer: `Samuel has 3+ years of experience in digital marketing automation!\n\n🛠️ His core skills:\n• GoHighLevel (advanced level)\n• Email marketing & automation\n• CRM setup & management\n• Funnel & landing page design\n• AI chatbot development\n• Zapier & Pabbly automation\n• HTML/CSS web development\n• Copywriting for conversions\n\n🏆 50+ clients | ⭐ 5.0 rating | 🌍 US, UK & Canada`
    },

    // REVIEWS & TESTIMONIALS
    {
      keys: ['review', 'testimonial', 'rating', 'feedback', 'fiverr', 'happy client', 'satisfied', 'recommend', 'trust'],
      answer: `Samuel has a perfect 5.0★ rating with 50+ happy clients!\n\n💬 "His professionalism and attention to detail consistently exceed expectations. Our GHL system now runs on autopilot." — acresIdual 🇺🇸\n\n💬 "He goes above and beyond to make sure I am satisfied. Best investment I've made." — kenwade33 🇺🇸\n\n💬 "Outstanding work on our email sequences. Open rates jumped from 18% to 47%." — markdigital 🇬🇧\n\nSee all reviews: petersamuelagada.github.io`
    },

    // PORTFOLIO
    {
      keys: ['portfolio', 'work', 'project', 'example', 'sample', 'show me', 'previous', 'past work', 'case study'],
      answer: `Samuel has an impressive portfolio of real projects!\n\n🎯 Recent work includes:\n• 🤖 Voice AI agent for automatic lead calling\n• 🌿 Herbal health product landing page\n• 🏥 Health & wellness clinic full website\n• 🏠 Real estate agent platform in GHL\n• 📧 Email sequence rebuild (18% → 47% open rate)\n• ⚡ Full GHL buildout for coaching business\n\n👀 View full portfolio with case studies:\npeterssamuelagada.github.io/portfolio.html`
    },

    // CONTACT
    {
      keys: ['contact', 'reach', 'talk', 'speak', 'message', 'whatsapp', 'phone', 'number', 'email address'],
      answer: `Here's how to reach Samuel directly:\n\n📅 Book a free call: calendly.com/petersamuellex/government-contract\n📧 Email: petersamuellex@gmail.com\n💬 WhatsApp: +234 810 643 3379\n\nHe responds within 24 hours — usually much faster! 🚀`
    },

    // FIVERR
    {
      keys: ['fiverr', 'upwork', 'freelance', 'platform', 'marketplace'],
      answer: `Samuel is available on Fiverr with a 5.0★ rating and 50+ completed projects!\n\nHowever, for the best rates and direct communication, it's recommended to work with him directly:\n\n📅 Book a free call: calendly.com/petersamuellex/government-contract\n📧 Email: petersamuellex@gmail.com\n\nWorking directly means faster response, lower cost, and a more personalised experience!`
    },

    // REVISIONS / GUARANTEE
    {
      keys: ['revision', 'revision', 'guarantee', 'refund', 'satisfaction', 'change', 'update', 'fix', 'edit'],
      answer: `Samuel is committed to your satisfaction! 💪\n\n✅ Revisions included in every project\n✅ Work doesn't stop until you're happy\n✅ Clear scope agreed before work begins\n✅ Regular updates throughout the project\n✅ Post-delivery support available\n\nHis 5.0★ rating across 50+ clients speaks for itself — he doesn't stop until you're 100% satisfied!`
    },

    // TOOLS & PLATFORMS
    {
      keys: ['tool', 'platform', 'software', 'app', 'technology', 'tech stack', 'which platform', 'what platform'],
      answer: `Samuel works with a wide range of tools and platforms:\n\n📊 CRM & Marketing:\nGoHighLevel, Mailchimp, Klaviyo, ActiveCampaign, HubSpot\n\n🔌 Automation:\nZapier, Pabbly Connect, Make\n\n🌐 Web & Design:\nWordPress, HTML/CSS, Webflow\n\n📧 Email:\nBeehiiv, ConvertKit, Mailerlite\n\n💳 Payments:\nStripe, PayPal\n\nNot seeing your tool? Just ask — he probably works with it!`
    },

    // SMS MARKETING
    {
      keys: ['sms', 'text message', 'text marketing', 'bulk sms', 'twilio'],
      answer: `Samuel sets up complete SMS marketing systems!\n\n📱 Includes:\n• Automated SMS follow-up sequences\n• Appointment reminders via SMS\n• Two-way SMS conversations in GHL\n• Bulk SMS broadcast campaigns\n• SMS lead nurturing\n\nSMS gets 98% open rates vs 20% for email — it's one of the most powerful channels for follow-up! 🔥`
    },

    // REAL ESTATE
    {
      keys: ['real estate', 'realtor', 'property', 'agent', 'zillow', 'housing', 'homes', 'realty'],
      answer: `Samuel has specific experience building systems for real estate professionals!\n\n🏠 Real estate solutions he builds:\n• Agent lead generation websites\n• Property listing pages\n• CRM with lead routing\n• Automated follow-up for new leads\n• Appointment booking systems\n• Integration with Zillow, Realtor.com\n\nHe built a complete real estate platform in GHL for a US client. See it in his portfolio!`
    },

    // HEALTH & WELLNESS
    {
      keys: ['health', 'wellness', 'clinic', 'medical', 'therapy', 'coaching', 'fitness', 'gym', 'nutrition'],
      answer: `Samuel has built websites and automation systems for health & wellness businesses!\n\n🏥 He's worked with:\n• Health clinics\n• Wellness coaches\n• Fitness trainers\n• Nutritionists\n• Herbal/supplement brands\n\nBuilt complete websites with service showcases, team profiles, booking systems, and automated patient follow-up — all inside GoHighLevel!`
    },

    // COACHING & CONSULTING
    {
      keys: ['coach', 'consult', 'mentor', 'trainer', 'consultant', 'course', 'program'],
      answer: `Samuel specialises in building systems for coaches and consultants!\n\n🎯 What he builds for coaches:\n• High-ticket sales funnels\n• Application & discovery call funnels\n• Course launch funnels\n• Membership site integrations\n• Automated lead nurturing\n• Calendar booking system\n• Payment processing (Stripe)\n\nMany coaches waste hours on manual follow-up — Samuel automates ALL of it!`
    },

    // ECOMMERCE
    {
      keys: ['ecommerce', 'e-commerce', 'shopify', 'store', 'product', 'shop', 'woocommerce', 'sell online'],
      answer: `Samuel builds automation systems for e-commerce businesses!\n\n🛒 E-commerce solutions:\n• Abandoned cart email/SMS sequences\n• Post-purchase follow-up\n• Customer win-back campaigns\n• Shopify + GHL/Zapier integration\n• Review request automation\n• Upsell & cross-sell sequences\n\nOne client saw a 160% increase in click rates after Samuel rebuilt their email system!`
    },

    // AGENCY SERVICES
    {
      keys: ['agency', 'white label', 'resell', 'partner', 'subaccount', 'saas'],
      answer: `Samuel also works with agencies and offers white-label services!\n\n🏢 Agency services:\n• GHL sub-account setup for your clients\n• White-label automation setup\n• Done-for-you client onboarding\n• Agency snapshot creation\n• Bulk workflow setup\n\nBuilding out multiple client accounts? Book a call to discuss volume pricing!`
    },

    // BOOKING / CALENDAR
    {
      keys: ['book', 'booking', 'calendar', 'appointment', 'schedule', 'calendly', 'zoom', 'meeting'],
      answer: `Samuel sets up complete booking and appointment systems!\n\n📅 Booking system features:\n• GHL calendar integration\n• Zoom/Google Meet auto-connect\n• Automatic confirmation emails\n• 24-hour & 1-hour reminders\n• No-show follow-up automation\n• Rescheduling management\n\n👉 Book a free call with Samuel now:\ncalendly.com/petersamuellex/government-contract`
    },

    // RESULTS / ROI
    {
      keys: ['result', 'roi', 'return', 'worth it', 'value', 'benefit', 'outcome', 'achieve', 'success'],
      answer: `Samuel's work delivers measurable results! 📈\n\n🎯 Real results from his projects:\n• 📧 Email open rate: 18% → 47% (+160%)\n• ⚡ Lead response time: 24hrs → 5 minutes\n• 📈 Follow-up rate: +300% increase\n• 🤖 Voice AI calling leads 24/7 automatically\n• 🚀 Funnel conversion rate improved by 85%\n\nEvery project comes with clear goals and measurable outcomes!`
    },

    // MAINTENANCE & SUPPORT
    {
      keys: ['support', 'maintain', 'after', 'ongoing', 'help after', 'post delivery', 'bug', 'issue', 'problem'],
      answer: `Samuel provides post-delivery support for all his projects!\n\n🛠️ Support includes:\n• Bug fixes after delivery\n• Answering how-to questions\n• Minor tweaks and updates\n• Ongoing maintenance packages available\n• Monthly retainer options\n\nHe doesn't disappear after delivery — he makes sure everything works perfectly! 💪`
    },

    // COMMUNICATION
    {
      keys: ['communicate', 'update', 'progress', 'report', 'responsive', 'reply', 'response time'],
      answer: `Samuel is known for excellent communication! 💬\n\n📊 His communication style:\n• Responds within 24 hours (usually faster)\n• Regular progress updates throughout projects\n• Clear milestone reporting\n• Available via WhatsApp, email & video call\n• Proactive about sharing updates\n\nHis clients consistently praise his communication in reviews! ⭐`
    },

    // BLOG / CONTENT
    {
      keys: ['blog', 'article', 'content', 'read', 'learn', 'tip', 'advice', 'guide'],
      answer: `Samuel shares free expert knowledge on his blog!\n\n📚 Recent articles:\n• "5 GoHighLevel Mistakes That Are Costing You Leads"\n• "Why Your Email Sequences Aren't Converting"\n• "The Ultimate CRM Automation Guide"\n\nRead free tips here:\npeterssamuelagada.github.io/blog.html`
    },

    // FREE CONSULTATION
    {
      keys: ['free', 'free call', 'free consult', 'free audit', 'no cost', 'discovery'],
      answer: `Yes! Samuel offers a FREE 30-minute strategy call! 🎁\n\nOn this call he will:\n✅ Review your current setup\n✅ Identify gaps and opportunities\n✅ Show you exactly what needs fixing\n✅ Give you a clear action plan\n✅ Answer all your questions\n\nNo pressure, no sales pitch — just real advice!\n\n👉 Book now: calendly.com/petersamuellex/government-contract`
    },

    // THANKS / APPRECIATION
    {
      keys: ['thank', 'thanks', 'appreciate', 'helpful', 'great', 'awesome', 'perfect', 'amazing'],
      answer: `You're very welcome! 😊\n\nIf you have any more questions, feel free to ask!\n\nWhen you're ready to move forward, Samuel is just one click away:\n📅 calendly.com/petersamuellex/government-contract\n\nHave a great day! 🚀`
    },

    // GOODBYE
    {
      keys: ['bye', 'goodbye', 'see you', 'later', 'take care', 'ciao', 'farewell'],
      answer: `Goodbye! 👋 It was great chatting with you!\n\nWhen you're ready to grow your business with automation, Samuel is here to help:\n📅 calendly.com/petersamuellex/government-contract\n\nHave an amazing day! 🌟`
    },

  ];

  // Critical questions to redirect (medical, legal, financial, personal)
  const CRITICAL = [
    'diagnos', 'symptom', 'disease', 'sick', 'medicine', 'drug', 'dose',
    'legal', 'lawsuit', 'court', 'lawyer', 'attorney', 'sue',
    'invest', 'stock', 'crypto', 'bitcoin', 'forex', 'trade',
    'personal loan', 'borrow money', 'debt',
    'emergency', 'suicide', 'hurt', 'danger',
    'hack', 'illegal', 'fraud', 'scam'
  ];

  function getReply(msg) {
    const lower = msg.toLowerCase();

    // Check for critical/out-of-scope questions first
    if (CRITICAL.some(k => lower.includes(k))) {
      return `I'm only able to answer questions about Samuel's digital marketing services. For this type of question, please consult the appropriate professional.\n\nFor Samuel's services, I'm happy to help! What would you like to know? 😊`;
    }

    // Search knowledge base
    for (const item of KB) {
      if (item.keys.some(k => lower.includes(k))) {
        return item.answer;
      }
    }

    // Smart fallback based on question words
    if (lower.includes('?') || lower.includes('how') || lower.includes('what') || lower.includes('can') || lower.includes('do')) {
      return `Great question! That's something Samuel can best answer directly.\n\n📅 Book a FREE 30-min call: calendly.com/petersamuellex/government-contract\n💬 WhatsApp: +234 810 643 3379\n📧 Email: petersamuellex@gmail.com\n\nOr ask me something else — I know a lot about his services! 😊`;
    }

    return `I'm not sure I understood that, but I'm here to help! 😊\n\nYou can ask me about:\n• Samuel's services & pricing\n• How long projects take\n• How to get started\n• His experience & results\n• Tools & platforms he works with\n\nWhat would you like to know?`;
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
        <input id="sp-input" type="text" placeholder="Ask me anything..."/>
        <button id="sp-send"><svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg></button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  const win = document.getElementById('sp-chat-window');
  const msgs = document.getElementById('sp-msgs');
  const input = document.getElementById('sp-input');
  const quick = document.getElementById('sp-quick');

  const quickList = [
    'What services do you offer?',
    'How much do you charge?',
    'How do I get started?',
    'Show me your portfolio',
    'How long does a project take?'
  ];

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
        addMsg(`${g} I'm Samuel's AI Assistant!\n\nI can answer questions about his services, pricing, experience, tools, results and more.\n\nWhat would you like to know? 👇`, 'bot');
        showQuick();
      }, 400);
    }
  }

  document.getElementById('sp-chat-btn').onclick = openChat;
  document.getElementById('sp-close').onclick = () => win.classList.remove('open');
  document.getElementById('sp-send').onclick = () => send(input.value);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') send(input.value); });

  // Greeting bubble after 3 seconds
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

  // Auto open after 45s
  setTimeout(() => { if (!win.classList.contains('open')) openChat(); }, 45000);

})();
