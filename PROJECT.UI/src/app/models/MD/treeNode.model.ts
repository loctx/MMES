export class TreeNode {
  id!: string;
  name!: string;
  pid!: string;
  rightId!: string;
  orderNumber!: number;
  url!: string;
  icon!: string;
  children!: TreeNode[];
}

export class TreeFlatNode {
  id!: string;
  name!: string;
  pid!: string;
  rightId!: string;
  orderNumber!: number;
  url!: string;
  icon!: string;
  level!: number;
  expandable!: boolean;
}
