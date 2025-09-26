import registerHistoryIpc from "./history";
import registerShortcutIpc from "./shortcut";
import registerToneIpc from "./tone";

function registerAllIpc() {
  registerHistoryIpc();
  registerToneIpc();
  registerShortcutIpc();
}

export default registerAllIpc;
