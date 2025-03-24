import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reusable-select',
  templateUrl: './reusable-select.component.html',
  styleUrls: ['./reusable-select.component.scss'],
})
export class ReusableSelectComponent {
  @Output() orderChange = new EventEmitter<string>();

  onOrderChange(event: any): void {
    this.orderChange.emit(event.target.value);
  }
}
