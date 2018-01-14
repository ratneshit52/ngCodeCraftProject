import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Component, NgModule, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app',
  template: `
    <joke-list></joke-list>
  `
})


export class AppComponent {
  
}

export class Joke {
  setup: string;
  punchline: string;
  hide: boolean;

  constructor(setup: string, punchline: string){
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }

  toggle(){
    this.hide = !this.hide;
  }
}

@Component({
  selector: 'joke-list',
  template: `
    <joke-form (outData)="addJoke($event)"></joke-form>
    <div class="list-group">
      <joke class="list-group-item" *ngFor="let j of jokes" [testoo]="j"></joke>
    </div>
  `
})

export class JokeListComponent {
  jokes: Joke[];

  constructor(){
    this.jokes = [
      new Joke("What did the cheese say when it looked in the mirror?", "Hello-Me (Halloumi)"),
      new Joke("What kind of cheese do you use to disguise a small horse?", "Mask-a-pony (Mascarpone)"),
      new Joke("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’")
    ]
  }

  addJoke(ev: any){
    this.jokes.unshift(ev);
  }
}

@Component({
  selector: 'joke',
  template: `
    <h1 class="setup title">{{data.setup}}</h1>
    <p class="punchline description" [hidden]="data.hide">{{data.punchline}}</p>
    <button (click)="data.toggle()" class="btn btn-primary">Tell Me</button>
  `
})


export class JokeComponent {
  @Input('testoo') data: Joke;
}

@Component({
  selector: 'joke-form',
  templateUrl: 'joke-form-component.html',
  styleUrls: ['joke-form-component.css']
})

export class JokeFormComponent {

  @Output() outData = new EventEmitter<Joke>();
  
  createJoke(setup: string, punchline: string){
    this.outData.emit(new Joke(setup, punchline));
  }

}


@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, JokeComponent, JokeListComponent, JokeFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);