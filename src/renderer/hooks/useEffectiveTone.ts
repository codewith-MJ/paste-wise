import { useMemo } from "react";
import { ALL_TONE } from "@/shared/constants/tone";

function useEffectiveTone(selectedTone: string, toneOptions: string[]) {
  const dropdownTones = useMemo(
    () => [ALL_TONE, ...toneOptions],
    [toneOptions],
  );

  const effectiveTone = useMemo(
    () => (dropdownTones.includes(selectedTone) ? selectedTone : ALL_TONE),
    [dropdownTones, selectedTone],
  );

  return { dropdownTones, effectiveTone };
}

export default useEffectiveTone;
