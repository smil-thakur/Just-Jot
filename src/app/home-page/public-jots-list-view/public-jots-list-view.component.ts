import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardContent, MatCardActions, MatCardFooter } from "@angular/material/card"
import { JotCardComponent } from '../jot-card/jot-card.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateJotDialogComponent } from '../create-jot-dialog/create-jot-dialog.component';
import { EditJotDialogComponent } from '../edit-jot-dialog/edit-jot-dialog.component';
import "../../storage-methods/Local-storage"
@Component({
  selector: 'app-public-jots-list-view',
  standalone: true,
  imports: [NgFor, MatCard, MatCardHeader, MatCardContent, MatCardActions, MatButton, MatCardFooter, JotCardComponent],
  templateUrl: './public-jots-list-view.component.html',
  styleUrl: './public-jots-list-view.component.scss'
})
export class PublicJotsListViewComponent {
  @Input() jots!: Jot[];

  @Output() Onjotschange: EventEmitter<(Jot[])> = new EventEmitter<Jot[]>();

  @Output() changedJotUUID: EventEmitter<string> = new EventEmitter<string>();

  public editDialog = inject(MatDialog);

  onDeleteClicked(uuid: string) {
    this.jots = this.jots.filter((jot) => jot.uuid !== uuid)
    this.Onjotschange.emit(this.jots)
  }

  onEditClicked(uuid: string) {
    const editDialogRef = this.editDialog.open(EditJotDialogComponent, {
      data: this.jots.find(jot => jot.uuid === uuid)
    })

    editDialogRef.afterClosed().subscribe((data: Jot) => {
      if (data) {
        let newJot = this.jots.find(jot => jot.uuid === uuid);
        if (newJot) {
          newJot.title = data.title;
          newJot.body = data.body;
          this.jots = this.jots.filter((jot) => {
            if (jot.uuid !== uuid) {
              return jot;
            }
            else {
              newJot.dateTime = new Date().toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              })
              return newJot;
            }
          })
          this.Onjotschange.emit(this.jots)
          this.changedJotUUID.emit(newJot.uuid);

        }
      }
    })


  }
}
