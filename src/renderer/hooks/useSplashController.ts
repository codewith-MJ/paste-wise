import { useEffect, useState, useRef, useCallback } from "react";

const SHOW_MS = 2500;
const FADE_MS = 300;

function useSplashController() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const skippedRef = useRef(false);
  const fadeOutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeSplashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const clearAllSplashTimeouts = () => {
    if (fadeOutTimeoutRef.current) clearTimeout(fadeOutTimeoutRef.current);
    if (removeSplashTimeoutRef.current)
      clearTimeout(removeSplashTimeoutRef.current);
  };

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("pw_splash_seen");

    if (hasSeenSplash) {
      setVisible(false);
      return;
    }

    fadeOutTimeoutRef.current = setTimeout(
      () => setFadeOut(true),
      Math.max(0, SHOW_MS - FADE_MS),
    );
    removeSplashTimeoutRef.current = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("pw_splash_seen", "true");
    }, SHOW_MS);

    return () => {
      clearAllSplashTimeouts();
    };
  }, []);

  const handleSkipSplash = useCallback(() => {
    if (skippedRef.current) {
      return;
    }
    skippedRef.current = true;

    clearAllSplashTimeouts();

    setFadeOut(true);
    setTimeout(() => setVisible(false), FADE_MS);
    sessionStorage.setItem("pw_splash_seen", "true");
  }, []);

  return {
    visible,
    fadeOut,
    fadeMs: FADE_MS,
    handleSkipSplash,
  };
}

export default useSplashController;
