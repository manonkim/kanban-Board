import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { kanbanListState } from '../recoil';
import './KanbanCreator.scss';

interface cardtype {
  id: number;
  title: string;
  content: string;
  category: string;
  isChecked: boolean;
}
export const KanbanCreator = ({ title }: { title: string }) => {
  const setKanbanList = useSetRecoilState<cardtype[]>(kanbanListState);
  const kanbanList = useRecoilValue<cardtype[]>(kanbanListState);
  const getId: number =
    kanbanList.length > 0 ? kanbanList[kanbanList.length - 1].id + 1 : 0;

  const addCard = useCallback(
    (e) => {
      setKanbanList((prev) => [
        ...prev,
        {
          id: getId,
          title: '',
          content: '',
          category: title,
          isChecked: false,
        },
      ]);
    },
    [getId, setKanbanList, title]
  );

  return (
    <div className="addBtnWrap">
      <button className="cardAddBtn" onClick={addCard}>
        + Add task
      </button>
    </div>
  );
};
