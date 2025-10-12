let results: string[] = [];
const MAX_RESULTS = 50;

const pushResult = (text: string) => {
  const value = text?.trim();
  if (!value) return;

  results.push(value);
  if (results.length > MAX_RESULTS) {
    results.shift();
  }
};

const peekLatestResult = (): string | null => {
  return results.length ? results[results.length - 1] : null;
};

const popLatestResult = (): string | null => {
  return results.length ? (results.pop() ?? null) : null;
};

const clearResults = () => {
  results = [];
};

const getBufferedResultCount = () => results.length;

export {
  pushResult,
  peekLatestResult,
  clearResults,
  popLatestResult,
  getBufferedResultCount,
};
