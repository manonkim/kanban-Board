import { atom } from 'recoil';

interface cardtype {
  id: number;
  text: string;
  isChecked: boolean;
}
export const kanbanListState = atom<cardtype[]>({
  key: 'kanbanState',
  default: [],
});
