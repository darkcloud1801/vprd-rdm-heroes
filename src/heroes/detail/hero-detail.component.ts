/**
 * Created by rdm0509 on 7/14/16.
 */

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RouteSegment } from "@angular/router";
import { HeroService, Hero } from "heroes/shared";

@Component({
    selector: "my-hero-detail",
    templateUrl: "get_template/heroes-app/hero-detail",
    styleUrls: ["./static/heroes-app-css/hero-detail.css"]
})

export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Output() close: EventEmitter = new EventEmitter();
    id: any;
    error: any;
    navigated: boolean = false;

    constructor(private heroService: HeroService, private routeSegment: RouteSegment) {
        this.id = routeSegment.getParam("id");
    }

    ngOnInit(): void {
        console.log("hero detail component", this.id);
        if (this.id !== undefined) {
            this.navigated = true;
            this.heroService.getHero(this.id)
                .then(hero => this.hero = hero);
        } else {
            console.log("no hero");
            this.navigated = false;
            this.hero = new Hero();
        }
    }

    save(): void {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero;
                this.goBack(hero);
            })
            .catch(error => this.error = error);
    }
    goBack(savedHero: Hero = null): void {
        this.close.emit(savedHero);
        if (this.navigated) { window.history.back(); }
    }
}

