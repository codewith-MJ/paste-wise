import {
  pushResult,
  popLatestResult,
} from "@/main/features/clipboard/result-buffer";

const safeBufferPush = async <T>(value: string, work: () => Promise<T>) => {
  pushResult(value);
  try {
    return await work();
  } catch (error) {
    popLatestResult();
    throw error;
  }
};

export default safeBufferPush;
