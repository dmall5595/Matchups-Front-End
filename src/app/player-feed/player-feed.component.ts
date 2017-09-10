import { Component } from '@angular/core';
import { FeedItem } from '../models/feed-item';


@Component({
  selector: 'app-player-feed',
  templateUrl: './player-feed.component.html',
  styleUrls: ['./player-feed.component.css']
})
export class PlayerFeedComponent {

  articles: FeedItem[] = [
    { id: 1,
      title: "Mitchell’s Pick and Roll Defense has been Unbelievable!",
      preview: "Donovan mitchell has been one of the best defenders in the league this season. How does he do it? Sam Gordon checks with the tape to find out.",
      author: "Sam Gordon",
      date: "Aug 15",
      link: "",
      teaserImage: "../assets/m1.jpg" },
    { id: 1,
      title: "Podcast: One On One with Donovan Mitchell",
      preview: "",
      author: "Sam Gordon",
      date: "Aug 14",
      link: "",
      teaserImage: "../assets/m2.jpg" },
    { id: 1,
      title: "Video: Eating a steak with Donovan Mitchell",
      preview: "",
      author: "Dan Mallon",
      date: "Aug 12",
      link: "",
      teaserImage: "../assets/m3.jpg" },
  ];

}
