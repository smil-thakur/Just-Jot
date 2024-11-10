import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { CreateJotComponent } from '../home-page/create-jot/create-jot.component';
import { PublicJotsListViewComponent } from '../home-page/public-jots-list-view/public-jots-list-view.component';
import { v4 } from 'uuid';
import { LocalStorageMethods } from '../storage-methods/Local-storage';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { CloudStorageMethods } from '../storage-methods/cloud-storage';
import { MatProgressSpinner } from "@angular/material/progress-spinner"
import { NgIf } from '@angular/common';
import { CloudJotsListViewComponent } from '../home-page/cloud-jots-list-view/cloud-jots-list-view.component';
import { MatDivider } from '@angular/material/divider';
import { Auth, user, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { SearchPageComponent } from '../home-page/search-page/search-page.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SearchPageComponent, MatDivider, MenuBarComponent, CreateJotComponent, PublicJotsListViewComponent, MatProgressSpinner, NgIf, CloudJotsListViewComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])]
})
export class MainPageComponent implements OnInit, AfterViewInit {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  private currentUser: User | null = null;
  public isSearching: boolean = false;

  constructor(public firestore: Firestore) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      this.currentUser = aUser;
      this.fetchCloudJots()
    })
  }

  public isCloudSyncOn: boolean = false;

  public jots: Jot[] = []
  public cloudJots: Jot[] = []

  public jotsSearched: Jot[] = []
  public cloudJotsSearched: Jot[] = []

  parseDate(dateString: string): Date {
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute);
  }


  async fetchCloudJots() {
    if (this.currentUser) {
      this.isCloudSyncOn = true;

      this.cloudJots = await CloudStorageMethods.getCloudJots(this.firestore, this.currentUser.uid);
      this.cloudJots = this.cloudJots.sort((a, b) => {
        const dateA = this.parseDate(a.dateTime);
        const dateB = this.parseDate(b.dateTime);
        return dateB.getTime() - dateA.getTime(); // Descending order
      });
      this.isCloudSyncOn = false;
    }
  }

  async ngAfterViewInit() {
    if (this.currentUser) {
      await this.fetchCloudJots();
    }
  }

  onSearch(keyword: string) {
    if (keyword !== "") {
      this.isSearching = true;

      const trimmedKeyword = keyword.trim().toLowerCase();
      this.jotsSearched = this.jots.filter(jot =>
        jot.body.toLowerCase().includes(trimmedKeyword) ||
        jot.title.toLowerCase().includes(trimmedKeyword)
      );


      this.cloudJotsSearched = this.cloudJots.filter(jot =>
        jot.body.toLowerCase().includes(trimmedKeyword) ||
        jot.title.toLowerCase().includes(trimmedKeyword)
      );
    }
    else {
      this.isSearching = false;
      this.jotsSearched = [];
      this.cloudJotsSearched = [];
    }
  }



  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }



  ngOnInit(): void {
    this.jots = LocalStorageMethods.getLocally();
    this.jots = this.jots.sort((a, b) => {
      const dateA = this.parseDate(a.dateTime);
      const dateB = this.parseDate(b.dateTime);
      return dateB.getTime() - dateA.getTime(); // Descending order
    });
  }

  async onJotDataReceived(data: Jot) {
    if (data.saveToCloud === null || data.saveToCloud === false) {
      this.jots.push(data);
      LocalStorageMethods.saveLocally(this.jots);
      this.jots = this.jots.sort((a, b) => {
        const dateA = this.parseDate(a.dateTime);
        const dateB = this.parseDate(b.dateTime);
        return dateB.getTime() - dateA.getTime(); // Descending order
      });
    }
    else {
      if (this.currentUser) {
        await CloudStorageMethods.saveToCloudMethod(this.currentUser.uid, this.firestore, data.title, data.dateTime, data.body, data.uuid);
        await this.fetchCloudJots();
        this.cloudJots = this.cloudJots.sort((a, b) => {
          const dateA = this.parseDate(a.dateTime);
          const dateB = this.parseDate(b.dateTime);
          return dateB.getTime() - dateA.getTime(); // Descending order
        });
      }
    }

  }



  changedJotUUID(value: string) {
  }


  onChangedJotsRecieved(newJots: Jot[]) {
    this.jots = newJots.sort((a, b) => {
      const dateA = this.parseDate(a.dateTime);
      const dateB = this.parseDate(b.dateTime);
      return dateB.getTime() - dateA.getTime(); // Descending order
    });
    LocalStorageMethods.saveLocally(this.jots);
  }

  async onCloudJotDelete(uuid: string) {
    if (this.currentUser) {
      await CloudStorageMethods.deleteCloudJot(this.firestore, uuid, this.currentUser.uid);
    }
  }

  async onChangedCloudJotData(newJot: Jot) {
    if (this.currentUser) {
      await CloudStorageMethods.updateCloudJot(this.firestore, newJot, this.currentUser.uid);
      await this.fetchCloudJots();
      this.cloudJots = this.cloudJots.sort((a, b) => {
        const dateA = this.parseDate(a.dateTime);
        const dateB = this.parseDate(b.dateTime);
        return dateB.getTime() - dateA.getTime(); // Descending order
      });
    }
  }

}

