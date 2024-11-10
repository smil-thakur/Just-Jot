import { AfterViewInit, Component, inject, model, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from "@angular/material/dialog"
import "../Jot"
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-edit-jot-dialog',
  standalone: true,
  imports: [MatError, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormField, MatInput, MatLabel, MatButton, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-jot-dialog.component.html',
  styleUrl: './edit-jot-dialog.component.scss'
})
export class EditJotDialogComponent {

  readonly dialogRef = inject(MatDialogRef<EditJotDialogComponent>);
  readonly data = inject<Jot>(MAT_DIALOG_DATA);

  private tempTitle = this.data.title.trim().toString();
  private tempBody = this.data.body.trim().toString();

  readonly formTitle: FormControl = new FormControl(this.data.title, [Validators.required, Validators.maxLength(30)])
  readonly formBody: FormControl = new FormControl(this.data.body, [Validators.required, Validators.maxLength(280)])
  titleErrorMessage = signal('');
  bodyErrorMessage = signal('');

  constructor() {

    merge(this.formTitle.statusChanges, this.formTitle.valueChanges, this.formBody.statusChanges, this.formBody.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    this.updateErrorMessage();


  }

  updateErrorMessage() {

    if (this.formTitle.hasError('required')) {
      this.titleErrorMessage.set('You must enter a title');
    } else if (this.formTitle.value == null) {
      this.titleErrorMessage.set('You must enter a title');
    } else if (this.formTitle.hasError("maxlength")) {
      this.titleErrorMessage.set('Title must not exceed 30 characters');
    } else {
      this.titleErrorMessage.set('');
    }

    if (this.formBody.hasError('required')) {
      this.bodyErrorMessage.set('You must have a content');
    } else if (this.formBody.value == null) {
      this.titleErrorMessage.set('You must enter a title');
    } else if (this.formBody.hasError("maxlength")) {
      this.titleErrorMessage.set('Body must not exceed 280 characters');
    } else {
      this.bodyErrorMessage.set('');
    }

  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    if (this.formTitle.value && this.formBody.value) {
      this.data.title = this.formTitle.value;
      this.data.body = this.formBody.value;
      this.dialogRef.close(this.data);
    }
  }

  isNotEdited() {
    return this.tempTitle == this.formTitle.value.trim() && this.tempBody == this.formBody.value.trim();
  }
}
