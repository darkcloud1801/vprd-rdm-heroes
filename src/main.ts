/**
 * Created by rdm0509 on 7/14/16.
 */

import { provide, PLATFORM_DIRECTIVES, ComponentRef } from "@angular/core";
import { HTTP_PROVIDERS, XHRBackend } from "@angular/http";
import { bootstrap } from "@angular/platform-browser-dynamic";
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "@angular/router";
import { InMemoryBackendService, SEED_DATA } from "angular2-in-memory-web-api";
import { InMemoryDataService } from "heroes/shared";
import { HeroesAppComponent } from "heroes";

bootstrap(<any>HeroesAppComponent, [
    ROUTER_PROVIDERS,
    // provide(APP_BASE_HREF, <Dict>{ useValue: location.pathname }),
    HTTP_PROVIDERS,
    provide(PLATFORM_DIRECTIVES, { useValue: ROUTER_DIRECTIVES, multi: true}),
    provide(XHRBackend, <Dict>{ useClass: InMemoryBackendService }),
    provide(SEED_DATA, <Dict>{ useClass: InMemoryDataService })
]).then((appRef: ComponentRef<any>) => {
    // store a reference to the application injector
    // appInjector(appRef.injector)
    console.log("bootstrapped");
}).catch(error => console.error(error));

