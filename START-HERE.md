# 🤖 FREE AI Chatbot for Learners Academy — START HERE

## What You're Getting

A **completely free** AI chatbot widget for your website that answers student questions about:
- 📚 Courses (which ones are free, pricing, what's included)
- 👨‍🏫 Faculty (who teaches what, their credentials)
- 🎬 Live Classes (schedule, prices, how to join)
- 🎓 Enrollment (how to sign up, requirements)
- 💡 General guidance (study tips, course recommendations)

**Cost:** 💰 COMPLETELY FREE
**Setup Time:** ⏱️ 5 minutes
**Technical Skill Needed:** 🔧 Minimal (just copy-paste)

---

## Quick Start (Choose ONE path)

### 🟢 Fastest Path (Recommended for first-time users)

1. **Get Free API Key** (2 minutes)
   - Go to: https://huggingface.co/settings/tokens
   - Click "New token" → Copy it

2. **Update Chatbot Script** (1 minute)
   - Open: `chatbot-widget.js`
   - Find line 8: `const HF_API_TOKEN = 'YOUR_HUGGINGFACE_API_TOKEN_HERE';`
   - Replace with: `const HF_API_TOKEN = 'hf_YOUR_COPIED_TOKEN';`

3. **Add to Your Website** (2 minutes)
   - Add this line before `</body>` in EVERY HTML file:
   ```html
   <script src="chatbot-widget.js"></script>
   ```

4. **Test It** (1 minute)
   - Open your website
   - Click 💬 button in bottom-right corner
   - Ask: "What free courses do you offer?"
   - Done! ✅

### 🔵 Better Quality Path (Google Gemini)

**Same steps as above, but:**
- Get key from: https://aistudio.google.com/apikey
- Use script: `chatbot-widget-gemini.js` instead
- More generous free quota

### 🟣 Self-Hosted Path (Best Privacy & Scale)

**For schools with technical teams:**
- Run Ollama locally for unlimited requests
- See: CHATBOT-SETUP.md → Option 3

---

## 📁 Files Included

### Main Files (You'll use these)
- **`chatbot-widget.js`** ← Primary chatbot (Hugging Face)
  - Copy this to your website folder
  - Add API token on line 8
  - Include in your HTML files

- **`chatbot-widget-gemini.js`** ← Alternative (Google Gemini)
  - Better quality responses
  - More generous quota
  - Use if you prefer Google

### Example & Documentation
- **`index-with-chatbot.html`** ← Example showing how to integrate
  - See how it's added to HTML
  - Use as reference

### Guides (Read these to understand)
- **`INTEGRATION-GUIDE.md`** ← **START HERE** for step-by-step
- **`README-FREE-CHATBOT.md`** ← Full overview & features
- **`CHATBOT-SETUP.md`** ← Detailed setup with troubleshooting
- **`COMPARE-FREE-OPTIONS.md`** ← API comparison (HF vs Gemini vs Ollama)

---

## 🎯 Your Next 30 Minutes

### Timeline

| Time | Task |
|------|------|
| 0-2 min | Read INTEGRATION-GUIDE.md |
| 2-5 min | Get FREE API key (Hugging Face) |
| 5-7 min | Update chatbot script with token |
| 7-12 min | Add script tag to HTML files |
| 12-15 min | Test on your website |
| 15-30 min | Customize chatbot (optional) |

---

## ⚡ Super Quick Checklist

```
☐ Read INTEGRATION-GUIDE.md (5 min)
☐ Get Hugging Face token (2 min)
   → https://huggingface.co/settings/tokens
☐ Open chatbot-widget.js
☐ Replace YOUR_HUGGINGFACE_API_TOKEN_HERE with actual token
☐ Add <script src="chatbot-widget.js"></script> to index.html
☐ Add to courses.html, login.html, etc.
☐ Reload website
☐ Click 💬 button
☐ Test by asking a question
☐ Done! 🎉
```

---

## 📚 Reading Guide

### Start With These (In Order)
1. **This file** (you're reading it!) ← START
2. **INTEGRATION-GUIDE.md** ← 5-minute implementation
3. **Try the chatbot** ← Test it

### Then, Optional Deep Dives
4. **README-FREE-CHATBOT.md** ← Full feature overview
5. **COMPARE-FREE-OPTIONS.md** ← Which LLM service to use
6. **CHATBOT-SETUP.md** ← Detailed troubleshooting

---

## 🔑 Getting Your Free API Key

### Option A: Hugging Face (Easier, Recommended)

```
1. Go to: https://huggingface.co/settings/tokens
2. Login with your email (or create account - FREE)
3. Click "New token"
4. Name: "Learners Academy Chatbot"
5. Role: "Read"
6. Click "Generate"
7. Copy the token (looks like: hf_xxxxxxxxxxxx)
8. Paste in chatbot-widget.js line 8
```

### Option B: Google Gemini (Better quality)

```
1. Go to: https://aistudio.google.com/apikey
2. Login with your Google account
3. Click "Create API key"
4. Copy the key
5. Use chatbot-widget-gemini.js instead
6. Paste in that file line 8
```

---

## 🛠️ Installation (3 Steps)

### Step 1: Place Files
```
your-website-folder/
├── index.html
├── courses.html
├── ... your other files ...
├── chatbot-widget.js          ← Place here
└── chatbot-widget-gemini.js   ← Or this one
```

### Step 2: Add API Token
```javascript
// In chatbot-widget.js, line 8:
const HF_API_TOKEN = 'hf_PASTE_YOUR_TOKEN_HERE';
```

### Step 3: Add to HTML
```html
<!-- Before </body> in your HTML files: -->
<script src="chatbot-widget.js"></script>
</body>
```

---

## ✅ How to Know It's Working

- [ ] See 💬 button in bottom-right corner
- [ ] Click button → chat window opens
- [ ] Type a question → see "..." while loading
- [ ] Get a response within 1-2 seconds
- [ ] Can send multiple questions
- [ ] Chat history shows on reload

---

## ❓ Common Questions

**Q: Is it really free?**
A: YES! No credit card needed ever.

**Q: What if I hit the free limit?**
A: Free tier allows 30-60 requests/minute. Students can use it anytime.

**Q: Can I customize what it says?**
A: YES! Edit `SYSTEM_CONTEXT` in the JS file with your course info.

**Q: Will it work on mobile?**
A: YES! Fully responsive design.

**Q: Can I use it on multiple pages?**
A: YES! Add the script tag to every HTML file.

**Q: What if I want better responses?**
A: Upgrade to Google Gemini (same setup, better AI).

**Q: Can I run it locally (no internet)?**
A: YES! Use Ollama instead (see CHATBOT-SETUP.md).

---

## 🚀 What Happens Next

### For Students:
1. They visit your website
2. See 💬 button (no extra click needed)
3. Ask: "What courses are available?"
4. Chatbot responds instantly: "We offer school courses (Grades 6-12) and career tracks in Python, SQL, Power BI, etc. Visit courses.html to browse!"
5. They can ask follow-ups: "How much does Python cost?" etc.
6. Conversation saved in their browser

### For You:
1. Students get instant answers 24/7
2. No new server needed
3. See what students ask (for improvements)
4. Chatbot redirects to relevant pages
5. Reduces support emails

---

## 💰 Cost Breakdown

| Time Period | Using HF | Using Gemini | Using Ollama |
|------------|----------|-------------|------------|
| Month 1 | FREE | FREE | FREE |
| Month 2-3 | FREE | FREE | FREE |
| Month 6 | FREE | FREE | $30 (server) |
| Year 1 | ~$50 (pro upgrade) | $0 | $60 (server) |

**All three: MUCH cheaper than hiring support staff!**

---

## 🎓 Customization Ideas

After setup, improve the chatbot by adding:
- Specific course names & prices
- Faculty bios
- Live class schedules
- Enrollment process steps
- FAQ answers
- Industry statistics
- Success stories

---

## 🆘 Troubleshooting Quick Links

- Chatbot not showing? → INTEGRATION-GUIDE.md
- Getting errors? → CHATBOT-SETUP.md
- Want different service? → COMPARE-FREE-OPTIONS.md
- Can't get token? → README-FREE-CHATBOT.md

---

## 📞 Need Help?

### Before you ask:
1. Check INTEGRATION-GUIDE.md (most common issues)
2. Open browser console (F12) for error messages
3. Check if API token is correctly added

### Support:
- Hugging Face: https://huggingface.co/docs
- Google Gemini: https://ai.google.dev
- For bugs in our code: Check code comments in chatbot-widget.js

---

## 🎉 You're Ready!

This is genuinely all you need:
1. ✅ Download these files
2. ✅ Get a free API key (5 min)
3. ✅ Add 1 line of code to your HTML
4. ✅ Paste your token in the script
5. ✅ Done!

Your students will love having an AI tutor available 24/7.

---

## Next Step: Open INTEGRATION-GUIDE.md

That file has the exact copy-paste instructions. You'll be done in 5 minutes.

**Let's go! 🚀**

```
Questions from your students:
"What's the Python course about?" 🤖
"Do you have any free classes?" 🤖
"How do I enroll?" 🤖
"Tell me about live classes" 🤖

All answered instantly by AI! ✨
```

---

## File Reference

```
START-HERE.md (this file)
├─ Read this first
│
├─ INTEGRATION-GUIDE.md ← Next: Step-by-step setup
│  ├─ 5-minute installation
│  ├─ Example code
│  └─ Troubleshooting
│
├─ README-FREE-CHATBOT.md
│  ├─ Full feature list
│  ├─ Customization guide
│  └─ FAQ
│
├─ CHATBOT-SETUP.md
│  ├─ Detailed setup (all options)
│  ├─ Advanced config
│  └─ Deep troubleshooting
│
├─ COMPARE-FREE-OPTIONS.md
│  ├─ Hugging Face vs Google vs Ollama
│  ├─ Cost comparison
│  └─ Recommendation by use case
│
├─ chatbot-widget.js (main script)
│  └─ Add your API token here
│
├─ chatbot-widget-gemini.js (alternative)
│  └─ Use this for Google Gemini
│
└─ index-with-chatbot.html (example)
   └─ Shows how to add script to HTML
```

---

## Recommended Reading Order

```
👉 START-HERE.md (you are here)
  ↓
👉 INTEGRATION-GUIDE.md (next: 5 minutes)
  ↓
👉 Try it on your website
  ↓
❓ If you have questions:
  → README-FREE-CHATBOT.md
  → CHATBOT-SETUP.md
  → COMPARE-FREE-OPTIONS.md
```

---

**Ready? Open INTEGRATION-GUIDE.md next!** ⏭️
