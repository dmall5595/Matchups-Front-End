import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { DndModule } from 'ng2-dnd';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
//import {HttpClientModule} from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { PlayerFeedComponent } from './player-feed/player-feed.component';
import { PlayerComponent } from './player/player.component';
import { ArticleComponent } from './article/article.component';
import { FanRankComponent } from './fan-rank/fan-rank.component';
import { MatchupsComponent } from './matchups/matchups.component'

import { MatchupsService } from './matchups.service'

@NgModule({
  declarations: [
    AppComponent,
    PlayerFeedComponent,
    PlayerComponent,
    ArticleComponent,
    FanRankComponent,
    MatchupsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DndModule.forRoot(),
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
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
  providers: [MatchupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
