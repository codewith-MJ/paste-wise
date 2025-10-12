type ReadBuffer = {
  source: string;
  modeId: number;
  isTranslated: boolean;
};

let lastRead: ReadBuffer | null = null;

const updateReadBuffer = (
  source: string,
  modeId: number,
  isTranslated: boolean,
) => {
  lastRead = { source, modeId, isTranslated };
};

const isDuplicateRead = (
  source: string,
  modeId: number,
  isTranslated: boolean,
) => {
  return (
    lastRead?.source === source &&
    lastRead?.modeId === modeId &&
    lastRead?.isTranslated === isTranslated
  );
};

export { updateReadBuffer, isDuplicateRead };
