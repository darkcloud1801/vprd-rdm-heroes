/**
 * Created by rdm0509 on 7/14/16.
 */

import { HEROES } from "./mock-heroes.db";
import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Hero } from "./hero.model";
import "rxjs/add/operator/toPromise";

@Injectable()
export class HeroService {
    private heroesUrl: String = "heroes/heroes";  // url to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]> (resolve =>
            setTimeout(() => resolve(HEROES), 2000)
        );
    }

    getHero(id: number): Promise<Hero> {
        return Promise.resolve(HEROES).then(heroes => heroes.filter(hero => hero.id === id)[0]);
    }

    delete(hero: Hero): Promise {
        let headers: Headers = new Headers();
        headers.append("Content-Type", "javascript/json");

        let url: String = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    save(hero: Hero): Promise<Hero> {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    private post(hero: Hero): Promise<Hero> {
        let headers: Headers = new Headers({
            "Content-Type": "application/json"
        });

        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), { headers: headers })
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private put(hero: Hero): Promise<Hero> {
        let headers: Headers = new Headers({
            "Content-Type": "application/json"
        });

        let url: String = "${this.heroesUrl}/${hero.id}";

        return this.http
            .put(url, JSON.stringify(hero), { headers: headers })
            .toPromise()
            .then(() => hero)
            .catch();
    }

    private handleError(error: any): void {
        console.error("An Error occurred", error);
        return Promise.reject(error.message || error);
    }
}

