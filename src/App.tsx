import AppRouter from "./navigators/AppRouter";
import SplashPage from "./pages/splash";
import useSplashController from "./hooks/useSplashController";

function App() {
  const { visible, fadeOut, fadeMs, handleSkipSplash } = useSplashController();

  return (
    <>
      <AppRouter />
      {visible && (
        <SplashPage
          fadeOut={fadeOut}
          version="1.0.0"
          fadeMs={fadeMs}
          onSkip={handleSkipSplash}
        />
      )}
    </>
  );
}

export default App;
