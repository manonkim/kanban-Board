import { atom } from 'recoil';

interface cardtype {
  id: number;
  title: string;
  content: string;
  category: string;
  isChecked: boolean;
}
export const kanbanListState = atom<cardtype[]>({
  key: 'kanbanState',
  default: [],
});
