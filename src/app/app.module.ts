import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FindMatchmakerComponent } from './pages/find-matchmaker/find-matchmaker.component';
import { MatchmakerProfileComponent } from './pages/matchmaker-profile/matchmaker-profile.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import {NgbModule,NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { EducationalDetailsComponent } from './pages/educational-details/educational-details.component';
import { SocialDetailsComponent } from './pages/social-details/social-details.component';
import { ClientFamilyComponent } from './pages/client-family/client-family.component';
import { ClientPreferencesComponent } from './pages/client-preferences/client-preferences.component';
// import { AdListingComponent } from './ad-listing/ad-listing.component';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireFunctionsModule } from '@angular/fire/functions';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule
 } from '@angular/material';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";


@NgModule({
  declarations: [
    AppComponent,
    FindMatchmakerComponent,
    MatchmakerProfileComponent,
    SubscribeComponent,
    PersonalDetailsComponent,
    EducationalDetailsComponent,
    SocialDetailsComponent,
    ClientFamilyComponent,
    ClientPreferencesComponent,
    
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
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    AgmCoreModule.forRoot(
        {     apiKey: 'AIzaSyDYzOj_e7CSYYRW36a4K52O1OjR7rvEN9E',
                  libraries: ['places']
                  }),
    MatGoogleMapsAutocompleteModule.forRoot(),
    GooglePlaceModule,

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