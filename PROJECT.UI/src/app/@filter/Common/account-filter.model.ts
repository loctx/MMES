export class AccountFilter {
  currentPage: number = 1;
  pageSize: number = 20;
  keyWord: string = '';
  groupId: string = '';
  state: boolean | string = '';
}

export interface optionsGroup {
  id: string;
  name: string;
}
