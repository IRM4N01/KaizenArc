# Troubleshoot — App Not Updating After Push

## Step 1 — Check GitHub first
Go to your repo on GitHub and click `style.css`.
Does it show the new code?

- **NO** → Push didn't go through

Wait 60 seconds and check again.

- **YES** → GitHub is fine, issue is the cache. Move to step 2.

---

## Step 2 — Bump the cache version
In `service-worker.js`, change the cache name:
```javascript
const CACHE_NAME = "training-arc-v3"; // increment each time
```
Push the change, wait 60 seconds, close the app fully and reopen.

Still showing old version? Move to step 3.

---

## Step 3 — Clear Safari cache on iPhone
1. Go to **Settings** on your iPhone
2. Scroll down to **Safari**
3. Tap **Clear History and Website Data**
4. Open the URL in Safari fresh

Browser shows new version but app icon still old? Move to step 4.

---

## Step 4 — Delete and reinstall the PWA
1. Hold the app icon → **Remove App**
2. Open **Safari** and go to your GitHub Pages URL
3. Tap **Share** → **Add to Home Screen**

---

## Notes
- You'll rarely need to go past Step 2
- Get in the habit of bumping the cache version with every significant push