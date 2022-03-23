import { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { kanbanListState } from '../recoil';
import './KanbanCreator.scss';

interface cardtype {
  id: number;
  text: string;
  isChecked: boolean;
}
export const KanbanCreator = () => {
  const [inputValue, setInputValue] = useState('');

  const setKanbanList = useSetRecoilState<cardtype[]>(kanbanListState);
  const kanbanList = useRecoilValue<cardtype[]>(kanbanListState);

  const getId: number =
    kanbanList.length > 0 ? kanbanList[kanbanList.length - 1].id + 1 : 0;

  const addCard = useCallback(() => {
    setKanbanList((prev) => [
      ...prev,
      {
        id: getId,
        text: inputValue,
        isChecked: false,
      },
    ]);
    setInputValue('');
  }, [getId, inputValue, setKanbanList]);

  return (
    <div className="addBtnWrap">
      <button className="cardAddBtn" onClick={addCard}>
        + Add task
      </button>
    </div>
  );
};
