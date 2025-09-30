import { useEffect, useState } from "react";
import { HistoryItemUI } from "@/shared/types/history";

function useHistoryDetail(selectedId: string | null) {
  const [item, setItem] = useState<HistoryItemUI | null>(null);

  useEffect(() => {
    if (!selectedId) {
      setItem(null);
      return;
    }

    let ignore = false;

    window.api.history
      .get(selectedId)
      .then((response) => {
        if (!ignore) {
          setItem(response);
        }

        if (!response) {
          console.log("데이터가 존재하지 않습니다.");
          setItem(null);
        }
      })
      .catch((error) => {
        if (ignore) {
          return;
        }
        console.error("history detail error", error);
      });

    return () => {
      ignore = true;
    };
  }, [selectedId]);

  return item;
}

export default useHistoryDetail;
