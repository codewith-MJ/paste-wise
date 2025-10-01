INSERT OR IGNORE INTO tones (
  tone_title,
  tone_prompt,
  tone_strength,
  emoji_allowed,
  is_default,
  is_active
) VALUES
  ('🙇 정중한', '가장 일반적이고 중립적인 톤으로 답변합니다.', 50, 1, 1, 1),
  ('👔 격식있는', '격식 있고 정중한 어조로 답변합니다.', 70, 0, 0, 1),
  ('🤙 캐주얼', '편안하고 따뜻한 말투로 답변합니다.', 60, 1, 0, 1),
  ('💖 다정한', '재미있고 가벼운 농담을 섞어 답변합니다.', 80, 1, 0, 1);