# Integration Guide — Add Chatbot to Your Website

## Super Quick (5 minutes)

### Step 1: Add ONE line to your HTML files

```html
<!-- Before closing </body> tag -->
<script src="chatbot-widget.js"></script>
</body>
```

### Step 2: Get your FREE API token

**Option A - Hugging Face (Easiest):**
1. Go to https://huggingface.co/settings/tokens
2. Click "New token"
3. Copy it

**Option B - Google Gemini (Better quality):**
1. Go to https://aistudio.google.com/apikey
2. Click "Create API key"
3. Copy it

### Step 3: Add token to the script

```javascript
// In chatbot-widget.js, line 8:
const HF_API_TOKEN = 'hf_YOUR_TOKEN_HERE';
// Replace YOUR_TOKEN_HERE with actual token

// OR for Gemini, use chatbot-widget-gemini.js, line 8:
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
```

### Step 4: Done! 🎉
Reload your website. Chatbot appears in bottom-right corner.

---

## Adding to ALL Your Existing Pages

You need to add this line to EVERY HTML page where you want the chatbot:

```html
<script src="chatbot-widget.js"></script>
```

### Files to Update:

- [ ] `index.html`
- [ ] `courses.html`
- [ ] `live-classes.html`
- [ ] `faculty.html`
- [ ] `about.html`
- [ ] `login.html`
- [ ] `lesson-example.html`
- [ ] `admin-upload.html`

### Example:

**BEFORE (index.html):**
```html
<footer class="footer">
  ...
</footer>

<script src="script.js"></script>
</body>
</html>
```

**AFTER (index.html):**
```html
<footer class="footer">
  ...
</footer>

<script src="script.js"></script>

<!-- FREE CHATBOT WIDGET -->
<script src="chatbot-widget.js"></script>

</body>
</html>
```

---

## File Structure

```
your-website/
├── index.html
├── courses.html
├── login.html
├── ... other HTML files ...
├── style.css
├── script.js
│
├── chatbot-widget.js          ← ADD THIS
├── chatbot-widget-gemini.js   ← OR THIS (for Gemini)
│
└── CHATBOT-SETUP.md           ← Read for detailed setup
```

---

## Verify Installation

### Checklist:

1. [ ] Downloaded `chatbot-widget.js`
2. [ ] Placed it in same folder as HTML files
3. [ ] Got API token from Hugging Face or Google
4. [ ] Updated line 8 of chatbot-widget.js with token
5. [ ] Added `<script src="chatbot-widget.js"></script>` to HTML
6. [ ] Saved the file
7. [ ] Opened website in browser
8. [ ] See 💬 button in bottom-right corner
9. [ ] Click button and ask a question
10. [ ] Got a response!

---

## Troubleshooting

### "Not configured" message?
→ Make sure you added your API token to line 8 of the JS file

### No button appears?
→ Make sure `<script src="chatbot-widget.js"></script>` is added before `</body>`
→ Check file is in same folder as HTML files
→ Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Script file not found error?
→ Make sure `chatbot-widget.js` is in the same directory as your HTML files
→ Or use full path: `<script src="./js/chatbot-widget.js"></script>`

### Nothing happens when I click the button?
→ Check browser console (F12)
→ Verify API token is correct
→ Try a fresh browser window (not in incognito mode)

---

## Different API Choices

### Using Hugging Face?
```html
<script src="chatbot-widget.js"></script>
```

### Want to switch to Google Gemini?
```html
<!-- Replace above with: -->
<script src="chatbot-widget-gemini.js"></script>
```

Both work the same way. Just need to update the API key in the file.

---

## Customization (Optional)

### Change the chatbot's knowledge:

Open `chatbot-widget.js` and find `SYSTEM_CONTEXT` (line ~17):

```javascript
const SYSTEM_CONTEXT = `You are a friendly student support assistant...

Add your course details here like:
- Python course: ₹1,799, 45 lessons, best for professionals
- Mathematics Grade 10: ₹999, 32 lessons, board exam focused
- etc.
`;
```

The more details you add, the smarter your chatbot gets!

### Change the button color:

Find `background: linear-gradient` in the file and change the hex colors:

```javascript
background: linear-gradient(135deg, #7c3aed, #6d28d9); // Purple
// Change to pink:
background: linear-gradient(135deg, #ec4899, #db2777);
// Or blue:
background: linear-gradient(135deg, #3b82f6, #1e40af);
```

### Move the button:
```javascript
bottom: 20px;  // Distance from bottom
right: 20px;   // Distance from right edge
// Change to move it around
```

---

## Production Checklist

Before going live:

- [ ] All HTML files have the script tag
- [ ] API token is added to chatbot-widget.js
- [ ] Website loads without console errors
- [ ] Chatbot responds to test questions
- [ ] Button is visible and clickable
- [ ] Chat history persists on page reload
- [ ] Works on mobile/tablets too
- [ ] Responses are relevant to your courses
- [ ] No sensitive data exposed

---

## Performance Tips

### Make it faster:
1. Place `<script src="chatbot-widget.js"></script>` as last line before `</body>`
   - This prevents JS from blocking page load

### Make chatbot smarter:
1. Add more academy info to `SYSTEM_CONTEXT`
2. Include specific course details
3. Add faculty names and their subjects
4. Include pricing and enrollment process

### Optimize for mobile:
1. Test on your phone
2. Button automatically sizes for mobile
3. Chat window responsive by default

---

## Example Complete HTML

Here's a complete example of adding chatbot to a page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Learners Academy</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header>
    <h1>Welcome to Learners Academy</h1>
  </header>

  <main>
    <!-- Your page content here -->
    <p>Browse our courses...</p>
  </main>

  <footer>
    <p>© 2026 Learners Academy</p>
  </footer>

  <!-- Your existing scripts -->
  <script src="script.js"></script>

  <!-- FREE CHATBOT WIDGET - ADD THIS -->
  <script src="chatbot-widget.js"></script>
  <!-- End chatbot -->

</body>
</html>
```

---

## What Your Students See

When they visit your site:
1. Normal website loads (no changes)
2. 💬 button appears in corner in 1-2 seconds
3. They click the button
4. Chat window opens
5. They type a question
6. AI responds with helpful answer in 1-2 seconds
7. They can ask follow-up questions
8. Chat history is saved

Total experience: Smooth, quick, helpful! ✨

---

## Next Steps

1. **Today:** Get API token (Hugging Face or Google)
2. **Today:** Add script to your HTML files
3. **Tomorrow:** Monitor first conversations
4. **This week:** Adjust chatbot knowledge based on Q&A
5. **Next week:** Promote chatbot to students

---

## Support

Stuck? Check these files:
- `README-FREE-CHATBOT.md` - Full overview
- `CHATBOT-SETUP.md` - Detailed setup
- `COMPARE-FREE-OPTIONS.md` - API comparison

Need help?
- Hugging Face: https://huggingface.co/docs
- Google Gemini: https://ai.google.dev
- Browser console (F12) shows error messages

---

## That's it! 🎉

Your Learners Academy now has AI-powered student support. Enjoy! 🤖

```
Questions answered by AI: ✅
Student satisfaction: ✅
Cost: FREE ✅
Setup time: 5 minutes ✅
```

Welcome to the future of education! 📚
