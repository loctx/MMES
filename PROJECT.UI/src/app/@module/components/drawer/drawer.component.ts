import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  @Input() formGroup!: FormGroup;
  @Input() title!: string;
  @Input() edit!: boolean;
  @Input() openDrawer!: boolean;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCreate: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  onSubmitForm(): void {
    if(this.edit && this.onEdit) {
      this.onEdit!.emit();
    } else if(this.onCreate) {
      this.onCreate!.emit();
    }
  }

  onCloseDrawer(): void {
    if(this.onClose) {
      this.onClose!.emit();
    }
  }

  ngOnDestroy() {
    this.openDrawer = false;
  }
}
