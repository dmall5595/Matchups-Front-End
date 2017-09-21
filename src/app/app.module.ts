import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { DndModule } from 'ng2-dnd';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { PlayerFeedComponent } from './player-feed/player-feed.component';
import { PlayerComponent } from './player/player.component';
import { ArticleComponent } from './article/article.component';
import { FanRankComponent } from './fan-rank/fan-rank.component';
import { HeadToHeadComponent } from './head-to-head/head-to-head.component'

@NgModule({
  declarations: [
    AppComponent,
    PlayerFeedComponent,
    PlayerComponent,
    ArticleComponent,
    FanRankComponent,
    HeadToHeadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DndModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'player',
        component: PlayerComponent
      },
      {
        path: 'article',
        component: ArticleComponent
      },
      {
        path: 'fan-rank',
        component: FanRankComponent
      },
      {
        path: 'head-to-head',
        component: HeadToHeadComponent
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
