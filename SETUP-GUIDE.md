# Setup Guide — Database + Video Storage

## Part 1 — Connect the database (Supabase, free)

1. Go to **supabase.com** → sign up → **New project**.
   - Pick a name, a database password (save it somewhere), and a region close to India (Singapore is closest).
   - Wait ~2 minutes for it to provision.

2. In your new project: **Settings → API**. Copy two values:
   - **Project URL**
   - **anon public** key (NOT the `service_role` key — never put that in browser code)

3. Open `js/supabase-client.js` in this project and paste them in:
   ```js
   export const SUPABASE_URL = "https://xxxxxxxx.supabase.co";
   export const SUPABASE_ANON_KEY = "eyJhbGciOi...";
   ```

4. In Supabase: **SQL Editor → New query** → paste the entire contents of `sql/schema.sql` → **Run**.
   This creates the `profiles` table that stores every signup (name, role, grade/track).

5. In Supabase: **Authentication → Providers** → confirm **Email** is enabled (it is by default).
   While testing, also go to **Authentication → Settings** and turn **off** "Confirm email" —
   otherwise test signups will wait on a confirmation email you haven't set up yet. Turn it back on before going live.

6. Test it:
   - Open `login.html` in a browser, sign up with a test email/password.
   - In Supabase: **Table Editor → profiles** — your new row should appear instantly.
   - **Authentication → Users** shows the login credentials themselves.

That's it — every signup from your site now lands in a real database you can see, export, or query.

---

## Part 2 — Video storage

### Right now (free, fastest): Unlisted YouTube
- Upload your video to YouTube, set visibility to **Unlisted**.
- Copy the video ID from the URL (`youtube.com/watch?v=`**`THIS_PART`**).
- Drop it into any lesson page the way `lesson-example.html` does.
- Good enough for launch. Downside: anyone with the direct link can watch it, even if they never logged in (though it won't show up in search or on your channel).

### When you outgrow that: Bunny.net Stream
Once you want videos to only play for logged-in, paying users:
1. Sign up at **bunny.net → Stream**. Pricing is usage-based — for a few dozen short lesson videos, expect roughly ₹200–500/month, not a fixed plan fee.
2. Upload videos through their dashboard or API.
3. Bunny can issue **signed, expiring URLs** per viewer — this needs a tiny server-side function (can't be done safely in browser JS, since it requires a secret API key). A simple option: a single **Supabase Edge Function** (still free tier) that takes a logged-in user's request and returns a signed Bunny URL.
4. `lesson-example.html` has a comment showing exactly where this plugs in.

I can build the Supabase Edge Function for signed URLs whenever you're ready to move to this stage — it's a quick add-on once the free-tier flow is working end to end.

---

## Files in this delivery
- `login.html` — real login/signup page, wired to Supabase
- `js/supabase-client.js` — **edit this** with your project's URL + key
- `sql/schema.sql` — run this once in Supabase's SQL editor
- `lesson-example.html` — working example: video gated behind login
- `index.html` / `style.css` — unchanged from before, already link to `login.html`
