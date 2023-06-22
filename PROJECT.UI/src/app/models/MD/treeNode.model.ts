export class TreeNode {
  id!: string;
  pid!: string;
  name!: string;
  numberOrder!: number;
  notes!: string;
  licenseKey!: string;
  children!: TreeNode[];
}

export class TreeFlatNode {
  id!: string;
  pid!: string;
  numberOrder!: number;
  notes!: string;
  licenseKey!: string;
  name!: string;
  level!: number;
  expandable!: boolean;
}
