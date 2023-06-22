import { Component, Injectable, OnInit } from '@angular/core';
import { AccountGroupService } from 'src/app/services/AD/account-group.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { utils } from 'src/app/utils/utils';
import { DrawerService } from 'src/app/services/Common/drawer.service';
import { AccountGroupModel } from 'src/app/models/AD/account-group.model';
import { rightOfGroup } from 'src/app/models/AD/account-group.model';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';

export class TodoItemFlatNode {
  label: string = '';
  level: number = 0;
  expandable: boolean = true;
  id: number = 0;
  isChecked: boolean = true;
}

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<rightOfGroup[]>([]);

  get data(): rightOfGroup[] {
    return this.dataChange.value;
  }

  constructor() {}

  buildFileTree(obj: { [key: string]: any }, level: number): rightOfGroup[] {
    return Object.keys(obj).reduce<rightOfGroup[]>((accumulator, key) => {
      const item = obj[key];
      const node = new rightOfGroup();
      node.name = obj[key].name;
      node.id = obj[key].id;
      node.isChecked = obj[key].isChecked;
      if (item != null) {
        if (typeof item === 'object' && item.children != undefined) {
          node.children = this.buildFileTree(item.children, level + 1);
        } else {
          node.name = item.name;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

@Component({
  selector: 'app-account-group-edit',
  templateUrl: './account-group-edit.component.html',
  styleUrls: ['./account-group-edit.component.scss'],
  providers: [ChecklistDatabase],
})
export class AccountGroupEditComponent implements OnInit {
  flatNodeMap = new Map<TodoItemFlatNode, rightOfGroup>();
  nestedNodeMap = new Map<rightOfGroup, TodoItemFlatNode>();
  selectedParent: TodoItemFlatNode | null = null;
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<rightOfGroup, TodoItemFlatNode>;
  dataSource: MatTreeFlatDataSource<rightOfGroup, TodoItemFlatNode>;
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true);
  accountGroupForm: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  notes: string = '';
  state: boolean | null = null;
  detailData:AccountGroupModel = {};
  currentTab:number = 1;

  constructor(
    private _service: AccountGroupService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private database: ChecklistDatabase,
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
      setTimeout(() => {
        for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
          if (this.treeControl.dataNodes[i].isChecked) {
            this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
          }
          if (this.treeControl.dataNodes[i].level < 1) {
            this.treeControl.expand(this.treeControl.dataNodes[i]);
          }
        }
      }, 0);
    });
    this.accountGroupForm = this._fb.group({
      name: ['', [Validators.required, this.utils.trimSpace]],
      notes: '',
      state: '',
    });
  }

  changeTab(tab:number) {
    this.currentTab = tab;
    this.drawerService.returnData({
      type: 'tab',
      tab: tab
    });
  }

  ngOnInit() {
    this.getDetail();
    this.accountGroupForm?.get('name')?.setValue(this.name);
    this.accountGroupForm?.get('notes')?.setValue(this.notes);
    this.accountGroupForm?.get('state')?.setValue(this.state || false);
  }

  close() {
    this.drawerService.close();
    this.accountGroupForm?.get('name')?.setValue('');
    this.accountGroupForm?.get('notes')?.setValue('');
    this.accountGroupForm?.get('state')?.setValue(true);
    this.drawerService.returnData({
      type: 'tab',
      tab: 1
    });
  }

  get f() {
    return this.accountGroupForm.controls;
  }

  getDetail() {
    this._service.GetDetail(this.id, false).subscribe(
      ({ data }) => {
        this.detailData = data;
        this.database.dataChange.next([data?.treeRight]);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  onEdit() {
    this.submitted = true;
    if (this.accountGroupForm.invalid) {
      return;
    }
    const data = this.checklistSelection.selected.map((element: any) => {
      return {
        rightId: element?.id,
      };
    });
    this._service
      .Update(
        {
          id: this.id,
          name: this.accountGroupForm.value.name.trim(),
          notes: this.accountGroupForm.value.notes.trim(),
          state: this.accountGroupForm.value.state,
          listAccountGroupRight: data
        },
        false
      )
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: rightOfGroup): rightOfGroup[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  transformer = (node: rightOfGroup, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.label === node.name
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.label = node.name;
    flatNode.level = level;
    flatNode.id = node.id;
    flatNode.isChecked = node.isChecked;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    descendants.some((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    node.isChecked ? (node.isChecked = true) : (node.isChecked = false);
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}
