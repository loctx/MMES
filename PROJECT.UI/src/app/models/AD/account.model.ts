export interface AdAccount {
  userName: string;
  fullName: string;
  groupId: string;
  state: boolean;
  accountGroup: AdAccountGroup;
}
export interface AdAccountCreate {
  userName: string;
  fullName: string;
  groupId: string;
  state: boolean;
}

export interface AdAccountGroup {
  id: string;
  name: string;
  state: boolean;
  notes: string;
  listAccount: AdAccount[];
}
