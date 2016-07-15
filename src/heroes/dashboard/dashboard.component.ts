/**
 * Created by rdm0509 on 7/14/16.
 */

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Hero, HeroService } from "heroes/shared";

@Component({
    selector: "my-dashboard",
    templateUrl: "./dashboard.html",
    styleUrls: ["./dashboard.css"],
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    constructor(private router: Router, private heroService: HeroService) { }

    ngOnInit(): void {
        this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes.slice(1, 5));
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}