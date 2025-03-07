import { Component } from '@angular/core';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [LeftPanelComponent, RightPanelComponent, CommonModule],
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  items: string[] = [
    "El señor de los anillos",
    "Harry Potter",
    "Cien años de soledad",
    "El principito",
    "1984"
  ];
  selectedItem: string | null = null;

  selectItem(item: string) {
    this.selectedItem = item;
  }

  clearSelection() {
    this.selectedItem = null;
  }
}
