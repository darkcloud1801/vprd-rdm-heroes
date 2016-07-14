/**
 * Created by rdm0509 on 7/14/16.
 */
import { provideRouter, RouterConfig }  from '@angular/router';
import { HeroesAppComponent } from './heroes';


const routes: RouterConfig = [
    {
        path: 'heroes',
        component: HeroesAppComponent
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];