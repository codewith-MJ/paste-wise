import { useEffect, useState } from "react";
import AppRouter from "./navigators/AppRouter";
import SplashPage from "./pages/splash";

const SHOW_MS = 2500;
const FADE_MS = 300;

function App() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(
      () => {
        setFadeOut(true);
      },
      Math.max(0, SHOW_MS - FADE_MS),
    );
    const navTimer = setTimeout(() => {
      setVisible(false);
    }, SHOW_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, []);

  return (
    <>
      <AppRouter />
      {visible && (
        <SplashPage fadeOut={fadeOut} version="1.0.0" fadeMs={FADE_MS} />
      )}
    </>
  );
}

export default App;
