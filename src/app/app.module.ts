import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { NgModule } from '@angular/core';
//setting for angularfire2: see https://github.com/angular/angularfire2
//see also:
//-- https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
//-- https://stackoverflow.com/questions/40856179/custom-authdomain-in-firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
//-- https://www.npmjs.com/package/ng2-scroll-to
import {ScrollToModule} from 'ng2-scroll-to';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


import { AppComponent } from './app.component';

import { FirebasedbService } from './firebaseserv/firebasedb.service';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ResultsComponent } from './results/results.component';
import { AboutComponent } from './about/about.component';
import { NgxElasticlunrModule } from 'ngx-elasticlunr';
import { PlatformComponent } from './platform/platform.component';

const appRoutes: Routes = [
{path: 'platform', component: PlatformComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    SearchFormComponent,
    ResultsComponent,
    AboutComponent,
    PlatformComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    FormsModule,
    MultiselectDropdownModule,
    ScrollToModule.forRoot(),
    NgxElasticlunrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [FirebasedbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
