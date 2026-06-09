# Tuning math

A tiny CLI that prints a **12-degree tuning table** comparing:

- **12-tone equal temperament** (the modern piano compromise),
- a **just-intuition** major-scale ratio column (with one deliberately spicy minor second so the table is not boring),
- a **Pythagorean-ish** placeholder for the perfect fifth (stack of 3/2) with ET fallback elsewhere so this repo stays small.

If you like Bach, you already live in the world where **pure intervals** meet **closed cycles**—and somebody has to lose a little purity in exchange for being able to modulate. That loss is measurable in **cents** (1200 × log₂ ratio).

---

## Run

```bash
npm install
npm run start
```

---

## Why cents?

Cents turn multiplication (frequency ratios) into addition (psychophysical approximation on log scale). It is the lingua franca when comparing **comma sizes**, **Werckmeister-ish** temperaments, and why a “near fifth” feels different from a “near third.”

---

## Roadmap

- Optional `--temperament werckmeister` sketch mode (still educational, not a tuner app).
- Export CSV for plotting in Desmos / Observable.

---

## License

MIT.
