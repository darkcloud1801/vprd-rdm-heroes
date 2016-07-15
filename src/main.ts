/**
 * Created by rdm0509 on 7/14/16.
 */

import { ComponentRef } from "@angular/core";
import { HTTP_PROVIDERS, XHRBackend } from "@angular/http";
import { bootstrap } from "@angular/platform-browser-dynamic";
import { InMemoryBackendService, SEED_DATA } from "angular2-in-memory-web-api";
import { InMemoryDataService } from "heroes/shared";
import { HeroesAppComponent, appRouterProviders } from "heroes";

bootstrap(<any>HeroesAppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    // provide(PLATFORM_DIRECTIVES, { useValue: ROUTER_DIRECTIVES, multi: true}),
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in mem server
    { provide: SEED_DATA, useClass: InMemoryDataService }
]).then((appRef: ComponentRef<any>) => {
    // store a reference to the application injector
    // appInjector(appRef.injector)
    console.log("bootstrapped");
}).catch(error => console.error(error));

