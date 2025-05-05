import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() showModal: boolean = false;
  @Input() modalTitle: string = '';

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  saveButton() {
    this.save.emit();
  }

  cancelButton() {
    this.cancel.emit();
  }
}
