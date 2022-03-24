import React, { useCallback, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useRecoilState } from 'recoil';
import { TITLE_NAME } from '../App';
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

  const changeItemCategory = (selectedItem: cardtype, title: string) => {
    console.log(selectedItem);
    setList((prev) => {
      return prev.map((e) => {
        console.log(e);
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
    end: (item: cardtype, monitor) => {
      const dropResult: drop | null = monitor.getDropResult();
      console.log(dropResult);
      const { TO_DO, IN_PROGRESS, DONE, NOTE } = TITLE_NAME;
      if (dropResult) {
        switch (dropResult.name) {
          case TO_DO:
            console.log(dropResult);
            changeItemCategory(item, TO_DO);
            break;
          case IN_PROGRESS:
            changeItemCategory(item, IN_PROGRESS);
            break;
          case DONE:
            changeItemCategory(item, DONE);
            break;
          case NOTE:
            changeItemCategory(item, NOTE);
            break;
        }
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
