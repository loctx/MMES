export class TreeNode {
  id: string = '';
  icon: string = '';
  name: string = '';
  orderNumber: number = 0;
  pId: string = '';
  rightId: string = '';
  url: string = '';
  children: TreeNode[] = [];
}

export class TreeFlatNode {
  id: string = '';
  pid: string = '';
  numberOrder: number = 0;
  notes: string = '';
  licenseKey: string = '';
  name: string = '';
  level: number = 0;
  expandable: boolean = false;
}
