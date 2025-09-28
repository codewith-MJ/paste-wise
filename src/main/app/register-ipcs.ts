import registerHistoryIpc from "../features/history/history-ipc";
import registerShortcutIpc from "../features/shortcut/shortcut-ipc";
import registerToneIpc from "../features/tone/tone-ipc";

const registerAllIpc = () => {
  registerHistoryIpc();
  registerToneIpc();
  registerShortcutIpc();
};

export default registerAllIpc;
