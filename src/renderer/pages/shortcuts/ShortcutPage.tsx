import { useState } from "react";
import PageHeader from "@/renderer/layouts/PageHeader";
import { ShortcutUI } from "@/shared/types/shortcut";
import {
  DEFAULT_ACTIONS,
  DEFAULT_TONES,
} from "@/renderer/mocks/mock-shortcuts";
import ShortcutSection from "./ShortcutSection";
import ShortcutRow from "./ShortcutRow";

function ShortcutPage() {
  const [actions] = useState<ShortcutUI[]>(DEFAULT_ACTIONS);
  const [tones] = useState<ShortcutUI[]>(DEFAULT_TONES);

  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      <PageHeader
        title="단축키 설정"
        description="원하는 단축키로 변환된 텍스트를 바로 붙여넣을 수 있도록 설정하세요."
      />

      <div className="flex-1 overflow-y-auto bg-white px-6 py-6 md:px-8">
        <div className="mx-auto max-w-2xl flex-col items-center gap-6 space-y-3">
          <ShortcutSection
            emoji="🎛️"
            title="기능 단축키"
            description="앱의 주요 기능을 빠르게 실행해요."
          >
            {actions.map((a) => (
              <li key={a.shortcutId} className="px-5 py-3.5">
                <ShortcutRow
                  key={a.shortcutId}
                  id={a.shortcutId}
                  label={a.command}
                  comboText={a.accelerator}
                />
              </li>
            ))}
          </ShortcutSection>

          <ShortcutSection
            emoji="😃"
            title="말투 변환 단축키"
            description="말투/번역 모드를 빠르게 전환해요."
          >
            {tones.map((m) => (
              <li key={m.shortcutId} className="px-5 py-3.5">
                <ShortcutRow
                  key={m.shortcutId}
                  id={m.shortcutId}
                  label={m.command}
                  comboText={m.accelerator}
                />
              </li>
            ))}
          </ShortcutSection>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>
    </main>
  );
}

export default ShortcutPage;
