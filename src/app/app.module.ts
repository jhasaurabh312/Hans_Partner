import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FindMatchmakerComponent } from './pages/find-matchmaker/find-matchmaker.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatchmakerProfileComponent } from './pages/matchmaker-profile/matchmaker-profile.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import {NgbModule,NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
// import { AdListingComponent } from './ad-listing/ad-listing.component';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireFunctionsModule } from '@angular/fire/functions';
// import {
//   MatButtonModule,
//   MatCheckboxModule,
//   MatInputModule,
//   MatSelectModule,
//   MatDatepickerModule,
//   MatNativeDateModule
//  } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FindMatchmakerComponent,
    RegisterComponent,
    MatchmakerProfileComponent,
    SubscribeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule, NgbAlertModule,
    MatDialogModule
    // HttpClient,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireAuthModule,
    // AngularFireStorageModule,
    // AngularFirestoreModule,
    // AngularFireDatabaseModule,
    // AngularFireFunctionsModule,
    
  ],
  providers: [
    HttpClient,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})


export class AppModule{

}