import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileAsync = promisify(execFile);

const sendSystemPasteCommand = async (): Promise<{
  ok: boolean;
  errorMessage?: string;
}> => {
  if (process.platform === "darwin") {
    const args = [
      "-e",
      'tell application "System Events" to set frontApp to first application process whose frontmost is true',
      "-e",
      "delay 0.06",
      "-e",
      'tell application "System Events" to tell frontApp to key down command',
      "-e",
      'tell application "System Events" to tell frontApp to key code 9',
      "-e",
      'tell application "System Events" to tell frontApp to key up command',
    ];

    try {
      await execFileAsync("osascript", args);
      return { ok: true };
    } catch (error: any) {
      return {
        ok: false,
        errorMessage: error?.stderr || String(error?.message || error),
      };
    }
  }

  if (process.platform === "win32") {
    const args = [
      "-NoProfile",
      "-WindowStyle",
      "Hidden",
      "-Command",
      [
        "Add-Type -AssemblyName System.Windows.Forms",
        "[System.Windows.Forms.SendKeys]::SendWait('^v')",
      ].join("; "),
    ];

    try {
      await execFileAsync("powershell", args);
      return { ok: true };
    } catch (error: any) {
      return {
        ok: false,
        errorMessage: error?.stderr || String(error?.message || error),
      };
    }
  }

  return { ok: false, errorMessage: "unsupported platform" };
};

export default sendSystemPasteCommand;
