# Describe-It! — 60s Team Card Game

Hi! This is my try at **vibe coding** — a simple web-based version of the classic Activity-style describing game.

## 🎮 How to Play
1. Open the `describe-it-game.html` file in any browser.
2. When ready, click **Start Round — 60s**. You’ll get one card with:
   - A **main word** to describe to your teammate.
   - Five **forbidden words** you are *not allowed* to say.
3. You have **60 seconds** to describe as many cards as possible.
   - If your teammate guesses correctly → press **Success** (or hit **Space**) to earn +1 point.
   - If you want to skip a word → press **Skip** (or hit **S**) and lose 1 point.
4. When time runs out, your final score is shown in the log panel.

## 🃏 Adding or Importing Cards
You can import your own cards via the **“Edit / Import Cards”** section on the right:
- Use one card per line in this format:
  ```
  Word | forbidden1,forbidden2,forbidden3,forbidden4,forbidden5
  ```
- Example:
  ```
  Apple | fruit,red,tree,core,juice
  Rocket | space,engine,astronaut,launch,orbit
  ```
- Paste your list into the box and click **Load Cards**.

You can also download or create `.txt` files with hundreds of cards — both English and German examples are included (`cards_1000.txt`, `karten_1000_deutsch.txt`).

## 💡 Tips
- You can shuffle cards, reset the score, or download the entire HTML game for sharing.
- Everything runs locally — no installation or server required.

Enjoy your game night and have fun with your team!
