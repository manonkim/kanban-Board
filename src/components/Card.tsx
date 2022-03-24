import React, { useCallback, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useRecoilState } from 'recoil';
import { kanbanListState } from '../recoil';
import './Card.scss';

function Card({ item }: { item: cardtype }) {
  const [list, setList] = useRecoilState(kanbanListState);
  const index = list.findIndex((data) => data === item);
  const ref = useRef<HTMLTextAreaElement>(null);

  const replaceIndex = (list: cardtype[], index: number, data: cardtype) => {
    return [...list.slice(0, index), data, ...list.slice(index + 1)];
  };

  const onCheckbox = () => {
    const newList = replaceIndex(list, index, {
      ...item,
      isChecked: true,
      category: 'Done',
    });
    setList(newList);
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

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '40px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  const deleteItem = () => {
    setList([...list.slice(0, index), ...list.slice(index + 1)]);
  };

  const changeItemColumn = (selectedItem: any, title: any) => {
    console.log(title);
    setList((prev) => {
      return prev.map((e) => {
        return {
          ...e,
          category: e.id === selectedItem.id ? title : e.category,
        };
      });
    });
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'card',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item: any, monitor) => {
      const dropResult: any = monitor.getDropResult();
      if (dropResult) {
        changeItemColumn(item, 'To do');
      } else {
        changeItemColumn(item, 'In progress');
      }
    },
  }));

  return (
    <div
      className="cardWrap"
      ref={dragRef}
      style={{ opacity: isDragging ? '0.3' : '1' }}
    >
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
        onInput={handleResizeHeight}
        ref={ref}
        placeholder="내용을 입력하세요"
        spellCheck="false"
      />

      <img
        className="deleteimg"
        src="images/cancel.png"
        alt="delete"
        onClick={deleteItem}
      />
    </div>
  );
}

export default React.memo(Card);

interface cardtype {
  id: number;
  title: string;
  content: string;
  category: string;
  isChecked: boolean;
}
