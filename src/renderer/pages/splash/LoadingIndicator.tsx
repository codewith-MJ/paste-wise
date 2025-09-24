import { SyncLoader } from "react-spinners";

const LOADER_COLOR = "#98d8ff";
const LOADER_SIZE = 10;
const LOADER_SPEED = 0.4;

function LoadingIndicator() {
  return (
    <div className="mt-10">
      <SyncLoader
        color={LOADER_COLOR}
        size={LOADER_SIZE}
        speedMultiplier={LOADER_SPEED}
      />
    </div>
  );
}

export default LoadingIndicator;
