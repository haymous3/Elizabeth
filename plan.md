# Birthday Website Plan

A one-page birthday surprise she opens on her phone. "Anyone" by Justin Bieber plays the whole time while she moves through her photos, a love poem and a small game. It ends with the big question.

---

## 1. What I understood

**What you asked for**
- A birthday website for your girlfriend.
- She watches this YouTube video while she goes through the site: *Justin Bieber, "Anyone"* (`KIK3azN4w34`). Embedding is allowed, so it can play inside the page.
- It uses her photos and videos from `assests/`.
- It has a romantic poem about how much you love her and how she means the world to you.
- It has a romantic game.
- It ends with something that says she is now your girlfriend.

**What I'm assuming (correct me)**
- She'll open it on her **phone**, so the design is mobile-first. All 8 assets are portrait phone media.
- You'll send her a **link**, so the site gets hosted somewhere (see §7).
- The ending is a playful **"Will you be my girlfriend?"** question that she can only answer "Yes".
- One walk-through should last about **one play of the song (~3 min)**. The song loops if she lingers.

**What success looks like**
She taps one button. The song starts. She scrolls through and smiles at her photos, reads the poem, plays the game, says yes, and ends up on a "you're officially my girlfriend" screen worth screenshotting.

---

## 2. The experience, step by step

```
[0] The Cinema  ->  [1] Happy Birthday  ->  [2] Every Version of You  ->  [3] The Poem
                                                                               |
          [5] The Question + "Officially Mine" (unlocks after game)  <-  [4] The Game
```

### [0] The cinema (landing page) *(replaced the envelope, per your feedback)*
- A small movie theatre. A marquee with twinkling bulbs reads **"Now showing: Anyone. A film for {HER_NAME}"**.
- Below it is a screen hidden behind closed velvet curtains, with silhouetted seats at the bottom.
- The play button is a **movie ticket** pinned to the curtains: *"Admit one · {HER_NAME} · Tap to play"*.
- When she taps it:
  - the ticket tears away and the house lights dim;
  - black widescreen bars slide in and the curtains part;
  - a flickering projector beam with drifting dust lights the screen, and **the "Anyone" video plays big on the screen**.
- *Why a tap first:* phones block video with sound until the person taps something. The ticket tap is that permission.
- When she scrolls on, the video **flies into a small corner player** and keeps playing. Scrolling back up flies it back onto the big screen.

### [1] Happy Birthday
- Big script heading: **"Happy Birthday, {HER_NAME}"**, plus the age or date if you want it.
- Hero photo: `3.jpg` (white dress, smiling) in a tilted polaroid frame.
- Floating hearts drift up slowly in the background.
- A short line under it, for example: *"Today the whole world celebrates the day it got you. I just got lucky enough to love you."*
- A little "scroll down" heart bounces at the bottom.

### [2] "Every Version of You" (gallery)
- Scattered polaroid cards that fade and tilt into place as she scrolls.
- Order: `4.jpg` (sunglasses), `1.mp4`, `6.jpg` (black & white, glasses), `2.mp4`, `5.mp4`, `7.mp4`.
- **Videos play silently on a loop** and only while they're on screen. The song stays the only sound. (`1.mp4` has its own audio; it stays muted so it doesn't clash.)
- Each card has a handwritten-style caption. Draft captions below; you can rewrite them in one file:
  - `4.jpg`: "Main character energy"
  - `1.mp4`: "The face I'd know anywhere"
  - `6.jpg`: "Even in black and white, you're colour"
  - `2.mp4`: "Effortless. Always."
  - `5.mp4`: "That look gets me every time"
  - `7.mp4`: "My favourite view"
- `6.jpg` has a Snapchat caption bar ("I'm gonna survive") baked in. I'll make a **cropped copy** without the bar for the site; your original stays untouched.

### [3] The poem
- Full-screen, quiet section. Each stanza fades in as she scrolls to it.
- Draft below. It's original (no song lyrics) and plays on the song's idea: out of anyone, only her. One stanza nods to your video-call screenshot (`8.jpg`, 12% battery).

> **My Whole World**
>
> Before you, the days were just days,
> the sun rose, then went on its way.
> Then you smiled, and I swear the light lingered,
> like it wanted a reason to stay.
>
> I love you in glasses at midnight,
> in sunglasses, gold in the sun,
> in a head-wrap, in black-and-white photos.
> Every version of you is the one.
>
> I'd stay on the call at twelve percent,
> let the battery bleed into red,
> just to watch your eyes soften to sleepy,
> just to hear one more thing that you said.
>
> If they asked me to point to my world,
> I wouldn't look east or look west.
> I'd just say your name, and they'd know it:
> the place where my heart comes to rest.
>
> So today, on the day you were born,
> here's the one thing I know to be true:
> of everyone I could ever have loved,
> there was only, and always, you.
>
> *— {YOUR_NAME}*

### [4] The game: "Find Our Hearts" (memory match)
- 16 face-down heart cards in a 4×4 grid that fits a phone screen.
- Card faces: her 4 photos plus a still frame from each of her 4 videos, giving **8 pairs**.
- Each pair she matches flips up a **"reason I love you"** note. Draft notes (replace them with real ones; real ones hit harder):
  1. Your smile fixes my worst days.
  2. You make a video call feel like a hug.
  3. You in glasses should honestly be illegal.
  4. You're my favourite notification.
  5. You're beautiful without even trying.
  6. You make me want to be a better man.
  7. Home isn't a place. It's you.
  8. I'd choose you in every lifetime.
- No timer and no losing, so it never feels like a test. A counter shows "Hearts found: 3 / 8".
- When all 8 are found, a burst of confetti plays and a message says *"You found all my hearts. They were always yours. One more thing..."* Then the final section unlocks and scrolls into view.

**Other game ideas I considered:**

| Game | Why not (for now) |
|---|---|
| Love quiz ("How well do you know us?") | Needs real questions and answers from you; easy to add later if you send me some |
| Catch the falling hearts | Fun, but doesn't use her photos or carry a message |

### [5] The question + "Officially Mine"
- Hidden until the game is done, so she can't skip ahead and spoil it.
- A pause, then: **"{HER_NAME}... will you be my girlfriend?"**
- Two buttons: **Yes 💖** and **No**.
  - **No runs away.** On a phone it jumps away the moment her finger touches it. Each try changes its text ("Are you sure?", "Think again 🥺", "Wrong button!", "Nice try") while **Yes keeps growing**. After a few tries, No disappears.
- When she taps **Yes**:
  - Big heart and confetti explosion.
  - **"It's official. You are now my girlfriend. 💍"**
  - A **"Certificate of Love"** card: *"This certifies that {HER_NAME} is officially the girlfriend of {YOUR_NAME}"*, with today's date and a signature in script.
  - `8.jpg` (your video call, you in the corner) shown in a phone-shaped frame with the caption **"Us."**
  - A last birthday line signed by you, and a small "read the poem again" link.

---

## 3. The film (YouTube player)

- The video loads on page open, behind the curtains, and plays when she taps the ticket (see [0]).
- Once the curtains are fully open, it rewinds to the start so she sees the first frame.
- While she scrolls the rest of the site, it **docks in the bottom corner** and keeps playing.
  - A "Hide video" button slides it off the side; tapping "♪ Anyone" brings it back.
  - It tucks itself away once when she reaches the game, so it doesn't cover the cards.
- It loops when it ends.
- **If YouTube fails** (no internet, blocked embed), the screen shows *"The film couldn't load here. Watch it on YouTube"*. Everything else still works.
- **Note:** YouTube blocks this video on `localhost`. It only plays once the site is hosted at a real web address (verified: it plays from a public domain).

### Animation (GSAP)
- **Cinema:** the marquee drops in, bulbs chase around it, "Anyone" writes itself in gold script, the ticket bobs, then the tear, curtains, lights and projector sequence plays.
- **Hero:** the polaroid drops in and spins to rest, her name writes itself in, and the line fades in word by word.
- **Gallery:** each photo is tossed onto the page and lands at its own tilt.
- **Poem:** the letter rises in, and each line inks in from a blur.
- **Game:** the cards are dealt onto the table; matched pairs pulse; each new reason pops in.
- **Finale:** the question builds word by word, "No" springs around the screen, and "Yes" grows. After she says yes, "It's official" writes in, the certificate lands, the wax seal stamps down with a little shake, and the phone photo slides up.
- If GSAP can't load, or her phone is set to reduced motion, the same moments happen as simple transitions and nothing is ever hidden.

---

## 4. Look & feel

- **Mood:** candle-lit love letter. Warm and intimate, not cartoonish.
- **Colours:** deep wine/plum background, blush pink and champagne-gold accents, warm cream text. These warm tones flatter her photos.
- **Fonts:** an elegant serif for headings and the poem (*Cormorant Garamond*), a flowing script for her name and signatures (*Pinyon Script*), and a clean, simple font for small text.
- **Details:** polaroid frames with a slight tilt and tape corners, soft grain texture, slow-floating hearts, gentle fade-ins as she scrolls.
- If her phone is set to **reduced motion**, the floating hearts and big animations turn off and everything else stays.

---

## 5. How it's built (technical approach)

**Approach: a plain website (HTML + CSS + JavaScript) with no build tools.** It opens in any browser, I can host it by dragging a folder, and you can edit every word in one file.

Rejected alternatives:
- *React or another framework:* overkill for one page, and it adds a build step and more ways to break.
- *A single HTML file with everything inside:* the videos (~6 MB) make that file huge, and it still needs hosting for YouTube to work.

**Files:**
```
mamma/
├── index.html          the page and all 6 sections
├── css/
│   └── style.css       colours, fonts, polaroids, animations
├── js/
│   ├── config.js       ← YOU EDIT THIS: names, captions, love notes, cinema text, final message
│   ├── main.js         fills in the text, builds gallery/poem/bulbs, starts everything
│   ├── motion.js       all GSAP animation (with no-GSAP / reduced-motion fallbacks)
│   ├── cinema.js       ticket tap, curtains, when to dock the film
│   ├── music.js        YouTube player: play on tap, dock/undock, hide, fallback
│   ├── game.js         memory-match game
│   └── finale.js       the question, the runaway "No" button, certificate, confetti
└── assests/
    ├── (your 8 original files, untouched)
    ├── 6-cropped.jpg   copy of 6.jpg without the Snapchat bar
    └── thumbs/         still frames from the 4 videos (for the game cards)
```
- The poem text also lives in `config.js`, so all the words are in one place.
- Animation uses **GSAP 3.13** (with ScrollTrigger and SplitText) and confetti uses `canvas-confetti`. Both load from a CDN with integrity checks. Everything else is hand-written.
- The page carries a "don't index" tag so it doesn't show up on Google.

---

## 6. Things that could go wrong (and the plan for each)

| Risk | Plan |
|---|---|
| Film won't start on iPhone | It starts from the ticket tap (counts as permission). If the phone still refuses, a "Tap the screen to start the film" hint appears |
| YouTube embed fails or is blocked | The screen shows a "Watch it on YouTube" link (§3) |
| GSAP fails to load | Every animation has a plain-CSS fallback; nothing stays hidden |
| Videos won't autoplay on iPhone | Videos are muted and set to play inline (iPhone allows that) |
| Slow mobile data | Videos only load when she scrolls near them; photos are already small (85–310 KB) |
| She taps "No" on a touchscreen | "No" jumps away on touch, before the tap registers |
| Docked film covers content | "Hide video" slides it away; it auto-tucks once at the game |

---

## 7. Hosting & sending it to her

YouTube embeds don't work reliably from a file opened straight off the computer, so the site needs a real web address.

**Recommended: Netlify** (free). Drag the `mamma` folder onto their deploy page and get a link like `something.netlify.app`. You can pick a custom name like `happy-birthday-{her-name}.netlify.app`.

Other options: GitHub Pages or Vercel (free, slightly more setup).

**Privacy:** anyone who has the link can see her photos and videos. The link isn't listed or searchable, but it isn't password-protected either. I can add an optional cute lock screen ("Enter our special date to open"). That keeps casual visitors out but isn't real security.

---

## 8. How I'll test it before you send it

- Run it locally and walk the whole flow in a phone-sized browser (iPhone and Android sizes).
- Check that the song starts on the tap, the mini-player collapses and expands, and the song loops.
- Check that the videos play silently only when on screen.
- Play the game to the end and confirm the finale unlocks only after all 8 pairs.
- Try the "No" button with touch and with a mouse, then confirm "Yes" shows the certificate.
- Turn on reduced motion and confirm it still looks good.
- Make YouTube fail on purpose and confirm the fallback button appears.
- After hosting, open the real link on an actual phone.

---

## 9. What I need from you

1. **Her name**, and what you call her (is it "Mamma"?). This goes on the envelope, heading, question and certificate.
2. **Your name** as you want it signed.
3. **Her birthday date and age.** Optional; age can show in the heading.
4. **Are you already together?**
   - If **yes**, the question becomes a sweet re-ask: *"Will you be my girlfriend... forever?"*
   - If **no**, it stays as the real ask: *"Will you be my girlfriend?"*
5. **The poem:** keep it, tweak it, or swap in your own words?
6. **The 8 love notes and 6 captions:** use my drafts, or send real ones (inside jokes are gold)?
7. **Lock screen:** want the "enter our special date" lock? If yes, what's the date?
8. **Hosting:** OK with Netlify?
