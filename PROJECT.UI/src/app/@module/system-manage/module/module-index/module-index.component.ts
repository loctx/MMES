import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {TreeFlatNode, TreeNode} from 'src/app/models/MD/treeNode.model';
import {ModuleService} from 'src/app/services/AD/module.service';
import {UserService} from 'src/app/services/AD/user.service';
import {ChecklistDatabaseService} from 'src/app/services/Common/checkListDatabase.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: 'app-module-index',
  templateUrl: './module-index.component.html',
  styleUrls: ['./module-index.component.scss'],
  providers: [ChecklistDatabaseService],
})
export class ModuleIndexComponent implements OnInit {
  isCreate: boolean = false;
  isEdit: boolean = false;
  nodeSelected: any;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TreeFlatNode, TreeNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TreeNode, TreeFlatNode>();
  /** A selected parent node to be inserted */
  selectedParent: TreeFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TreeFlatNode>;

  treeFlattener: MatTreeFlattener<TreeNode, TreeFlatNode>;

  dataSource: MatTreeFlatDataSource<TreeNode, TreeFlatNode>;

  /* Drag and drop */
  dragNode: any;
  dragNodeExpandOverWaitTimeMs = 300;
  dragNodeExpandOverNode: any;
  dragNodeExpandOverTime: number = 0;
  dragNodeExpandOverArea: string = '';
  @ViewChild('emptyItem') emptyItem!: ElementRef;
  constructor(private _ms: ModuleService, private _ds: DrawerService, private database: ChecklistDatabaseService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TreeFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    database.dataChange.subscribe((data) => {
      this.dataSource.data = [];
      this.dataSource.data = data;
    });
    console.log(this.dataSource);
  }

  getLevel = (node: TreeFlatNode) => node.level;

  isExpandable = (node: TreeFlatNode) => node.expandable;

  getChildren = (node: TreeNode): TreeNode[] => node.children;

  hasChild = (_: number, _nodeData: TreeFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TreeFlatNode) => _nodeData.name === '';

  nodeForm: any;
  selectId: string = '';

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this._ms.getDataForTree().subscribe(({data}) => {
      this.database.dataChange.next([data]);
    });
  }

  transformer = (node: TreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name ? existingNode : new TreeFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = node.children && node.children.length > 0;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  handleDragStart(event: any, node: any) {
    // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
    event.dataTransfer.setData('foo', 'bar');
    event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
    this.dragNode = node;
    this.treeControl.collapse(node);
  }

  handleDragOver(event: any, node: any) {
    event.preventDefault();

    // Handle node expand
    if (node === this.dragNodeExpandOverNode) {
      if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
        if (new Date().getTime() - this.dragNodeExpandOverTime > this.dragNodeExpandOverWaitTimeMs) {
          this.treeControl.expand(node);
        }
      }
    } else {
      this.dragNodeExpandOverNode = node;
      this.dragNodeExpandOverTime = new Date().getTime();
    }

    // Handle drag area
    const percentageX = event.offsetX / event.target.clientWidth;
    const percentageY = event.offsetY / event.target.clientHeight;
    if (percentageY < 0.25) {
      this.dragNodeExpandOverArea = 'above';
    } else if (percentageY > 0.75) {
      this.dragNodeExpandOverArea = 'below';
    } else {
      this.dragNodeExpandOverArea = 'center';
    }
  }

  handleDrop(event: any, node: any) {
    event.preventDefault();
    if (node !== this.dragNode) {
      let newItem: TreeNode;
      if (this.dragNodeExpandOverArea === 'above') {
        newItem = this.database.copyPasteItemAbove(this.flatNodeMap.get(this.dragNode)!, this.flatNodeMap.get(node)!);
      } else if (this.dragNodeExpandOverArea === 'below') {
        newItem = this.database.copyPasteItemBelow(this.flatNodeMap.get(this.dragNode)!, this.flatNodeMap.get(node)!);
      } else {
        newItem = this.database.copyPasteItem(this.flatNodeMap.get(this.dragNode)!, this.flatNodeMap.get(node)!);
      }
      this.database.deleteItem(this.flatNodeMap.get(this.dragNode)!);
      this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem)!);
    }
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  handleDragEnd(event: any) {
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  clickNode(node: TreeFlatNode, event: Event) {
    this.nodeSelected = node;
    const elements = document.querySelectorAll('*');
    elements.forEach((element) => {
      element.classList.remove('mat-tree-node-selected');
    });

    var ele = event.target as Element;
    ele.classList.add('mat-tree-node-selected');
    var data = this.flatNodeMap.get(node);
    if (data!.id === 'MNU') {
      return;
    }
    this.nodeForm = data!;
    this.selectId = data!.id;
    this.nodeForm.orderNumber = data!.orderNumber;
    this.nodeForm.pid = data!.pid;
    this.nodeForm.rightId = data!.rightId;
    this.nodeForm.icon = data!.icon;
    this.isEdit = true;
    this.isCreate = false;
  }

  cancel() {
    this.isEdit = false;
    this.isCreate = false;
  }

  createModule() {
    this.isEdit = false;
    this.isCreate = true;
    this.nodeForm = new TreeNode();
  }

  submitModule() {
    const parentNode = this.flatNodeMap.get(this.nodeSelected);
    this.nodeForm.id = 'MNU' + (this.database.data[0].children.length + 1);
    this.database.insertItem(parentNode!, this.nodeForm);
    this.treeControl.expand(this.nodeSelected);
    // this.submitModule();
  }

  submitOrderTree() {
    this._ms.UpdateOrderTree(this.database.data).subscribe(
      (data: any): void => {
        this._ds.returnData(data);
        this.loadInit();
        this.database.dataChange.closed = false;
        this.cancel();
      },
      (error: any) => {
        console.log('error: ', error);
      },
    );
  }
}
