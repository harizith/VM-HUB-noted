// Confetti animation helper with robust fallback
export async function triggerConfetti() {
  if (typeof window === "undefined") return;
  try {
    const confetti = (await import("canvas-confetti")).default;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#AF0606", "#026466", "#FECDA5", "#22C55E", "#3B82F6"],
    });
  } catch {
    // If canvas-confetti is not loaded, gracefully proceed
  }
}
