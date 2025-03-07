import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent {
  @Input() selectedItem: string | null = null;
  @Output() clearSelection = new EventEmitter<void>();

  clear() {
    this.clearSelection.emit();
  }
}
