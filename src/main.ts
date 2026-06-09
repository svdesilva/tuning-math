const cents = (ratio: number): number => 1200 * Math.log2(ratio);

const equalTemperamentSemitone = (): number => Math.pow(2, 1 / 12);

const etRatio = (semitones: number): number => Math.pow(2, semitones / 12);

/** Just intonation ratios for a major scale starting C (degree 0 = unison). */
const justMajor: Record<number, string> = {
  0: "1/1",
  1: "16/15", // minor second (less common choice; included for spice)
  2: "9/8",
  3: "6/5",
  4: "5/4",
  5: "4/3",
  6: "45/32", // tritone variant (many options; this is one classical flavor)
  7: "3/2",
  8: "8/5",
  9: "5/3",
  10: "9/5",
  11: "15/8",
};

const parseFraction = (s: string): number => {
  const [num, den] = s.split("/").map((x) => Number(x));
  if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0) {
    throw new Error(`Bad fraction: ${s}`);
  }
  return num / den;
};

const pythagoreanFromFifths = (semitones: number): number => {
  // Build chromatic Pythagorean by stacking fifths (3/2) and octaves (2/1), simplified mod octave.
  // For demo purposes: return ET for anything outside C major subset to avoid a full tuning treatise here.
  const fifth = 3 / 2;
  const octave = 2;
  const stackFifth = (k: number): number => {
    let r = 1;
    let n = k;
    while (n > 0) {
      r *= fifth;
      while (r >= octave) r /= octave;
      n -= 1;
    }
    while (n < 0) {
      r /= fifth;
      while (r < 1) r *= octave;
      n += 1;
    }
    return r;
  };

  // Map semitone to rough fifths stacking is non-trivial in one file; use ET fallback except perfect fifth.
  if (semitones === 7) return stackFifth(1);
  if (semitones === 0) return 1;
  return etRatio(semitones);
};

const degreeName = (d: number): string => {
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return names[d % 12] ?? "?";
};

const main = (): void => {
  const et = equalTemperamentSemitone();
  const rows: string[] = [];
  rows.push("# Tuning table (octave-relative)");
  rows.push("");
  rows.push("| Degree | Pitch | ET ratio | ET cents | Just ratio | Just cents | Pythagorean-ish |");
  rows.push("|-------:|------|---------:|---------:|-----------:|-----------:|----------------:|");

  for (let d = 0; d < 12; d += 1) {
    const etR = etRatio(d);
    const etC = cents(etR);
    const just = justMajor[d];
    const justR = just ? parseFraction(just) : etR;
    const justC = cents(justR);
    const pytR = pythagoreanFromFifths(d);
    const pytC = cents(pytR);
    const justCell = just ?? "—";
    rows.push(
      `| ${d} | ${degreeName(d)} | ${etR.toFixed(6)} | ${etC.toFixed(2)} | ${justCell} | ${justC.toFixed(2)} | ${pytR.toFixed(6)} (${pytC.toFixed(2)}¢) |`,
    );
  }

  rows.push("");
  rows.push(`Equal-temperament semitone factor: ${et.toFixed(6)} (twelfth root of two: 2^(1/12)).`);
  rows.push("");
  rows.push("Notes:");
  rows.push("- Just ratios are **conventions**; different eras and modes pick different commas and compromises.");
  rows.push("- Bach’s world was not “12-TET as default”; practical keyboards still **tempered** fifths. The math is how we describe the compromise.");
  rows.push("");

  console.log(rows.join("\n"));
};

main();
