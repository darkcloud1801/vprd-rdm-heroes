/**
 * Created by rdm0509 on 7/14/16.
 */

import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HeroService, Hero } from "heroes/shared";

@Component({
    selector: "my-hero-detail",
    templateUrl: "./detail.html",
    styleUrls: ["./detail.css"]
})

export class HeroDetailComponent implements OnInit, OnDestroy {
    @Input() hero: Hero;
    @Output() close: EventEmitter = new EventEmitter();
    sub: any;
    hero: Hero;
    error: any;
    navigated: boolean = false;

    constructor(private heroService: HeroService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.navigated = true;
                this.heroService.getHero(id)
                    .then(hero => this.hero = hero);
            } else {
                this.navigated = false;
                this.hero = new Hero();
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
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

