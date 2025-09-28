import { useEffect } from "react";
import LogoBox from "./LogoBox";
import MainTitle from "./MainTitle";
import LoadingIndicator from "./LoadingIndicator";
import Footer from "./Footer";

type SplashPageProps = {
  fadeOut: boolean;
  version: string;
  fadeMs: number;
  onSkip: () => void;
};

function SplashPage({
  fadeOut = false,
  version = "1.0.0",
  fadeMs = 300,
  onSkip,
}: SplashPageProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Space") {
        onSkip();
      }
    };
    const handleClick = () => {
      onSkip();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [onSkip]);

  return (
    <main
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity ease-out ${fadeOut ? "pointer-events-none opacity-0" : "opacity-100"}`}
      style={{ transitionDuration: `${fadeMs}ms`, willChange: "opacity" }}
    >
      <section className="flex flex-col items-center">
        <LogoBox />
        <MainTitle />
        <LoadingIndicator />
      </section>
      <Footer version={version} />
    </main>
  );
}

export default SplashPage;
