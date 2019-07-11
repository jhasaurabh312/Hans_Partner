import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindMatchmakerComponent } from './pages/find-matchmaker/find-matchmaker.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { MatchmakerProfileComponent } from './pages/matchmaker-profile/matchmaker-profile.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { EducationalDetailsComponent } from './pages/educational-details/educational-details.component';
import { SocialDetailsComponent } from './pages/social-details/social-details.component';
import { ClientFamilyComponent } from './pages/client-family/client-family.component';
import { ClientPreferencesComponent } from './pages/client-preferences/client-preferences.component';

const routes: Routes = [
    { path: '', component: FindMatchmakerComponent, pathMatch : 'full'},
    { path : 'subscribe' , component : SubscribeComponent},
    { path : 'matchmaker-profile', component: MatchmakerProfileComponent},
    { path : 'personal-details', component: PersonalDetailsComponent},
    { path : 'educational-details', component: EducationalDetailsComponent},
    { path : 'social-details', component: SocialDetailsComponent},
    { path : 'client-family', component: ClientFamilyComponent},
    { path : 'client-preferences', component: ClientPreferencesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
