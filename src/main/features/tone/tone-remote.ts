import type { ToneItemUI } from "@/shared/types/tone";
import { getAccessToken } from "@/main/infra/auth/token-store";
import requireEnv from "@/main/utils/require-env";

const fetchMergedToneList = async (): Promise<ToneItemUI[]> => {
  const BACKEND_URL = requireEnv("BACKEND_URL");

  const token = getAccessToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${BACKEND_URL}/tones`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-App-Secret": requireEnv("APP_SECRET"),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET /tones failed: ${res.status} ${text}`);
  }

  return (await res.json()) as ToneItemUI[];
};

export default fetchMergedToneList;
