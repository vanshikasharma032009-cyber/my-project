// Chatbot for Bal Vikas Global School
// FAQ array - Add new questions and answers here

// Set this to the deployed Cloudflare Worker URL. Never put the API key here.
const GROQ_PROXY_URL = "YOUR_CLOUDFLARE_WORKER_URL_HERE";
const SCHOOL_PAGES = [
  "index.html",
  "about.html",
  "academics.html",
  "admissions.html",
  "contact.html",
  "facilities.html",
  "gallery.html"
];

const FAQ_LIST = [
  {
    keywords: ["hello", "hi", "namaste", "hey", "namaskar", "start"],
    question: ["greeting"],
    answer: "English: Namaste! Welcome to Bal Vikas Global School, Kaithal, Haryana. How can I help you today?\nहिन्दी: नमस्ते! बाल विकास ग्लोबल स्कूल, कैथल, हरियाणा में आपका स्वागत है। मैं आपकी कैसे मदद कर सकता हूँ?",
    isGreeting: true
  },
  {
    keywords: ["admission", "admit", "apply", "enroll", "registration", "admission kaise", "दाखिला", "प्रवेश"],
    question: ["admission"],
    answer: "English: We welcome applications for the 2026-27 session from Nursery to Class 12. Please see the Admissions page or contact the school for the admission process.\nहिन्दी: हम 2026-27 सत्र के लिए नर्सरी से कक्षा 12 तक आवेदन का स्वागत करते हैं। कृपया Admissions page देखें या स्कूल से संपर्क करें।",
    category: "Admission"
  },
  {
    keywords: ["fee", "fees", "fee structure", "fees kitni", "फीस", "शुल्क"],
    question: ["fees"],
    answer: "English: Please contact the school for the latest fee details.\nहिन्दी: नवीनतम फीस विवरण के लिए कृपया स्कूल से संपर्क करें।",
    category: "Fees"
  },
  {
    keywords: ["timing", "time", "school timing", "school time", "hours", "open", "close", "टाइमिंग", "समय"],
    question: ["timing"],
    answer: "English: The school office hours listed on our website are Monday-Friday, 8:00 AM-4:00 PM and Saturday, 9:00 AM-1:00 PM. Please contact the school to confirm class timings.\nहिन्दी: स्कूल कार्यालय का समय सोमवार-शुक्रवार सुबह 8:00 से शाम 4:00 बजे और शनिवार सुबह 9:00 से दोपहर 1:00 बजे तक है। कृपया कक्षा समय की पुष्टि के लिए स्कूल से संपर्क करें।",
    category: "Timing"
  },
  {
    keywords: ["classes", "class", "nursery", "kg", "lkg", "ukg", "pre-primary", "primary", "कक्षाएं", "कक्षा"],
    question: ["classes"],
    answer: "English: Bal Vikas Global School offers co-educational, English-medium CBSE education through Class 12 (10+2). Please check the Academics page for program details.\nहिन्दी: बाल विकास ग्लोबल स्कूल कक्षा 12 (10+2) तक सह-शिक्षा, अंग्रेजी माध्यम सीबीएसई शिक्षा प्रदान करता है। कार्यक्रम विवरण के लिए Academics page देखें।",
    category: "Classes"
  },
  {
    keywords: ["facility", "facilities", "lab", "library", "sports", "playground", "bus", "transport", "computer", "सुविधाएं", "लैब"],
    question: ["facilities"],
    answer: "English: Our website lists classrooms, science and IT labs, a library, sports, transport, medical support, NCC, and other facilities. Visit the Facilities page for details.\nहिन्दी: हमारी वेबसाइट कक्षाओं, विज्ञान और आईटी लैब, पुस्तकालय, खेल, परिवहन, चिकित्सा सहायता, एनसीसी और अन्य सुविधाओं की सूची देती है। विवरण के लिए Facilities page देखें।",
    category: "Facilities"
  },
  {
    keywords: ["contact", "phone", "mobile", "number", "call", "संपर्क", "फोन"],
    question: ["contact"],
    answer: "English: You can contact the school office at +91-1746-250100 or email info@balvikasglobalschool.com. For other details, please visit the Contact page.\nहिन्दी: आप स्कूल कार्यालय से +91-1746-250100 पर संपर्क कर सकते हैं या info@balvikasglobalschool.com पर ईमेल कर सकते हैं। अन्य विवरण के लिए Contact page देखें।",
    category: "Contact"
  },
  {
    keywords: ["address", "location", "where", "locate", "map", "पता", "स्थान"],
    question: ["address"],
    answer: "English: Bal Vikas Global School, Titram Mod, Kaithal, Haryana 136027. Please visit the Contact page for the map.\nहिन्दी: बाल विकास ग्लोबल स्कूल, तितरम मोड़, कैथल, हरियाणा 136027। मानचित्र के लिए Contact page देखें।",
    category: "Address"
  },
  {
    keywords: ["gallery", "photo", "event", "events", "celebration", "गैलरी", "कार्यक्रम"],
    question: ["gallery"],
    answer: "English: Check out our Gallery page to see photos of school events, celebrations, sports day, annual function, and campus life. You can visit gallery.html to view them.\nहिन्दी: हमारे Gallery page पर स्कूल कार्यक्रम, समारोह, खेल दिवस, वार्षिक समारोह और परिसर जीवन की तस्वीरें देखें। आप gallery.html पर जा सकते हैं।",
    category: "Gallery"
  },
  {
    keywords: ["about", "school", "history", "vision", "mission", "जानकारी"],
    question: ["about"],
    answer: "English: Bal Vikas Global School is a co-educational, English-medium CBSE Senior Secondary school in Kaithal, Haryana. Visit the About page to learn more.\nहिन्दी: बाल विकास ग्लोबल स्कूल कैथल, हरियाणा का एक सह-शिक्षा, अंग्रेजी माध्यम सीबीएसई वरिष्ठ माध्यमिक विद्यालय है। अधिक जानने के लिए About page देखें।",
    category: "About"
  }
];

// Fill placeholders from actual website data
function fillPlaceholders(text) {
  return text
    .replace(/PHONE_NUMBER/g, "+91-1746-250100")
    .replace(/EMAIL/g, "info@balvikasglobalschool.com")
    .replace(/ADDRESS/g, "Titram Mod, Kaithal, Haryana 136027")
    .replace(/TIMINGS/g, "Monday-Friday: 8:00 AM-4:00 PM, Saturday: 9:00 AM-1:00 PM");
}

class Chatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.pagesContext = [];
    this.websiteContextPromise = this.loadWebsiteContext().catch(error => {
      console.error('Chatbot website context error:', error);
      return [];
    });
    this.init();
  }
  
  init() {
    this.createChatbotHTML();
    this.attachEventListeners();
    this.sendGreeting();
  }

  async loadWebsiteContext() {
    const pageResults = await Promise.allSettled(SCHOOL_PAGES.map(async page => {
      const response = await fetch(page, { credentials: 'same-origin' });
      if (!response.ok) {
        throw new Error(`Could not load ${page}: ${response.status}`);
      }

      const html = await response.text();
      const parsedPage = new DOMParser().parseFromString(html, 'text/html');
      const main = parsedPage.querySelector('main');
      if (!main) {
        throw new Error(`No main content found in ${page}`);
      }

      main.querySelectorAll('script, style, form, nav, footer, .chatbot-container, .whatsapp-float').forEach(element => element.remove());
      return {page, text: main.textContent.replace(/\s+/g, ' ').trim().slice(0, 4000)};
    }));

    const pages = pageResults
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);

    pageResults
      .filter(result => result.status === 'rejected')
      .forEach(result => console.error('Chatbot website context error:', result.reason));

    if (pages.length === 0) {
      throw new Error('No school website pages could be loaded for chatbot context');
    }

    this.pagesContext = pages;
    return pages.map(p => `${p.page}: ${p.text}`).join('\n').slice(0, 24000);
  }
  
  createChatbotHTML() {
    const chatbotHTML = `
      <div class="chatbot-container">
        <button class="chatbot-toggle" id="chatbotToggle" aria-label="Open chat">
          <img class="chatbot-toggle-image" src="images/images%20%28123.jpg" alt="">
        </button>
        <div class="chatbot-window" id="chatbotWindow">
          <div class="chatbot-header">
            <div class="chatbot-header-info">
              <img class="chatbot-header-avatar" src="images/bal-vikas-logo.webp" alt="Bal Vikas Global School logo">
              <div class="chatbot-header-text">
                <h4>Bal Vikas Global School - Help</h4>
                <p>Online</p>
              </div>
            </div>
            <button class="chatbot-close" id="chatbotClose" aria-label="Close chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="chatbot-messages" id="chatbotMessages"></div>
          <div class="chatbot-quick-replies" id="chatbotQuickReplies">
            <button class="chatbot-quick-reply" data-reply="Admission">Admission</button>
            <button class="chatbot-quick-reply" data-reply="Fees">Fees</button>
            <button class="chatbot-quick-reply" data-reply="Timing">Timing</button>
            <button class="chatbot-quick-reply" data-reply="Facilities">Facilities</button>
            <button class="chatbot-quick-reply" data-reply="Contact">Contact</button>
          </div>
          <div class="chatbot-typing" id="chatbotTyping">
            <div class="chatbot-typing-dot"></div>
            <div class="chatbot-typing-dot"></div>
            <div class="chatbot-typing-dot"></div>
          </div>
          <div class="chatbot-input-area">
            <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Type your message..." autocomplete="off">
            <button class="chatbot-send" id="chatbotSend" aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }
  
  attachEventListeners() {
    const toggleBtn = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const sendBtn = document.getElementById('chatbotSend');
    const input = document.getElementById('chatbotInput');
    const quickReplies = document.querySelectorAll('.chatbot-quick-reply');
    
    toggleBtn.addEventListener('click', () => {
      this.toggleChat();
    });
    
    closeBtn.addEventListener('click', () => {
      this.closeChat();
    });
    
    sendBtn.addEventListener('click', () => {
      this.sendMessage();
    });
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
    
    quickReplies.forEach(btn => {
      btn.addEventListener('click', () => {
        const reply = btn.getAttribute('data-reply');
        this.handleQuickReply(reply);
      });
    });
  }
  
  toggleChat() {
    const window = document.getElementById('chatbotWindow');
    const toggle = document.getElementById('chatbotToggle');
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      window.classList.add('active');
      toggle.classList.add('active');
      setTimeout(() => {
        document.getElementById('chatbotInput').focus();
      }, 300);
    } else {
      window.classList.remove('active');
      toggle.classList.remove('active');
    }
  }
  
  closeChat() {
    const window = document.getElementById('chatbotWindow');
    const toggle = document.getElementById('chatbotToggle');
    this.isOpen = false;
    window.classList.remove('active');
    toggle.classList.remove('active');
  }
  
  sendGreeting() {
    setTimeout(() => {
      const greeting = FAQ_LIST.find(f => f.isGreeting);
      if (greeting) {
        this.addMessage(greeting.answer, 'bot');
      }
    }, 500);
  }
  
  handleQuickReply(reply) {
    this.addMessage(reply, 'user');
    setTimeout(() => {
      this.processMessage(reply);
    }, 300);
  }
  
  sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    this.addMessage(message, 'user');
    input.value = '';
    
    setTimeout(() => {
      this.processMessage(message);
    }, 300);
  }
  
  addMessage(text, sender) {
    const messagesDiv = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    this.messages.push({
      role: sender === 'user' ? 'user' : 'assistant',
      content: text
    });
    this.scrollToBottom();
  }
  
  showTyping() {
    const typing = document.getElementById('chatbotTyping');
    typing.classList.add('active');
    this.scrollToBottom();
  }
  
  hideTyping() {
    const typing = document.getElementById('chatbotTyping');
    typing.classList.remove('active');
  }
  
  scrollToBottom() {
    const messagesDiv = document.getElementById('chatbotMessages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  
  normalizeText(text) {
    // Keep Hindi and other Unicode letters so Hindi/Hinglish questions can be matched.
    return text.toLocaleLowerCase()
      .replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  searchWebsiteContext(query) {
    if (!this.pagesContext || this.pagesContext.length === 0) {
      return null;
    }

    const normalized = this.normalizeText(query);
    const stopWords = new Set([
      'the', 'and', 'for', 'you', 'your', 'what', 'which', 'where', 'when',
      'how', 'does', 'can', 'are', 'is', 'this', 'that', 'about', 'tell',
      'please', 'school', 'mujhe', 'batao', 'kya', 'kaise', 'hai', 'hain',
      'ke', 'ki', 'ka', 'ko', 'me', 'mein', 'par', 'aur', 'ek', 'ye',
      'yeh', 'mera', 'meri', 'mere', 'website'
    ]);
    const keywords = normalized.split(/\s+/).filter(k =>
      k.length > 2 && !stopWords.has(k)
    );
    if (keywords.length === 0) return null;

    const matches = [];
    for (const {page, text} of this.pagesContext) {
      const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 20);
      for (const s of sentences) {
        const sNorm = this.normalizeText(s);
        const score = keywords.filter(kw => sNorm.includes(kw)).length;
        if (score > 0) matches.push({page, sentence: s.trim(), score});
      }
    }

    if (matches.length === 0) return null;
    matches.sort((a, b) => b.score - a.score);
    const threshold = Math.max(1, Math.ceil(keywords.length * 0.34));
    const top = matches.filter(m => m.score >= threshold).slice(0, 4);
    if (top.length === 0) return null;
    const pages = [...new Set(top.map(m => m.page))];
    return {answer: top.map(m => m.sentence).join(' '), pages};
  }

  findAnswer(userMessage) {
    const normalized = this.normalizeText(userMessage);

    // Prefer relevant facts from the actual school pages over broad FAQ keywords.
    const webMatch = this.searchWebsiteContext(userMessage);
    if (webMatch) {
      const pageNames = webMatch.pages.map(p => p.replace('.html', ''));
      const source = pageNames.length
        ? ` (Source: ${pageNames.join(', ')} page)`
        : '';
      return webMatch.answer + "\\nयह जानकारी स्कूल की वेबसाइट से ली गई है।" + source;
    }

    for (const faq of FAQ_LIST) {
      if (faq.isGreeting) continue;
      for (const keyword of faq.keywords) {
        const normalizedKeyword = this.normalizeText(keyword);
        if (normalizedKeyword && normalized.includes(normalizedKeyword)) {
          return faq.answer;
        }
      }
    }

    return "माफ़ कीजिए, इस सवाल की पक्की जानकारी वेबसाइट पर नहीं मिली। कृपया Contact page देखें या स्कूल कार्यालय पर +91-1746-250100 पर संपर्क करें।";
  }

  async processMessage(message) {
    this.showTyping();

    try {
      // Do not let slow page fetches prevent the chatbot from replying.
      // FAQ answers are available immediately; page context is used if it loads quickly.
      await Promise.race([
        this.websiteContextPromise,
        new Promise(resolve => setTimeout(resolve, 1200))
      ]);

      if (GROQ_PROXY_URL && GROQ_PROXY_URL !== "YOUR_CLOUDFLARE_WORKER_URL_HERE") {
        await this.callGroqAPI(message);
        return;
      }

      const answer = this.findAnswer(message);
      this.addMessage(fillPlaceholders(answer), 'bot');
    } catch (error) {
      console.error('Chatbot response error:', error);
      const answer = this.findAnswer(message);
      this.addMessage(fillPlaceholders(answer), 'bot');
    } finally {
      this.hideTyping();
    }
  }

  async callGroqAPI(message) {
    try {
      const response = await fetch(GROQ_PROXY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          history: this.messages.slice(0, -1).slice(-8),
          websiteContext: String(await this.websiteContextPromise || '').slice(0, 24000)
        })
      });

      if (!response.ok) {
        throw new Error(`Chatbot service returned ${response.status}`);
      }
      
      const data = await response.json();
      if (data.reply) {
        this.addMessage(data.reply, 'bot');
      } else {
        throw new Error(data.error || 'Chatbot service returned no reply');
      }
    } catch (error) {
      console.error('Chatbot API error; using the website's local information instead:', error);
      // Keep the chatbot useful even when the optional AI proxy is not deployed or is offline.
      this.addMessage(fillPlaceholders(this.findAnswer(message)), 'bot');
    } finally {
      this.hideTyping();
    }
  }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
  });
} else {
  new Chatbot();
}
