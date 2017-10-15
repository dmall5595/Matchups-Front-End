import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { DndModule } from 'ng2-dnd';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import { HowItWorksComponent } from './how-it-works/how-it-works.component'
import { MatchupsService } from './matchups.service';
import { ComingSoonComponent } from './coming-soon/coming-soon.component'

@NgModule({
  declarations: [
    AppComponent,
    PlayerFeedComponent,
    PlayerComponent,
    ArticleComponent,
    FanRankComponent,
    MatchupsComponent,
    HowItWorksComponent,
    ComingSoonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    DndModule.forRoot(),
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot([
      {
        path: '',
        component: HowItWorksComponent
      },
      {
        path: 'howitworks',
        component: HowItWorksComponent
      },
      {
        path: 'matchups',
        component: MatchupsComponent
      },
      {
        path: 'comingsoon',
        component: ComingSoonComponent
      },
    ])
  ],
  providers: [MatchupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
