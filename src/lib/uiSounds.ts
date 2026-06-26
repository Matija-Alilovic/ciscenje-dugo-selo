export type UiSound = "tap" | "select" | "step" | "back" | "success" | "action";

const STORAGE_KEY = "ciscenje-dugo-selo-ui-sounds";

let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;

export function areUiSoundsMuted(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "off";
}

export function setUiSoundsMuted(muted: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, muted ? "off" : "on");
}

export function unlockUiSounds() {
  if (typeof window === "undefined" || areUiSoundsMuted()) return;

  if (!audioContext) {
    const Ctx =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;

    audioContext = new Ctx();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.72;
    masterGain.connect(audioContext.destination);
  }

  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }
}

function playNoiseClick(
  ctx: AudioContext,
  destination: AudioNode,
  start: number,
  volume: number,
  frequency: number,
  duration = 0.028,
) {
  const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const decay = Math.exp(-i / (length * 0.22));
    data[i] = (Math.random() * 2 - 1) * decay;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(frequency, start);
  filter.Q.setValueAtTime(1.4, start);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  source.start(start);
  source.stop(start + duration + 0.01);
}

function playPop(
  ctx: AudioContext,
  destination: AudioNode,
  start: number,
  fromHz: number,
  toHz: number,
  volume: number,
  duration = 0.09,
) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(fromHz, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(toHz, 40), start + duration * 0.55);

  gain.gain.setValueAtTime(0.001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

  oscillator.connect(gain);
  gain.connect(destination);

  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function playChime(
  ctx: AudioContext,
  destination: AudioNode,
  start: number,
  frequency: number,
  volume: number,
) {
  playPop(ctx, destination, start, frequency * 1.35, frequency * 0.92, volume, 0.11);

  const harmonic = ctx.createOscillator();
  const harmonicGain = ctx.createGain();
  harmonic.type = "triangle";
  harmonic.frequency.setValueAtTime(frequency * 2, start);
  harmonicGain.gain.setValueAtTime(0.001, start);
  harmonicGain.gain.exponentialRampToValueAtTime(volume * 0.22, start + 0.003);
  harmonicGain.gain.exponentialRampToValueAtTime(0.001, start + 0.08);
  harmonic.connect(harmonicGain);
  harmonicGain.connect(destination);
  harmonic.start(start);
  harmonic.stop(start + 0.1);
}

function playSoundNow(sound: UiSound) {
  if (!audioContext || !masterGain) return;

  const ctx = audioContext;
  const destination = masterGain;
  const now = ctx.currentTime + 0.005;

  switch (sound) {
    case "tap":
      playNoiseClick(ctx, destination, now, 0.22, 3200, 0.022);
      playPop(ctx, destination, now, 520, 380, 0.08, 0.05);
      break;
    case "select":
      playNoiseClick(ctx, destination, now, 0.14, 2600, 0.018);
      playPop(ctx, destination, now + 0.008, 980, 640, 0.16, 0.085);
      break;
    case "step":
      playPop(ctx, destination, now, 740, 520, 0.14, 0.07);
      playPop(ctx, destination, now + 0.07, 920, 680, 0.15, 0.08);
      playNoiseClick(ctx, destination, now + 0.04, 0.08, 2200, 0.016);
      break;
    case "back":
      playPop(ctx, destination, now, 460, 300, 0.11, 0.065);
      playNoiseClick(ctx, destination, now, 0.1, 1800, 0.02);
      break;
    case "success":
      playChime(ctx, destination, now, 659.25, 0.17);
      playChime(ctx, destination, now + 0.11, 830.61, 0.16);
      playChime(ctx, destination, now + 0.22, 987.77, 0.15);
      playNoiseClick(ctx, destination, now + 0.18, 0.06, 3400, 0.02);
      break;
    case "action":
      playPop(ctx, destination, now, 1100, 780, 0.15, 0.07);
      playPop(ctx, destination, now + 0.075, 1320, 920, 0.14, 0.075);
      playNoiseClick(ctx, destination, now + 0.04, 0.1, 2900, 0.018);
      break;
  }
}

export function playUiSound(sound: UiSound) {
  if (typeof window === "undefined" || areUiSoundsMuted()) return;

  unlockUiSounds();
  if (!audioContext) return;

  if (audioContext.state === "running") {
    playSoundNow(sound);
    return;
  }

  void audioContext.resume().then(() => {
    playSoundNow(sound);
  });
}
