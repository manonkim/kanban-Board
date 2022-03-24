import { useRecoilValue } from 'recoil';
import { KanbanList } from './components/KanbanList';
import Card from './components/Card';
import './App.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { kanbanListState } from './recoil';

function App() {
  const kanbanList = useRecoilValue(kanbanListState);
  const cardDataHandler = (cardTitle: string) => {
    return kanbanList
      .filter((data) => data.category === cardTitle)
      .map((item) => <Card key={item.id} item={item} />);
  };

  return (
    <>
      <header>KANBAN BOARD</header>
      <section className="kanbanListContainer">
        <DndProvider backend={HTML5Backend}>
          <KanbanList title="To do">{cardDataHandler('To do')}</KanbanList>
          <KanbanList title="In progress">
            {cardDataHandler('In progress')}
          </KanbanList>
          <KanbanList title="Done">{cardDataHandler('Done')}</KanbanList>
          <KanbanList title="Notes & Reference">
            {cardDataHandler('Notes & Reference')}
          </KanbanList>
        </DndProvider>
      </section>
    </>
  );
}

export default App;

interface cardtype {
  id: number;
  title: string;
  content: string;
  category: string;
  isChecked: boolean;
}
