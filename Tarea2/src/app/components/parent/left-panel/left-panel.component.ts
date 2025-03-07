import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent {
  @Input() items: string[] = [];
  @Input() selectedItem: string | null = null;
  @Output() itemSelected = new EventEmitter<string>();

  selectItem(item: string) {
    this.itemSelected.emit(item);
  }
}
