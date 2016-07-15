/**
 * Created by rdm0509 on 7/14/16.
 */
import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
// import { VipAppBaseComponent } from "angular2-vip/vip-app-base.component";
import { HeroService } from "heroes/shared";

@Component(<Dict>{
    selector: "my-app",
    templateUrl: "heroes/heroes.html",
    styleUrls: ["heroes.css"],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HeroService
    ]
})
export class HeroesAppComponent implements OnInit {
    title: string = "Tour of Heroes";

    ngOnInit(): void {
        // this.router.navigate(["/dashboard"]);
    }

}
