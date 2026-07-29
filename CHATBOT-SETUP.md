# Free Chatbot Integration — Learners Academy

## Quick Start

This guide shows how to add a **free AI chatbot** to your Learners Academy website using a free LLM API.

---

## Option 1: Hugging Face (Recommended for beginners)

### Why Hugging Face?
- ✅ Completely FREE — no credit card needed
- ✅ Easy to set up — just paste a token
- ✅ Good for testing and moderate traffic
- ✅ Fast responses
- ⚠️ Rate limited on free tier (~30 requests/min)

### Setup Steps

1. **Get a free Hugging Face account:**
   - Go to https://huggingface.co
   - Click "Sign Up" (takes 2 minutes)
   - Confirm your email

2. **Create an API token:**
   - Visit https://huggingface.co/settings/tokens
   - Click "New token"
   - Name it (e.g., "Learners Academy Chatbot")
   - Set Role to "Read"
   - Copy the token (looks like `hf_xxxxxxxxxxxx`)

3. **Add token to your website:**
   - Open `chatbot-widget.js`
   - Find line 8: `const HF_API_TOKEN = 'YOUR_HUGGINGFACE_API_TOKEN_HERE';`
   - Replace with: `const HF_API_TOKEN = 'hf_YourTokenHere';`
   - Save the file

4. **Add chatbot to your HTML pages:**
   - Add this line BEFORE the closing `</body>` tag in every HTML file:
   ```html
   <script src="chatbot-widget.js"></script>
   ```
   - Or just add to `index.html`, `courses.html`, `login.html`, etc.

5. **Test it:**
   - Open your website in a browser
   - Look for the 💬 button in the bottom-right corner
   - Click it and ask a question!

### Example questions students might ask:
- "What courses are available for Grade 10?"
- "Is there a free trial?"
- "How much does the Python course cost?"
- "Tell me about the live classes"
- "Who teaches Mathematics?"

---

## Option 2: Google Gemini (Also free, larger quota)

### Why Gemini?
- ✅ Completely FREE
- ✅ Larger free quota (~60 requests/min, more generous)
- ✅ Better reasoning capabilities
- ⚠️ Requires Google account

### Setup

1. Go to https://aistudio.google.com/apikey
2. Click "Create API key"
3. Copy your API key
4. Use this alternative chatbot script instead:

```javascript
// Add this to the top of chatbot-widget.js instead of HF config
const GEMINI_API_KEY = 'YOUR_GOOGLE_API_KEY_HERE'; // Get from https://aistudio.google.com/apikey
const USE_GEMINI = true; // Switch to Gemini instead of Hugging Face
```

Then use the alternative chatbot file: `chatbot-widget-gemini.js` (see below)

---

## Option 3: Run Your Own (Best for privacy & cost)

### Why Self-Hosted?
- ✅ 100% FREE (just server costs)
- ✅ No API limits or rate limiting
- ✅ Complete privacy — data stays on your server
- ✅ No token needed, no external dependencies
- ⚠️ Requires running a separate service (Ollama)

### Setup with Ollama

1. **Install Ollama:**
   - Download from https://ollama.ai
   - Run it on your server (or local machine for testing)

2. **Download a model:**
   ```bash
   ollama pull mistral
   # or for smaller/faster:
   ollama pull neural-chat
   ```

3. **Run Ollama:**
   ```bash
   ollama serve
   # Listens on http://localhost:11434
   ```

4. **Use this chatbot script instead:**
```javascript
const OLLAMA_URL = 'http://localhost:11434'; // or your server IP
const OLLAMA_MODEL = 'mistral'; // or 'neural-chat' for smaller model

async function queryOllama(userMessage) {
  const response = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: userMessage,
      stream: false,
    }),
  });
  const data = await response.json();
  return data.response;
}
```

---

## Troubleshooting

### "Chatbot not configured" message?
→ Make sure you've added your API token to `chatbot-widget.js` line 8

### No response from chatbot?
→ Check browser console (F12 → Console) for errors
→ Verify API token is correct and not expired
→ Try refreshing the page

### "Rate limit exceeded"?
→ You've hit the free tier limit temporarily
→ Wait a few minutes, or upgrade your Hugging Face account ($9/month for more quota)

### Chatbot gives irrelevant answers?
→ Improve the SYSTEM_CONTEXT in `chatbot-widget.js` with more details about your courses
→ Add more course information to help it give better answers

---

## Customization

### Change the chatbot appearance:
- Edit the `style.cssText` sections in `chatbot-widget.js`
- Change colors, size, position, etc.

### Change the model:
- Find line `const HF_MODEL = ...`
- Replace with any Hugging Face model that supports text generation:
  - `meta-llama/Llama-2-7b-chat-hf` (better quality)
  - `mistralai/Mistral-7B-Instruct-v0.1` (current default)
  - `HuggingFaceH4/zephyr-7b-beta` (good balance)

### Add more context about your academy:
- Edit the `SYSTEM_CONTEXT` variable to include:
  - Specific course details
  - Faculty bios
  - Pricing tiers
  - Special offers
  - Contact information

---

## Moving to Production

Once you're ready to scale beyond the free tier:

1. **Hugging Face:** Upgrade to Pro ($9/month) or use Inference Endpoints
2. **Google Gemini:** Upgrade to paid tier ($0.075 per 1K tokens)
3. **Ollama:** Run on a VPS ($5-20/month for server costs)
4. **Anthropic Claude:** Use Claude API ($1/$5 per million tokens — recommended for best quality)

---

## Files Included

- `chatbot-widget.js` — Main chatbot script (Hugging Face)
- `CHATBOT-SETUP.md` — This file
- Example integration (see below)

---

## Quick Integration Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Learners Academy</title>
</head>
<body>
  
  <!-- Your existing content -->
  <h1>Welcome to Learners Academy</h1>
  
  <!-- Add this before closing </body> tag -->
  <script src="chatbot-widget.js"></script>
  
</body>
</html>
```

That's it! The chatbot will appear as a floating button in the bottom-right corner.

---

## Support

For more help:
- Hugging Face docs: https://huggingface.co/docs/api-inference
- Google Gemini: https://ai.google.dev
- Ollama: https://ollama.ai/library

Happy chatting! 🎓
