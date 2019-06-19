import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindMatchmakerComponent } from './pages/find-matchmaker/find-matchmaker.component';
import { RegisterComponent } from './pages/register/register.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { MatchmakerProfileComponent } from './pages/matchmaker-profile/matchmaker-profile.component';

const routes: Routes = [
    { path: '', component: FindMatchmakerComponent, pathMatch : 'full'},
    { path : 'register', component : RegisterComponent},
    { path : 'subscribe' , component : SubscribeComponent},
    { path : 'matchmaker-profile', component: MatchmakerProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
