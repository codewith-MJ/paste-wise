import registerHistoryIpc from "./history";
import registerToneIpc from "./tone";

function registerAllIpc() {
  registerHistoryIpc();
  registerToneIpc();
}

export default registerAllIpc;
