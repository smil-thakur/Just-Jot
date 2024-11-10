import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, authState, User, signOut } from '@angular/fire/auth';
import { MatButton } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [NgIf, MatButton],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {

  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  public showLogoutBtn: boolean = false;

  async logOut() {
    await this.auth.signOut();
    await signOut(this.auth);
  }


  constructor() {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      if (aUser) {
        this.showLogoutBtn = true;
      }
      else {
        this.showLogoutBtn = false;
      }
    })
  }

}
