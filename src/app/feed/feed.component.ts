import { Component, OnInit } from '@angular/core';
import { MatchupsService } from '../matchups.service'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private matchupsService: MatchupsService) { }

  items;

  ngOnInit() {
    this.matchupsService.getFeed().subscribe(data => {
        this.items = data;
        this.setURL();
 	// console.log(this.items);
    });
  }

  setURL() {
    this.items.forEach(element => {
      element.collection = '/matchups/' + element.collection;
      if (element.username == undefined)
        element.username = 'Anonymous';
    });    
  }

}
