import { Routes } from '@angular/router';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { MatchInsertComponent } from './components/match-insert/match-insert.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { MatchDetailComponent } from './components/match-detail/match-detail.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { BotControllerComponent } from './components/bot-controller/bot-controller.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MatchListComponent },
      { path: 'players', component: PlayerListComponent },
      { path: 'add-matches', component: MatchInsertComponent },
      { path: 'matches', component: MatchListComponent },
      { path: 'matches/:id', component: MatchDetailComponent },
      { path: 'players/:id', component: PlayerDetailComponent },
      { path: 'bot-controller', component: BotControllerComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];