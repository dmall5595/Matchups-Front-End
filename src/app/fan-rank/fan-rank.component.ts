import { Component, OnInit } from '@angular/core';
import { FanRankItem } from '../models/fan-rank-item';

@Component({
  selector: 'app-fan-rank',
  templateUrl: './fan-rank.component.html',
  styleUrls: ['./fan-rank.component.css']
})
export class FanRankComponent implements OnInit {

  constructor() { }

  players: FanRankItem[] = [
    { id: 1,
      name: "Lebron James",
      position: "4",
      score: 10.0, 
    },
    { id: 2,
      name: "Russel Westbrook",
      position: "1",
      score: 9.0, },
    { id: 3,
      name: "James Harden",
      position: "1",
      score: 8.0, },
    { id: 4,
      name: "Kawhi Leonard",
      position: "4",
      score: 7.0, },
    { id: 5,
      name: "Stephen Curry",
      position: "1",
      score: 6.0, },
    { id: 6,
      name: "Kevin Durant",
      position: "4",
      score: 5.0, },
    { id: 7,
      name: "Giannis Antetokounmpo",
      position: "3",
      score: 4.0, },
    { id: 8,
      name: "Chris Paul",
      position: "1",
      score: 3.0, },
    { id: 9,
      name: "Jimmy Butler",
      position: "2",
      score: 2.0, },
    { id: 10,
      name: "Draymond Green",
      position: "4",
      score: 1.0, }
  ];

  moveUp(idx: number) {
    if (idx != 0) {
      var temp = this.players[idx];
      this.players[idx] = this.players[idx-1];
      this.players[idx-1] = temp;
    }
  }

  moveDown(idx: number) {
    if (idx != this.players.length-1) {
      var temp = this.players[idx];
      this.players[idx] = this.players[idx+1];
      this.players[idx+1] = temp;
    }
  }

  ngOnInit() {
    
  }

}
