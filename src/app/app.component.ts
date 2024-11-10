import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainPageComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [

  ],
})
export class AppComponent implements OnInit {
  title = 'justJot';


  ngOnInit(): void {

  }
}
