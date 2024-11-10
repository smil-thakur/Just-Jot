import { AfterViewInit, Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from "@angular/material/dialog"
import "../Jot"
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormControl, FormsModule, NgModel, Validators } from '@angular/forms';
import { v4 } from "uuid";
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { Auth, User, user } from '@angular/fire/auth';
import { merge, Subscription } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-jot-dialog',
  standalone: true,
  imports: [MatError, MatSlideToggle, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormField, MatInput, MatLabel, MatButton, FormsModule, ReactiveFormsModule],
  templateUrl: './create-jot-dialog.component.html',
  styleUrl: './create-jot-dialog.component.scss'
})
export class CreateJotDialogComponent {

  readonly dialogRef = inject(MatDialogRef<CreateJotDialogComponent>);
  readonly data = inject<Jot>(MAT_DIALOG_DATA);
  public saveToCloud = true;

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  public isCloudEnabled: boolean = false;

  readonly formTitle = new FormControl(this.data.title == "" ? null : this.data.title, [Validators.required, Validators.maxLength(30)]);
  readonly formBody = new FormControl(this.data.body == "" ? null : this.data.body, [Validators.required, Validators.maxLength(280)]);

  titleErrorMessage = signal('');
  bodyErrorMessage = signal('');


  constructor(public firestore: Firestore) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      if (aUser) {
        this.isCloudEnabled = true;
      }
      else {
        this.saveToCloud = false;

      }
    })
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
      this.bodyErrorMessage.set('Body must not exceed 280 characters');
    } else {
      this.bodyErrorMessage.set('');
    }

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }



  onCancel() {
    this.dialogRef.close();
  }

  onToggleChange() {
  }

  onSubmit() {

    if (this.formTitle.value && this.formBody.value) {
      this.data.title = this.formTitle.value;
      this.data.body = this.formBody.value;
      this.data.saveToCloud = this.saveToCloud;
      this.dialogRef.close(this.data);
    }


  }


}
