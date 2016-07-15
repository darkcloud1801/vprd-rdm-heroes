/**
 * Created by rdm0509 on 7/14/16.
 */
import { provideRouter, RouterConfig }  from '@angular/router';
import { HeroesAppComponent } from './heroes';
import { DashboardComponent } from './dashboard';
import { HeroDetailComponent } from './detail';


const routes: RouterConfig = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'heroes', component: HeroesAppComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: "/detail/:id", component: HeroDetailComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];