# How to Update courses.html

Since `courses.html` is large, here's exactly what to change:

## Step 1: Update the Navigation Actions (Lines 30-34)

### FIND THIS:
```html
    <div class="nav__actions">
      <a href="admin-upload.html" class="btn btn--ghost" style="opacity:0.7;">Admin</a>
      <a href="login.html" class="btn btn--ghost">Log in</a>
      <a href="login.html?mode=signup" class="btn btn--solid">Start free</a>
    </div>
```

### REPLACE WITH THIS:
```html
    <div class="nav__actions">
      <a href="admin-upload.html" class="btn btn--ghost" style="opacity:0.7;">Admin</a>
      <div id="authContainer">
        <!-- Login buttons (shown when not logged in) -->
        <div id="authButtons">
          <a href="login.html" class="btn btn--ghost">Log in</a>
          <a href="login.html?mode=signup" class="btn btn--solid">Start free</a>
        </div>
        <!-- User menu (shown when logged in) -->
        <div class="user-menu" id="userMenu" hidden>
          <button type="button" class="user-menu__trigger" id="userMenuTrigger">
            <span class="user-menu__trigger-avatar" id="userAvatar">U</span>
            <span id="userName">User</span>
          </button>
          <div class="user-menu__dropdown">
            <a href="dashboard.html" class="user-menu__item">Dashboard</a>
            <a href="my-courses.html" class="user-menu__item">My Courses</a>
            <button type="button" class="user-menu__item user-menu__item--logout" id="logoutBtn">Sign out</button>
          </div>
        </div>
      </div>
    </div>
```

## Step 2: Add CSS Styles to the `<head>` section

Add this inside the `<style>` tag or in a `<style>` tag before `</head>`:

```html
<style>
  /* User menu dropdown */
  .user-menu{
    position:relative;
    display:inline-block;
  }
  .user-menu__trigger{
    display:flex;
    align-items:center;
    gap:8px;
    padding:8px 12px;
    background:transparent;
    border:none;
    cursor:pointer;
    font-family:inherit;
    font-weight:600;
    color:var(--text);
    border-radius:8px;
    transition:background 0.2s ease;
  }
  .user-menu__trigger:hover{
    background:rgba(15,42,74,0.08);
  }
  .user-menu__trigger-avatar{
    width:32px;
    height:32px;
    border-radius:50%;
    background:var(--purple);
    color:#fff;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:700;
    font-size:0.9rem;
  }
  .user-menu__dropdown{
    position:absolute;
    top:100%;
    right:0;
    margin-top:8px;
    background:#fff;
    border:1px solid var(--line);
    border-radius:12px;
    box-shadow:0 12px 28px rgba(33,26,51,0.12);
    min-width:180px;
    z-index:100;
    opacity:0;
    visibility:hidden;
    transform:translateY(-8px);
    transition:opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  }
  .user-menu.is-open .user-menu__dropdown{
    opacity:1;
    visibility:visible;
    transform:translateY(0);
  }
  .user-menu__item{
    display:block;
    width:100%;
    padding:12px 16px;
    text-align:left;
    font-family:inherit;
    font-size:0.95rem;
    color:var(--text);
    background:none;
    border:none;
    cursor:pointer;
    transition:background 0.2s ease;
    text-decoration:none;
  }
  .user-menu__item:first-child{
    border-top-left-radius:12px;
    border-top-right-radius:12px;
  }
  .user-menu__item:last-child{
    border-bottom-left-radius:12px;
    border-bottom-right-radius:12px;
  }
  .user-menu__item:hover{
    background:rgba(15,42,74,0.05);
  }
  .user-menu__item--logout{
    color:#e74c3c;
    border-top:1px solid var(--line);
  }
  .user-menu__item--logout:hover{
    background:rgba(231,76,60,0.08);
  }
</style>
```

## Step 3: Add JavaScript Before `</body>`

Add this script before the closing `</body>` tag:

```html
<!-- Authentication state management for navbar -->
<script>
(function() {
  const authContainer = document.getElementById('authContainer');
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  const userMenuTrigger = document.getElementById('userMenuTrigger');
  const userNameEl = document.getElementById('userName');
  const userAvatarEl = document.getElementById('userAvatar');
  const logoutBtn = document.getElementById('logoutBtn');

  // Check if user is logged in (from localStorage, session, or auth provider)
  function checkAuthStatus() {
    // This is a placeholder — wire it to your actual auth system
    const isLoggedIn = localStorage.getItem('la_user_loggedIn') === 'true';
    const userName = localStorage.getItem('la_user_name') || 'User';
    
    if (isLoggedIn) {
      authButtons.hidden = true;
      userMenu.hidden = false;
      userNameEl.textContent = userName;
      // Set avatar to first letter
      const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
      userAvatarEl.textContent = initials || 'U';
    } else {
      authButtons.hidden = false;
      userMenu.hidden = true;
    }
  }

  // Toggle user menu dropdown
  userMenuTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    userMenu.classList.toggle('is-open');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    userMenu.classList.remove('is-open');
  });

  // Logout handler
  logoutBtn.addEventListener('click', () => {
    // Clear auth data
    localStorage.removeItem('la_user_loggedIn');
    localStorage.removeItem('la_user_name');
    localStorage.removeItem('la_user_id');
    
    // Show message and redirect
    alert('You have been logged out.');
    location.reload();
  });

  // Initialize auth state on page load
  checkAuthStatus();
})();
</script>
```

---

## That's it! 

Repeat these 3 steps for any other pages that have navigation:
- `live-classes.html`
- `faculty.html`
- `dashboard.html`
- Any custom pages with the same nav structure

---

## Testing

After updating, test by running in browser console:

```javascript
// Simulate login
localStorage.setItem('la_user_loggedIn', 'true');
localStorage.setItem('la_user_name', 'John Smith');
location.reload();

// Should see user menu with avatar "JS"
// Click Sign out to test logout
```
