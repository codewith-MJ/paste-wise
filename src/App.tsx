import { useCallback, useEffect, useRef, useState } from "react";
import AppRouter from "./navigators/AppRouter";
import SplashPage from "./pages/splash";

const SHOW_MS = 2500;
const FADE_MS = 300;

function App() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const skippedRef = useRef(false);
  const fadeOutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeSplashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

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
      if (fadeOutTimeoutRef.current) clearTimeout(fadeOutTimeoutRef.current);
      if (removeSplashTimeoutRef.current)
        clearTimeout(removeSplashTimeoutRef.current);
    };
  }, []);

  const handleSkipSplash = useCallback(() => {
    if (skippedRef.current) {
      return;
    }
    skippedRef.current = true;

    if (fadeOutTimeoutRef.current) clearTimeout(fadeOutTimeoutRef.current);
    if (removeSplashTimeoutRef.current)
      clearTimeout(removeSplashTimeoutRef.current);

    setFadeOut(true);
    setTimeout(() => setVisible(false), FADE_MS);
    sessionStorage.setItem("pw_splash_seen", "true");
  }, []);

  return (
    <>
      <AppRouter />
      {visible && (
        <SplashPage
          fadeOut={fadeOut}
          version="1.0.0"
          fadeMs={FADE_MS}
          onSkip={handleSkipSplash}
        />
      )}
    </>
  );
}

export default App;
