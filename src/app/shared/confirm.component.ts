import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <div class="modal">
      <div class="modal-content">
        <p [innerHTML]="title"></p>
        <div class="actions">
          <button class="primary-button" (click)="confirmAction(true)">
            Yes
          </button>
          <button class="warn-button" (click)="confirmAction(false)">No</button>
        </div>
      </div>
    </div>
  `,
  styles: `
  .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  width: 50%;
  padding: 50px 50px 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 20px;
  text-align: center;
  transform: translate(-50%, -50%);
}

.actions {
  text-align: center;
  margin-top: 20px;
}

button {
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 40px;
  cursor: pointer;
  margin-right: 10px;
}

button:last-child {
  margin-right: 0;
}
  `,
})
export class ConfirmComponent {
  @Input() title = '';
  @Output() confirm = new EventEmitter<boolean>();

  confirmAction(confirm: boolean) {
    this.confirm.emit(confirm);
  }
}
