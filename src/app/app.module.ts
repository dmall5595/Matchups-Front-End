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
import { MatchupsComponent } from './matchups/matchups.component'

@NgModule({
  declarations: [
    AppComponent,
    PlayerFeedComponent,
    PlayerComponent,
    ArticleComponent,
    FanRankComponent,
    MatchupsComponent
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
        path: 'matchups',
        component: MatchupsComponent
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
