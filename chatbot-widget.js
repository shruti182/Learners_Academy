// ============================================================
// LEARNERS ACADEMY CHATBOT — Hugging Face AI + rule-based fallback
// ============================================================
// 1) Get a FREE token: https://huggingface.co/settings/tokens
//    (Sign up -> New token -> "Read" access -> Create -> copy it)
// 2) Paste it below in place of 'YOUR_HUGGINGFACE_API_TOKEN_HERE'
//
// If no token is set, or the API call fails for any reason, the
// widget automatically falls back to the built-in rule-based
// answers below so students never see a broken chatbot.
// ============================================================

// Token is loaded from chatbot-config.js (window.HF_API_TOKEN), which is
// gitignored, so it never gets committed or pushed to GitHub.
const HF_API_TOKEN = window.HF_API_TOKEN || '';
const HF_MODEL = 'HuggingFaceH4/zephyr-7b-beta'; // free, good quality chat model

const SYSTEM_CONTEXT = `You are a friendly student support assistant for Learners Academy, an online learning platform.

Key facts about Learners Academy:
- School Path: Grades 6-12, subjects include Mathematics, Science, English, Social Studies, Physics
- Career Path: Professional courses in Python, SQL, Data Analytics, Power BI, Tableau, Excel
- Live Classes: real-time, instructor-led sessions with limited seats
- Faculty: experienced teachers and industry professionals
- Free courses available; paid courses include certificates
- Founded by Shrutika Khandelwal, an educator with 10+ years of experience
- Located in Jaipur, Rajasthan; courses available online everywhere

Rules for answering:
- Be warm, concise (2-3 sentences max), and specific.
- Point students to relevant pages when useful (Courses, Live Classes, Faculty, Contact).
- If you're unsure of something, say so honestly and suggest they check the Contact page.
- Never make up information not listed above.`;

async function queryHuggingFace(userMessage, recentHistory) {
  if (!HF_API_TOKEN || HF_API_TOKEN === 'PASTE_YOUR_TOKEN_HERE') {
    throw new Error('NO_TOKEN');
  }

  const historyText = recentHistory
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
    .join('\n');

  const prompt = `${SYSTEM_CONTEXT}

Conversation so far:
${historyText}

User: ${userMessage}
Assistant:`;

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${HF_MODEL}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false,
        },
      }),
    }
  );

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody.error || `HF API error (${response.status})`);
  }

  const result = await response.json();
  let text = Array.isArray(result) ? result[0]?.generated_text : result.generated_text;
  if (!text) throw new Error('Empty response from model');

  text = text.trim();
  // Stop at the next "User:" if the model kept generating the conversation
  const cutIndex = text.indexOf('\nUser:');
  if (cutIndex !== -1) text = text.substring(0, cutIndex).trim();

  if (text.length > 400) text = text.substring(0, 400).trim() + '...';

  return text;
}

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
    keywords: ['founder', 'founded', 'who started', 'who created', 'who owns', 'ceo', 'about you', 'about learners academy', 'who runs'],
    reply: "Learners Academy was founded by Shrutika Khandelwal, an educator with 10+ years of experience, to help both school students and working professionals grow their skills on one platform."
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

    const sendMessage = async () => {
      const text = input.value.trim();
      if (!text || this.isLoading) return;

      input.value = '';
      this.addMessage('user', text);
      this.isLoading = true;
      sendBtn.disabled = true;
      sendBtn.textContent = '...';

      try {
        const recentHistory = this.messages.slice(-6, -1); // exclude the message just added
        const reply = await queryHuggingFace(text, recentHistory);
        this.addMessage('assistant', reply);
      } catch (error) {
        // Falls back to the rule-based knowledge base if HF isn't
        // configured yet, or the API call fails for any reason.
        console.warn('Falling back to rule-based reply:', error.message);
        const reply = getReply(text);
        this.addMessage('assistant', reply);
      } finally {
        this.isLoading = false;
        sendBtn.disabled = false;
        sendBtn.textContent = '→';
        input.focus();
      }
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
