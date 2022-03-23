import { useRecoilValue } from 'recoil';
import { kanbanListState } from '../recoil';
import { KanbanCreator } from './KanbanCreator';
import { Card } from './Card';
import './KanbanList.scss';

export const KanbanList = ({ title }: { title: string }) => {
  const kanbanList = useRecoilValue(kanbanListState);
  const cardData = kanbanList.filter((data) => data.category === title);

  return (
    <>
      <div className="kanbanListWrap">
        <div className="kanbanTitle">{title}</div>
        {cardData.map((data: cardtype) => (
          <Card key={data.id} item={data} />
        ))}
        <KanbanCreator title={title} />
      </div>
    </>
  );
};

interface cardtype {
  id: number;
  title: string;
  content: string;
  category: string;
  isChecked: boolean;
}
