import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';
// import { HttpModule }    from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MatchupsComponent } from './matchups/matchups.component'
import { HowItWorksComponent } from './how-it-works/how-it-works.component'
import { MatchupsService } from './matchups.service';
import { GoogleAnalyticsEventsService } from "./google-analytics-events.service";
import { CreateListComponent } from './create-list/create-list.component';
import { AllListsComponent } from './all-lists/all-lists.component';
import { HelpComponent } from './help/help.component';
import { FeedComponent } from './feed/feed.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchupsComponent,
    HowItWorksComponent,
    CreateListComponent,
    AllListsComponent,
    HelpComponent,
    FeedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule,
    NgbModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AllListsComponent
      },
      {
        path: 'what-is-matchups',
        component: HowItWorksComponent
      },
      {
        path: 'matchups',
        component: MatchupsComponent
      },
      {
        path: 'matchups/:id',
        component: MatchupsComponent
      },
      {
        path: 'help',
        component: HelpComponent
      },
      {
	path: 'create-list',
        component: CreateListComponent
      },
      {
        path: 'feed',
        component: FeedComponent
      }
    ])
  ],
  providers: [MatchupsService, GoogleAnalyticsEventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
