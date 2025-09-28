import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileAsync = promisify(execFile);

const sendSystemCopyKeystroke = async (): Promise<{
  ok: boolean;
  errorMessage?: string;
}> => {
  const platform = process.platform;

  if (platform === "darwin") {
    const args1 = [
      "-e",
      'tell application "System Events" to key up option',
      "-e",
      'tell application "System Events" to key up shift',
      "-e",
      'tell application "System Events" to key up control',
      "-e",
      "delay 0.02",
      "-e",
      'tell application "System Events" to key code 8 using {command down}',
    ];

    try {
      await execFileAsync("osascript", args1, { timeout: 2000 });
      return { ok: true };
    } catch (e1: any) {
      const args2 = [
        "-e",
        'tell application "System Events" to keystroke "c" using {command down}',
      ];
      try {
        await execFileAsync("osascript", args2, { timeout: 2000 });
        return { ok: true };
      } catch (e2: any) {
        return {
          ok: false,
          errorMessage:
            e2?.stderr ||
            e1?.stderr ||
            String(e2?.message || e1 || "unknown error"),
        };
      }
    }
  }

  if (platform === "win32") {
    const psCommand = [
      "Add-Type -AssemblyName System.Windows.Forms;",
      "$sig=@/'[DllImport(\"user32.dll\")] public static extern void keybd_event(byte bVk, byte bScan, int dwFlags, int dwExtraInfo);'@/; Add-Type -MemberDefinition $sig -Name K -Namespace U;",
      "[U.K]::keybd_event(0x12,0,0x0002,0); [U.K]::keybd_event(0x10,0,0x0002,0); [U.K]::keybd_event(0x11,0,0x0002,0);",
      "[System.Windows.Forms.SendKeys]::SendWait('^c');",
    ].join(" ");

    try {
      await execFileAsync(
        "powershell",
        ["-NoProfile", "-WindowStyle", "Hidden", "-Command", psCommand],
        {
          timeout: 2000,
        },
      );
      return { ok: true };
    } catch (e: any) {
      return { ok: false, errorMessage: e?.stderr || String(e?.message || e) };
    }
  }

  return { ok: false, errorMessage: "unsupported platform" };
};

export default sendSystemCopyKeystroke;
