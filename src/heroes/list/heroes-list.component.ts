/**
 * Created by rdm0509 on 7/14/16.
 */

import { Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { Hero, HeroService } from "heroes/shared";
import { HeroDetailComponent } from "heroes";

@Component(<Dict>{
    selector: "my-heroes",
    templateUrl: "./list.html",
    styleUrls: ["./list.css"],
    directives: [HeroDetailComponent]
})

export class HeroesListComponent implements OnInit {
    title: String = "Tour of Heroes";
    heroes: Hero[];
    selectedHero: Hero;
    addingHero: boolean = false;
    error: any;

    constructor(private router: Router, private heroService: HeroService) { }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    addHero(): void {
        this.addingHero = true;
        this.selectedHero = null;
    }

    close(savedHero: Hero): void {
        this.addingHero = false;
        if (savedHero) { this.getHeroes(); }
    }

    deleteHero(hero: Hero, event: any): void {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            })
            .catch(error => this.error = error);
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(["/detail", this.selectedHero.id]);
    }
}

