type ReadBuffer = {
  source: string;
  modeId: number;
};

let lastRead: ReadBuffer | null = null;

const updateReadBuffer = (source: string, modeId: number) => {
  lastRead = { source, modeId };
};

const isDuplicateRead = (source: string, modeId: number) => {
  return lastRead?.source === source && lastRead?.modeId === modeId;
};

export { updateReadBuffer, isDuplicateRead };
