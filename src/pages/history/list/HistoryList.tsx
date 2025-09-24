import HistoryListItem from "./HistoryListItem";

function HistoryList() {
  return (
    <nav aria-label="History list" className="space-y-3 p-3">
      <HistoryListItem
        id={"1"}
        content={
          "This is a short summary of the copied content. 긴단어도 자연스럽게 줄바꿈되어야 하고, 두 줄을 넘어가면 말줄임 처리됩니다."
        }
        hasTranslated={true}
        mode={"Polite"}
        time={"5 min ago"}
      />
    </nav>
  );
}

export default HistoryList;
