import { RecoilRoot } from 'recoil';
import { KanbanList } from './components/KanbanList';
import './App.scss';

function App() {
  return (
    <RecoilRoot>
      <header>KANBAN BOARD</header>
      <section className="kanbanListContainer">
        <KanbanList title="To do" />
        <KanbanList title="In progress" />
        <KanbanList title="Done" />
        <KanbanList title="Notes & Reference" />
      </section>
    </RecoilRoot>
  );
}

export default App;
