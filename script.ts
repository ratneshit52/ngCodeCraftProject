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
    <div class="list-group">
      <joke class="list-group-item" *ngFor="let j of jokes" [joke]="j"></joke>
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
}

@Component({
  selector: 'joke',
  template: `
    <h1 class="setup title">{{data.setup}}</h1>
    <p class="punchline description" [hidden]="data.hide">{{data.punchline}}</p>
    <button (click)="data.toggle()">Tell Me</button>
  `
})

export class JokeComponent {
  @Input('joke') data: Joke;
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, JokeComponent, JokeListComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);