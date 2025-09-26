INSERT OR IGNORE INTO shortcuts (command, tone_id, accelerator, is_active) VALUES
  ('변환 복사',       NULL, '⌘+⌥+C', 1),
  ('변환 붙여넣기',   NULL, '⌘+⌥+V', 1),
  ('톤 선택 팝업',    NULL, '⌘+⌥+P', 1),
  ('변환 결과 선택 팝업',  NULL, '⌘+⌥+R', 1),
  ('번역 모드 토글',  NULL, '+T', 1),
  ('기본 변환', 1, '⌘+⌥+1', 1),
  ('격식체 변환', 2, '⌘+⌥+2', 1),
  ('친근체 변환', 3, '⌘+⌥+3', 1),
  ('유머러스 변환', 4, '⌘+⌥+4', 1);