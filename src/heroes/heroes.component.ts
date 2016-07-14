/**
 * Created by rdm0509 on 7/14/16.
 */
import { Component, OnInit } from "@angular/core";
import { Routes, Router } from "@angular/router";
// import { VipAppBaseComponent } from "angular2-vip/vip-app-base.component";
import { DashboardComponent } from "heroes/dashboard";
import { HeroDetailComponent } from "heroes/detail";
import { HeroesListComponent } from "heroes/list";
import { HeroService } from "heroes/shared";

// lazy loading of components will require a quoatation mark around the  component in Routes

@Component(<Dict>{
    selector: "my-app",
    templateUrl: "get_template/heroes-app/hero-app",
    styleUrls: ["./static/heroes-app-css/app.css"],
    directives: [],
    providers: [
        HeroService
    ]
})
@Routes(<Array>[
    { path: "/", component: DashboardComponent, useAsDefault: true },
    { path: "/heroes", component: HeroesListComponent },
    { path: "/dashboard", component: DashboardComponent },
    { path: "/detail/:id", component: HeroDetailComponent }
])
export class HeroesAppComponent implements OnInit {
    title: string = "Tour of Heroes";

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.navigate(["/dashboard"]);
    }

}
