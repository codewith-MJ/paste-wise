import { create } from "zustand";

type TimeState = {
  now: number;
  start: () => void;
};

const useTimeStore = create<TimeState>((set) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const schedule = () => {
    const ms = 60000 - (Date.now() % 60000);
    timer = setTimeout(() => {
      set({ now: Date.now() });
      schedule();
    }, ms);
  };

  return {
    now: Date.now(),
    start: () => {
      if (!timer) schedule();
    },
  };
});

export default useTimeStore;
