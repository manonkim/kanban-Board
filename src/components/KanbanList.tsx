import { useRecoilValue } from 'recoil';
import { kanbanListState } from '../recoil';
import { KanbanCreator } from './KanbanCreator';
import Card from './Card';
import './KanbanList.scss';
import { useDrop } from 'react-dnd';

export const KanbanList = ({
  title,
  children,
}: {
  title: string;
  children: any;
}) => {
  // const kanbanList = useRecoilValue(kanbanListState);
  // const cardData = kanbanList.filter((data) => data.category === title);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'card',
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <>
      <div className="kanbanListWrap" ref={drop}>
        <div className="kanbanTitle">{title}</div>
        {children}
        <KanbanCreator title={title} />
      </div>
    </>
  );
};
