// ============================================================
// FREE CHATBOT WIDGET — Rule-based (no API key needed)
// ============================================================
// Works instantly out of the box. No sign-up, no token, no cost.
// It matches keywords in the student's question and returns a
// relevant answer about Learners Academy.
//
// Want a smarter AI chatbot instead? You can swap the
// `getReply()` function below for a call to Hugging Face, OpenAI,
// or any other API later — the rest of the widget UI stays the same.
// ============================================================

// Edit this list to add/change what the bot knows and says.
const KNOWLEDGE_BASE = [
  {
    keywords: ['course', 'courses', 'subject', 'subjects', 'offer', 'what do you teach', 'learn'],
    reply: "We offer two learning paths: 📚 School Path (Grades 6–12 — Maths, Science, English, Social Studies, Physics) and 💼 Career Path (Python, SQL, Data Analytics, Power BI, Tableau, Excel). Check out the Courses page for full details!"
  },
  {
    keywords: ['live class', 'live classes', 'schedule', 'timing', 'timings', 'when are classes'],
    reply: "Our Live Classes are real-time, instructor-led sessions with limited seats to keep them interactive. Visit the Live Classes page to see the current schedule and book your spot."
  },
  {
    keywords: ['faculty', 'teacher', 'teachers', 'instructor', 'instructors', 'who teaches'],
    reply: "Our Faculty page introduces our experienced teachers and industry professionals. Learners Academy was founded by Shrutika Khandelwal, an educator with 10+ years of experience."
  },
  {
    keywords: ['price', 'pricing', 'cost', 'fee', 'fees', 'how much'],
    reply: "We have free courses to get started, plus paid courses with certificates for deeper learning. Pricing details are listed on each course card in the Courses page."
  },
  {
    keywords: ['certificate', 'certification', 'certified'],
    reply: "Yes! Our paid courses come with a certificate of completion, which you can add to your resume or LinkedIn profile."
  },
  {
    keywords: ['enroll', 'sign up', 'signup', 'register', 'join', 'admission', 'how to start'],
    reply: "Getting started is easy — click 'Book a free demo' or 'Log in' at the top of the page to create your account and enroll in a course."
  },
  {
    keywords: ['grade', 'class 6', 'class 7', 'class 8', 'class 9', 'class 10', 'class 11', 'class 12', 'school'],
    reply: "Our School Path supports students from Grade 6 all the way through board exams (Grade 12), covering Maths, Science, English, Social Studies and Physics."
  },
  {
    keywords: ['professional', 'career', 'job', 'data analyst', 'analytics', 'sql', 'python', 'power bi', 'tableau', 'excel'],
    reply: "Our Career Path helps working professionals build in-demand skills like Python, SQL, Data Analytics, Power BI, Tableau and Excel — perfect for leveling up your career."
  },
  {
    keywords: ['contact', 'support', 'help', 'email', 'phone', 'reach', 'talk to someone'],
    reply: "For anything I can't help with, please reach out through our Contact page and our team will get back to you shortly."
  },
  {
    keywords: ['location', 'where are you', 'based', 'address', 'city'],
    reply: "Learners Academy is based in Jaipur, Rajasthan, and our courses are available online to students and professionals anywhere."
  },
  {
    keywords: ['free', 'demo', 'trial'],
    reply: "We offer free courses and a free demo so you can try before you commit — just click 'Book a free demo' at the top of the page!"
  },
  {
    keywords: ['hi', 'hello', 'hey', 'hii', 'helo'],
    reply: "Hi there! 👋 I'm the Learners Academy Guide. Ask me about our courses, live classes, faculty, pricing, or how to enroll!"
  },
  {
    keywords: ['thank', 'thanks', 'thank you'],
    reply: "You're welcome! 😊 Let me know if you have any other questions about Learners Academy."
  },
  {
    keywords: ['bye', 'goodbye', 'see you'],
    reply: "Goodbye! Feel free to come back anytime you have questions. Happy learning! 🎓"
  }
];

const FALLBACK_REPLIES = [
  "I'm not totally sure about that one — could you rephrase it, or ask about our courses, live classes, faculty, or enrollment?",
  "Good question! For details on that, please check our Courses or Contact page, or try asking me about pricing, enrollment, or live classes.",
];

function getReply(userMessage) {
  const text = userMessage.toLowerCase();

  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some(k => text.includes(k))) {
      return entry.reply;
    }
  }

  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
}

class LearnersAcademyChatbot {
  constructor() {
    this.messages = [];
    this.isOpen = false;
    this.isLoading = false;
    this.init();
  }

  init() {
    this.createWidget();
    this.attachEventListeners();
    this.loadChatHistory();
  }

  createWidget() {
    // Container
    const container = document.createElement('div');
    container.id = 'chatbot-container';
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Poppins', sans-serif;
      z-index: 9999;
    `;

    // Chat window (hidden by default)
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbot-window';
    chatWindow.style.cssText = `
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 360px;
      height: 500px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      display: none;
      flex-direction: column;
      overflow: hidden;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      background: linear-gradient(135deg, #7c3aed, #6d28d9);
      color: white;
      padding: 16px;
      font-weight: 600;
      font-size: 15px;
    `;
    header.textContent = '💡 Learners Academy Guide';
    chatWindow.appendChild(header);

    // Messages area
    const messagesArea = document.createElement('div');
    messagesArea.id = 'chatbot-messages';
    messagesArea.style.cssText = `
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #f9f9fb;
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;
    chatWindow.appendChild(messagesArea);

    // Input area
    const inputArea = document.createElement('div');
    inputArea.style.cssText = `
      padding: 12px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    `;

    const input = document.createElement('input');
    input.id = 'chatbot-input';
    input.type = 'text';
    input.placeholder = 'Ask me anything...';
    input.style.cssText = `
      flex: 1;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    `;
    input.addEventListener('focus', (e) => e.target.style.borderColor = '#7c3aed');
    input.addEventListener('blur', (e) => e.target.style.borderColor = '#d1d5db');
    inputArea.appendChild(input);

    const sendBtn = document.createElement('button');
    sendBtn.id = 'chatbot-send';
    sendBtn.textContent = '→';
    sendBtn.style.cssText = `
      width: 40px;
      height: 40px;
      background: #7c3aed;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 18px;
      transition: background 0.2s;
    `;
    sendBtn.addEventListener('mouseenter', function() { this.style.background = '#6d28d9'; });
    sendBtn.addEventListener('mouseleave', function() { this.style.background = '#7c3aed'; });
    inputArea.appendChild(sendBtn);

    chatWindow.appendChild(inputArea);
    container.appendChild(chatWindow);

    // Toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'chatbot-toggle';
    toggleBtn.style.cssText = `
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #7c3aed, #6d28d9);
      color: white;
      border: none;
      cursor: pointer;
      font-size: 24px;
      box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3);
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    toggleBtn.textContent = '💬';
    toggleBtn.addEventListener('mouseenter', function() { this.style.transform = 'scale(1.1)'; });
    toggleBtn.addEventListener('mouseleave', function() { this.style.transform = 'scale(1)'; });
    container.appendChild(toggleBtn);

    document.body.appendChild(container);
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');

    toggleBtn.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      chatWindow.style.display = this.isOpen ? 'flex' : 'none';
      if (this.isOpen) {
        // Show a greeting the first time the chat is opened
        if (this.messages.length === 0) {
          this.addMessage('assistant', "Hi there! 👋 I'm the Learners Academy Guide. Ask me about our courses, live classes, faculty, pricing, or how to enroll!");
        }
        input.focus();
        this.scrollToBottom();
      }
    });

    const sendMessage = () => {
      const text = input.value.trim();
      if (!text || this.isLoading) return;

      input.value = '';
      this.addMessage('user', text);
      this.isLoading = true;
      sendBtn.disabled = true;

      // Small delay so it feels like the bot is "thinking"
      setTimeout(() => {
        const reply = getReply(text);
        this.addMessage('assistant', reply);
        this.isLoading = false;
        sendBtn.disabled = false;
        input.focus();
      }, 400);
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  addMessage(role, text) {
    this.messages.push({ role, text });
    const messagesArea = document.getElementById('chatbot-messages');

    const messageEl = document.createElement('div');
    messageEl.style.cssText = `
      align-self: ${role === 'user' ? 'flex-end' : 'flex-start'};
      max-width: 85%;
      padding: 10px 12px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.4;
      word-wrap: break-word;
      background: ${role === 'user' ? '#7c3aed' : '#e5e7eb'};
      color: ${role === 'user' ? 'white' : '#1f2937'};
    `;
    messageEl.textContent = text;
    messagesArea.appendChild(messageEl);

    this.scrollToBottom();
    this.saveChatHistory();
  }

  scrollToBottom() {
    const messagesArea = document.getElementById('chatbot-messages');
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  saveChatHistory() {
    localStorage.setItem('la_chatbot_history', JSON.stringify(this.messages.slice(-10)));
  }

  loadChatHistory() {
    const saved = localStorage.getItem('la_chatbot_history');
    if (saved) {
      this.messages = JSON.parse(saved);
      // Redraw messages on page load without re-saving/duplicating
      const messagesArea = document.getElementById('chatbot-messages');
      messagesArea.innerHTML = '';
      const toRedraw = this.messages;
      this.messages = [];
      toRedraw.forEach(msg => this.addMessage(msg.role, msg.text));
    }
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new LearnersAcademyChatbot());
} else {
  new LearnersAcademyChatbot();
}
