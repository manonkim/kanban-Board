import React, { useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { kanbanListState } from '../recoil';
import './Card.scss';

interface cardtype {
  id: number;
  title: string;
  content: string;
  category: string;
  isChecked: boolean;
}

export const Card = ({ item }: { item: cardtype }) => {
  const [list, setList] = useRecoilState(kanbanListState);
  const index = list.findIndex((data) => data === item);
  const ref = useRef<HTMLTextAreaElement>(null);

  const replaceIndex = (list: cardtype[], index: number, data: cardtype) => {
    return [...list.slice(0, index), data, ...list.slice(index + 1)];
  };

  const editTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newList = replaceIndex(list, index, {
      ...item,
      title: e.target.value,
    });
    setList(newList);
  };

  const editText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newList = replaceIndex(list, index, {
      ...item,
      content: e.target.value,
    });
    setList(newList);
  };

  const onCheckbox = () => {
    const newList = replaceIndex(list, index, {
      ...item,
      isChecked: !item.isChecked,
    });
    setList(newList);
  };

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '40px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  const deleteItem = () => {
    setList(list.filter((data: cardtype) => data.id !== index));
  };

  return (
    <div className="cardWrap">
      <span className="titleWrap">
        <input type="checkbox" checked={item.isChecked} onChange={onCheckbox} />
        <input
          className="cardTitle"
          type="text"
          value={item.title}
          onChange={editTitle}
          placeholder="제목을 입력하세요"
        />
      </span>
      <textarea
        className="cardContent"
        value={item.content}
        onChange={editText}
        placeholder="내용을 입력하세요"
        ref={ref}
        onInput={handleResizeHeight}
      />
      <img
        className="deleteimg"
        src="images/cancel.png"
        alt="delete"
        onClick={deleteItem}
      />
    </div>
  );
};
