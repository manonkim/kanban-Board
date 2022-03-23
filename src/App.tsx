import { RecoilRoot } from 'recoil';
import { KanbanList } from './components/KanbanList';

function App() {
  return (
    <RecoilRoot>
      <KanbanList />
    </RecoilRoot>
  );
}

export default App;
