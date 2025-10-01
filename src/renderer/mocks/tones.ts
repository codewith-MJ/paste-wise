import type { ToneItemUI } from "@/shared/types/tone";

export const tonesMock: ToneItemUI[] = [
  {
    toneId: "1",
    toneTitle: "👨‍💼 Polite Tone",
    isDefault: true,
    tonePrompt: "격식 있고 정중한 어조로 답변합니다.",
    toneStrength: 70,
    emojiAllowed: true,
  },
  {
    toneId: "2",
    toneTitle: "🤙 Casual Tone",
    isDefault: false,
    tonePrompt: "가볍고 친근한 말투로 답변합니다.",
    toneStrength: 55,
    emojiAllowed: true,
  },
  {
    toneId: "3",
    toneTitle: "👔 Formal Tone",
    isDefault: false,
    tonePrompt: "격식을 갖춘 문어체로 답변합니다.",
    toneStrength: 80,
    emojiAllowed: false,
  },
  {
    toneId: "4",
    toneTitle: "💖 Lovely Tone",
    isDefault: false,
    tonePrompt: "다정하고 따뜻한 말투로 답변합니다.",
    toneStrength: 60,
    emojiAllowed: true,
  },
];
