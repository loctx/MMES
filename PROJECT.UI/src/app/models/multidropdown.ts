export interface Item {
  uuid?: string;
  id: number | null;
  name: string; // display
  checked?: boolean; // display ui, checked
  visible?: boolean; // display ui
  title?: string; // for code
}
