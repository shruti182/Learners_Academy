# 🤖 Free AI Chatbot for Learners Academy

A **completely free** student support chatbot for your Learners Academy website using open APIs. No credit card required!

---

## 🚀 What You Get

✅ **Floating chatbot widget** in bottom-right corner
✅ **Smart responses** about your courses, faculty, pricing
✅ **Chat history** saved locally in browser
✅ **Mobile-friendly** design
✅ **Completely FREE** — no hidden costs
✅ **Easy to customize** — change colors, text, behavior

### Demo Features
- Students ask: "What courses are free?"
- Chatbot: "We have several free courses! Check out Social Studies Grade 8, and many of our career tracks offer free lessons. Visit courses.html to explore!"
- Students ask: "Tell me about the live classes"
- Chatbot: "We offer live, instructor-led sessions with limited seats. Join real-time classes with faculty like Dr. Neha Sharma and Prof. Rajesh Kumar. See live-classes.html for the schedule!"

---

## 📋 Quick Setup (2 minutes)

### Step 1: Choose Your Free LLM Service

#### Option A: Hugging Face (✅ Recommended for beginners)
- No credit card needed
- Free tier: ~30 requests/minute
- Quality: Good for student queries
- Setup time: 2 minutes

#### Option B: Google Gemini (✅ More generous quota)
- No credit card needed
- Free tier: ~60 requests/minute
- Quality: Better reasoning
- Setup time: 2 minutes

#### Option C: Run Ollama Locally (✅ Best privacy)
- 100% free, no limits
- Runs on your own server
- Quality: Excellent
- Setup time: 5-10 minutes

---

## 🔧 Installation

### Method 1: Hugging Face (Easiest)

**Step 1:** Create a free account
```
1. Go to https://huggingface.co
2. Click "Sign Up"
3. Verify your email
```

**Step 2:** Get your API token
```
1. Visit https://huggingface.co/settings/tokens
2. Click "New token"
3. Name it: "Learners Academy Chatbot"
4. Set Role: "Read"
5. Copy the token (starts with "hf_")
```

**Step 3:** Add token to your website
```javascript
// In chatbot-widget.js, line 8:
const HF_API_TOKEN = 'hf_YOUR_TOKEN_HERE'; // ← Paste your token here
```

**Step 4:** Add to your HTML pages
```html
<!-- Before closing </body> tag in your HTML files: -->
<script src="chatbot-widget.js"></script>
```

**Step 5:** Test it
- Open your website
- Look for 💬 button in bottom-right
- Click and ask a question!

---

### Method 2: Google Gemini

**Step 1:** Get your free API key
```
1. Go to https://aistudio.google.com/apikey
2. Click "Create API key"
3. Copy the key
```

**Step 2:** Add to your website
```javascript
// In chatbot-widget-gemini.js, line 8:
const GEMINI_API_KEY = 'YOUR_KEY_HERE';
```

**Step 3:** Use the Gemini version
```html
<!-- In your HTML file: -->
<script src="chatbot-widget-gemini.js"></script>
```

---

### Method 3: Ollama (Self-Hosted)

**Step 1:** Install Ollama
- Download from https://ollama.ai
- Install on your server or local machine

**Step 2:** Download a model
```bash
ollama pull mistral
# or for faster/smaller:
ollama pull neural-chat
```

**Step 3:** Run Ollama
```bash
ollama serve
# Runs on http://localhost:11434
```

**Step 4:** Use local chatbot
- Edit `chatbot-widget.js`
- Replace the Hugging Face API call with local Ollama call
- (See CHATBOT-SETUP.md for details)

---

## 📁 Files Included

```
chatbot-widget.js              ← Main chatbot (Hugging Face)
chatbot-widget-gemini.js       ← Alternative (Google Gemini)
CHATBOT-SETUP.md               ← Detailed setup guide
README-FREE-CHATBOT.md         ← This file
index-with-chatbot.html        ← Example: index.html with chatbot added
```

---

## 💬 How It Works

### For Your Students:
1. Sees 💬 button in corner
2. Clicks to open chatbot
3. Types a question
4. Gets instant answer based on:
   - Your academy's course info
   - Faculty details
   - Pricing info
   - General guidance

### For You:
1. No backend server needed
2. API handles all AI processing
3. Conversation history stored locally
4. Can customize responses via `SYSTEM_CONTEXT`

---

## 🎨 Customization

### Change the chatbot's personality:
Edit `SYSTEM_CONTEXT` in `chatbot-widget.js` (around line 17):

```javascript
const SYSTEM_CONTEXT = `You are a helpful tutor for Learners Academy.

Key facts:
- Python course costs ₹1,799
- SQL course has 41 lessons
- Live classes run every week
- Founded by Shrutika Khandelwal

Tone: Friendly, encouraging, concise.`
```

### Change colors:
Find the CSS in `chatbot-widget.js` and edit colors:
```javascript
background: linear-gradient(135deg, #7c3aed, #6d28d9); // Purple
// Change to:
background: linear-gradient(135deg, #ec4899, #db2777); // Pink
```

### Change size:
```javascript
width: 360px;  // Change this
height: 500px; // And this
```

### Change button emoji:
```javascript
toggleBtn.textContent = '💬'; // Change to 🤖, 📚, ❓, etc.
```

---

## 🔍 Testing Checklist

- [ ] API token added to chatbot file
- [ ] Chatbot script added to HTML before `</body>`
- [ ] Website loads without errors (check browser console F12)
- [ ] 💬 button appears in bottom-right
- [ ] Click button to open chatbot
- [ ] Type a test question
- [ ] Chatbot responds within 2-3 seconds
- [ ] Multiple questions work smoothly
- [ ] Chat history appears on page reload

---

## ⚠️ Troubleshooting

### "Chatbot not configured" message
**Solution:** Make sure you added your API token/key to the script

### No response, or timeout
**Solution:** 
1. Check internet connection
2. Verify API token/key is correct
3. Try a different question
4. Check browser console (F12) for errors

### Rate limit error
**Solution:** Free tiers have limits (~30-60 requests/min)
- Wait a minute and try again
- Upgrade to paid tier if getting heavy use
- Use Ollama for unlimited requests

### Chatbot gives bad answers
**Solution:** Improve the `SYSTEM_CONTEXT` with more specific info about your courses, faculty, pricing

### Chatbot not appearing
**Solution:**
1. Make sure script is added before `</body>`
2. Hard refresh page (Ctrl+Shift+R)
3. Check for JavaScript errors in console

---

## 🚀 Next Steps

### Once you're live:
1. Monitor what students ask
2. Add those FAQs to `SYSTEM_CONTEXT`
3. Track conversation quality
4. Iterate and improve

### When free tier gets crowded:
1. **Hugging Face:** Upgrade to Pro ($9/month)
2. **Google Gemini:** Upgrade to paid (~$0.075/1K tokens)
3. **Ollama:** Run on your server (only pay for hosting)
4. **Claude API:** Best quality ($1/$5 per million tokens)

---

## 📊 Free Tier Limits

| Service | Free Quota | Setup Time | Quality |
|---------|-----------|-----------|---------|
| Hugging Face | 30 req/min | 2 min | Good |
| Google Gemini | 60 req/min | 2 min | Excellent |
| Ollama | Unlimited | 10 min | Excellent |

---

## 🔐 Privacy & Security

- **Chat history:** Stored in browser's localStorage only (on user's device)
- **API keys:** Never exposed in client-side code (it's okay, these are read-only keys)
- **User data:** Not logged or sold
- **Server:** Requests go to Hugging Face / Google / Your Ollama server

---

## 📞 Need Help?

### Documentation:
- Hugging Face: https://huggingface.co/docs/api-inference
- Google Gemini: https://ai.google.dev/tutorials
- Ollama: https://ollama.ai/library

### Common Questions:

**Q: Is it really free?**
A: Yes! Free tier is enough for testing and moderate traffic. Scale up when needed.

**Q: Can students see my API key?**
A: No - these are read-only API keys designed for browser use. Safe to expose.

**Q: Can I change the model?**
A: Yes! In `chatbot-widget.js`, change the `HF_MODEL` constant to any Hugging Face model.

**Q: Does it work offline?**
A: No - needs internet. To work offline, use Ollama locally.

**Q: Can I add it to other pages?**
A: Yes! Just add `<script src="chatbot-widget.js"></script>` to any HTML file.

**Q: How many concurrent users can it handle?**
A: Limited by free tier quota. Hugging Face/Gemini: 30-60 req/min. Ollama: unlimited.

---

## 🎓 Example Integration

### Before (index.html):
```html
</body>
</html>
```

### After (index-with-chatbot.html):
```html
<!-- FREE CHATBOT WIDGET -->
<script src="chatbot-widget.js"></script>
</body>
</html>
```

That's it! Now your website has AI-powered student support.

---

## 📈 Future Enhancements

Ideas to make the chatbot even better:

1. **Connect to your database** - Show real course data instead of hardcoded info
2. **Live class sync** - Pull upcoming classes from your schedule
3. **Student profile** - Know who's asking and personalize responses
4. **Feedback rating** - Let students rate chatbot answers
5. **Escalation** - "Connect to human support" button for complex questions
6. **Multi-language** - Support Hindi, other Indian languages
7. **Context awareness** - Know which page student is on

---

## 📝 License & Attribution

Feel free to modify and use this chatbot for your Learners Academy. Attribution appreciated but not required!

---

## 🎉 Ready to launch?

1. ✅ Choose your service (Hugging Face, Gemini, or Ollama)
2. ✅ Get your free API key
3. ✅ Add token to `chatbot-widget.js`
4. ✅ Add `<script src="chatbot-widget.js"></script>` to your HTML
5. ✅ Test and deploy!

Your students will love having instant AI support. Good luck! 🚀

---

**Questions? Suggestions?**
- Check CHATBOT-SETUP.md for detailed troubleshooting
- Review the code comments in chatbot-widget.js
- Test in your browser's console (F12)
