import LogoBox from "./LogoBox";
import ServiceTitle from "./ServiceTitle";
import LoadingIndicator from "./LoadingIndicator";
import VersionFooter from "./VersionFooter";

type SplashPageProps = {
  fadeOut: boolean;
  version: string;
  fadeMs: number;
};

function SplashPage({
  fadeOut = false,
  version = "1.0.0",
  fadeMs = 300,
}: SplashPageProps) {
  return (
    <main
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity ease-out ${fadeOut ? "pointer-events-none opacity-0" : "opacity-100"}`}
      style={{ transitionDuration: `${fadeMs}ms`, willChange: "opacity" }}
    >
      <section className="flex flex-col items-center">
        <LogoBox />
        <ServiceTitle />
        <LoadingIndicator />
      </section>
      <VersionFooter version={version} />
    </main>
  );
}

export default SplashPage;
