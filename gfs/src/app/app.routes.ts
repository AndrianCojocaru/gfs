import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { loggedInGuard } from './logged-in.guard';
import { StudentiComponent } from './studenti/studenti.component';
import { PianiFormativiComponent } from './piani-formativi/piani-formativi.component';
import { MainComponent } from './main/main.component';
import { LogsComponent } from './logs/logs.component';
import { loggedOutGuard } from './logged-out.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent, canActivate: [loggedInGuard], canDeactivate: [loggedOutGuard], children: [
        { path: 'studenti', component: StudentiComponent },
        { path: 'piani-formativi', component: PianiFormativiComponent },
        { path: 'logs', component: LogsComponent },
        { path: '', redirectTo: 'studenti', pathMatch: 'full' }
    ] },
    { path: '**', redirectTo: 'main' },
];