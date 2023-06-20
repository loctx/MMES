export interface AccountGroupModel {
  id?: string;
  name?: string;
  notes: string;
  state: boolean;
  createBy?: string;
  updateBy?: string;
  createDate?: string;
  updateDate?: string;
}

export interface ListAccount {
  userName: string;
  fullName: string;
  groupId: string;
  state: boolean;
  accountGroup?: string;
}
