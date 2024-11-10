import { isPlatformServer, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardContent, MatCardActions, MatCardFooter } from "@angular/material/card"
import { JotCardComponent } from '../jot-card/jot-card.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateJotDialogComponent } from '../create-jot-dialog/create-jot-dialog.component';
import { EditJotDialogComponent } from '../edit-jot-dialog/edit-jot-dialog.component';
import "../../storage-methods/Local-storage"
import { getAuth, GoogleAuthProvider, signInWithPopup, authState, Auth, User } from '@angular/fire/auth';
import { trace } from '@angular/fire/compat/performance';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cloud-jots-list-view',
  standalone: true,
  imports: [NgIf, NgFor, MatCard, MatCardHeader, MatCardContent, MatCardActions, MatButton, MatCardFooter, JotCardComponent],
  templateUrl: './cloud-jots-list-view.component.html',
  styleUrl: './cloud-jots-list-view.component.scss'
})
export class CloudJotsListViewComponent {
  userDisposable: any;

  public showLoginButton: boolean = true;
  public showLogoutButton: boolean = false;

  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;


  constructor() {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      if (aUser) {
        this.showLoginButton = false;
        this.showLogoutButton = true;
      }
      else {
        this.showLoginButton = true;
        this.showLogoutButton = false;
      }
    })
  }

  async login() {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
  }

  async logout() {
    await this.auth.signOut();
  }

  @Input() jots!: Jot[];

  @Output() OnjotDelete: EventEmitter<(string)> = new EventEmitter<string>();

  @Output() changedJotData: EventEmitter<Jot> = new EventEmitter<Jot>();

  public editDialog = inject(MatDialog);

  onDeleteClicked(uuid: string) {
    this.jots = this.jots.filter((jot) => jot.uuid !== uuid)
    this.OnjotDelete.emit(uuid)
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
          this.changedJotData.emit(newJot);
        }
      }

    })



  }
}
