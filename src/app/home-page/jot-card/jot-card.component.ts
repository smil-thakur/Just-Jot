import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatDivider } from "@angular/material/divider"

@Component({
  selector: 'app-jot-card',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardActions, MatCardHeader, MatButton, MatDivider, NgIf, CommonModule],
  templateUrl: './jot-card.component.html',
  styleUrl: './jot-card.component.scss'
})
export class JotCardComponent {
  @Input() jot!: Jot

  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();

  //TODO: implement to upload to cloud from local

  onEditClicked(uuid: string) {
    this.onEdit.emit(uuid);
  }


  onDeleteClicked(uuid: string) {
    this.onDelete.emit(uuid);
  }
}
