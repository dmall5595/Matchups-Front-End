import { Component } from '@angular/core';
import { Player } from '../models/player';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  title = 'The Extra Pass';
  
  player: Player = {
  	id: 1,
  	name: 'Donovan Mitchell',
		height: '6\'3"',
		weight: "190",
		team: "Utah Jazz",
  	college: 'Louisville',
  	hometown: 'Elmsford, NY',
  	fact: 'Didn’t focus on basketball until Junior in High School',
  	twitter_url: 'https://twitter.com/spidadmitchell',
  	instagram_url: 'https://www.instagram.com/spidadmitchell/',
  	stats: 'http://www.espn.com/nba/player/stats/_/id/3908809/donovan-mitchell',
  	news: ['http://www.slamonline.com/nba/donovan-mitchell-interview/#CKBgfAjw9B3uo1FP.97', 
		'https://clutchpoints.com/jazz-rudy-gobert-excited-play-ricky-rubio-impressed-rookie-donovan-mitchell/'],
		trend_rank: 23,
		vote_rank: 185
  }
}
