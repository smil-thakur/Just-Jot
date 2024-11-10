import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input"
import { MatButton } from "@angular/material/button"
import { MatDialog } from '@angular/material/dialog';
import { CreateJotDialogComponent } from '../create-jot-dialog/create-jot-dialog.component';
import "../Jot"
import { v4 } from 'uuid';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-create-jot',
  standalone: true,
  imports: [MatFormField, MatInput, MatLabel, MatButton, ReactiveFormsModule],
  templateUrl: './create-jot.component.html',
  styleUrl: './create-jot.component.scss'
})
export class CreateJotComponent {
  readonly createJotDialog = inject(MatDialog);
  public jotData: Jot = { uuid: "", title: "", body: "", dateTime: "", saveToCloud: false };

  @Output() data: EventEmitter<Jot> = new EventEmitter<Jot>();
  @Output() onSearchKeywordChange: EventEmitter<string> = new EventEmitter<string>();

  readonly formSearch: FormControl = new FormControl("");

  constructor() {
    this.formSearch.valueChanges
      .pipe(debounceTime(0))
      .subscribe((keyword) => {
        this.onSearchKeywordChange.emit(keyword);
      });
  }

  openCreateDialog() {
    this.jotData = {
      uuid: v4(), title: "", body: "", dateTime: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      ,
      saveToCloud: false
    }
    const createDialogRef = this.createJotDialog.open(CreateJotDialogComponent, {
      data: this.jotData
    });



    createDialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        this.jotData = result;
        this.data.emit(this.jotData);
      }
    })
  }

}
