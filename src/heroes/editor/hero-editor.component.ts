/**
 * Created by rdm0509 on 7/14/16.
 */

import { Component } from "@angular/core";
import { Hero } from "heroes/shared";

@Component({
    selector: "my-app",
    templateUrl: "get_template/heroes-app/hero-editor"
})

export class HeroEditorComponent {
    title: string = "Tour of Heroes";
    hero: Hero  = {
        id: 1,
        name: "Windstorm"
    };
}
