// ============================================================
// FREE CHATBOT WIDGET — Google Gemini API
// ============================================================
// Setup: Get free API key from https://aistudio.google.com/apikey
// No credit card required, generous free tier
// ============================================================

const GEMINI_API_KEY = 'YOUR_GOOGLE_API_KEY_HERE'; // ← Replace with your free key
const GEMINI_MODEL = 'gemini-pro';

// Context about Learners Academy for the AI
const SYSTEM_CONTEXT = `You are a friendly student support assistant for Learners Academy, an online learning platform.

Key information about Learners Academy:
- School Path: Grades 6-12 with subjects like Mathematics, Science, English, Social Studies, Physics
- Career Path: Professional courses in Python, SQL, Data Analytics, Power BI, Tableau, Excel
- Live Classes: Real-time instructor-led sessions with limited seats
- Faculty: Experienced teachers and industry professionals
- Free courses available, many paid courses with certificates
- Founded by Shrutika Khandelwal, a teacher with 10+ years experience
- Located in Jaipur, Rajasthan

When answering:
1. Be helpful, friendly, and concise (max 2-3 sentences per response)
2. Direct students to relevant pages (courses.html, live-classes.html, faculty.html, login.html)
3. If you don't know something about our academy, suggest they contact us
4. For technical issues, suggest contacting support
5. Encourage free sign-ups and free courses

Common topics students ask about:
- Course recommendations based on their grade or role
- Course pricing and what's included
- Faculty credentials
- How to enroll and start learning
- Certificate information
- Live class schedules`;

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
      background: linear-gradient(135deg, #4285f4, #1f6feb);
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
    input.addEventListener('focus', (e) => e.target.style.borderColor = '#4285f4');
    input.addEventListener('blur', (e) => e.target.style.borderColor = '#d1d5db');
    inputArea.appendChild(input);

    const sendBtn = document.createElement('button');
    sendBtn.id = 'chatbot-send';
    sendBtn.textContent = '→';
    sendBtn.style.cssText = `
      width: 40px;
      height: 40px;
      background: #4285f4;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 18px;
      transition: background 0.2s;
    `;
    sendBtn.addEventListener('mouseover', function() { this.style.background = '#1f6feb'; });
    sendBtn.addEventListener('mouseout', function() { this.style.background = '#4285f4'; });
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
      background: linear-gradient(135deg, #4285f4, #1f6feb);
      color: white;
      border: none;
      cursor: pointer;
      font-size: 24px;
      box-shadow: 0 4px 16px rgba(66, 133, 244, 0.3);
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
        const reply = await this.queryGemini(text);
        this.addMessage('assistant', reply);
      } catch (error) {
        console.error('Chatbot error:', error);
        this.addMessage('assistant', 
          'Sorry, I\'m having trouble connecting right now. Please try again in a moment, or check out our courses and faculty pages!');
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

  async queryGemini(userMessage) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
      return '⚠️ Chatbot not configured. Get a free API key at https://aistudio.google.com/apikey and add it to chatbot-widget-gemini.js';
    }

    // Build conversation history
    const recentMessages = this.messages.slice(-4).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system: { parts: [{ text: SYSTEM_CONTEXT }] },
            contents: [
              ...recentMessages,
              {
                role: 'user',
                parts: [{ text: userMessage }]
              }
            ],
            generationConfig: {
              maxOutputTokens: 150,
              temperature: 0.7,
              topP: 0.95,
            },
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API error');
      }

      const result = await response.json();
      let text = result.candidates?.[0]?.content?.parts?.[0]?.text || 'I didn\'t catch that.';

      // Truncate if too long
      if (text.length > 300) {
        text = text.substring(0, 300).trim() + '...';
      }

      return text;
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
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
      background: ${role === 'user' ? '#4285f4' : '#e5e7eb'};
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
      const messagesArea = document.getElementById('chatbot-messages');
      messagesArea.innerHTML = '';
      this.messages.forEach(msg => this.addMessage(msg.role, msg.text));
    }
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new LearnersAcademyChatbot());
} else {
  new LearnersAcademyChatbot();
}
