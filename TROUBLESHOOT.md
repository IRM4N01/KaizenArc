# Troubleshoot — Kaizen Arc

## App Not Updating After Push

### Step 0 — Hard refresh the browser (desktop)
Before anything else, try a hard refresh on your laptop browser:
- **Windows:** `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`

This forces the browser to ignore the cache and download the latest files.
If this fixes it, no further steps needed.

---

### Step 1 — Check GitHub first
Go to your repo on GitHub and click a recently changed file (e.g. `js/workout.js`).
Does it show the new code?

- **NO** → Push didn't go through

git add .
git commit -m "your message"
git push

Wait 60 seconds and check again.

- **YES** → GitHub is fine, issue is the cache. Move to step 2.

---

### Step 2 — Bump the cache version
In `service-worker.js`, increment the cache name:
```javascript
const CACHE_NAME = "kaizen-arc-v9"; // increment each time
```
Push the change, wait 60 seconds, close the app fully and reopen.

Still showing old version? Move to step 3.

---

### Step 3 — Force update via Safari
1. Open **Safari** on your phone
2. Go to your GitHub Pages URL
3. Wait for it to fully load
4. Close the Safari tab completely from app switcher
5. Open the app from your home screen

Still showing old version? Move to step 4.

---

### Step 4 — Clear Safari cache on iPhone
1. Go to **Settings** on your iPhone
2. Scroll down to **Safari**
3. Tap **Clear History and Website Data**
4. Open the URL in Safari fresh

Browser shows new version but app icon still old? Move to step 5.

---

### Step 5 — Bump cache again and repeat step 3
Sometimes iPhone needs two cache bumps. Increment the cache version again:
```javascript
const CACHE_NAME = "kaizen-arc-v10"; // bump again
```
Push, wait 60 seconds, then repeat Step 3.

---

## Step 5.5 — Restart your iPhone
If bumping the cache and clearing Safari data doesn't work, try a full phone restart:
1. Hold the power button and slide to power off
2. Wait 30 seconds
3. Turn your phone back on
4. Open Safari → go to your GitHub Pages URL
5. Wait for full load
6. Open the app from home screen

This clears the service worker state that iOS sometimes holds onto.

---

### Step 6 — Delete and reinstall the PWA (last resort)
⚠️ **Warning:** This will wipe your localStorage data including all programs and lift data.
Only do this if all other steps have failed.

1. Hold the app icon → **Remove App**
2. Open **Safari** and go to your GitHub Pages URL
3. Tap **Share** → **Add to Home Screen**

---

## ES Module Errors (file:// protocol)
If you see CORS errors mentioning `file://` in the console:
- This happens when opening `index.html` directly in the browser
- Always use **Live Server** in VS Code instead
- Right click `index.html` → **Open with Live Server**
- App will open at `http://127.0.0.1:5500`

---

## Exercise Search Not Working
- The exercise database is built-in and works offline
- If suggestions aren't appearing, make sure you've typed at least 2 characters
- Check the console for any import errors related to `exerciseData.js`

---

## Rest Timer Sound Not Working on iPhone
- Apple requires a user interaction before allowing audio
- Tap anywhere on the workout screen before starting the rest timer
- If sound still doesn't work, check that your phone is not on silent mode

---

## Notes
- Bump the cache version with every significant push as a good habit
- localStorage data persists through cache updates — only deleted if you remove the app
- The `config.js` file is gitignored and should never be pushed to GitHub