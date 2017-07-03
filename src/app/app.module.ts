import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//setting for angularfire2: see https://github.com/angular/angularfire2
//see also:
//-- https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
//-- https://stackoverflow.com/questions/40856179/custom-authdomain-in-firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { FirebasedbService } from './firebaseserv/firebasedb.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
  ],
  providers: [FirebasedbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
