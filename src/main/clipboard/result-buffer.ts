let results: string[] = [];

const pushResult = (text: string) => {
  if (text?.trim()) {
    results.push(text);
  }
};

const peekLatestResult = (): string | null => {
  const latestResult = results.length ? results[results.length - 1] : null;

  return latestResult;
};

const clearResults = () => {
  results = [];
};

const getBufferedResultCount = () => results.length;

export { pushResult, peekLatestResult, clearResults, getBufferedResultCount };
