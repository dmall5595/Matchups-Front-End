import { Component, OnInit } from '@angular/core';
import { FanRankItem } from '../models/fan-rank-item';

@Component({
  selector: 'app-fan-rank',
  templateUrl: './fan-rank.component.html',
  styleUrls: ['./fan-rank.component.css']
})
export class FanRankComponent implements OnInit {

  constructor() { }

  listOne: Array<string> = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];  

  players: FanRankItem[] = [
    { id: 1,
      name: "Lebron James",
      position: "SF",
      score: 10.0, 
    },
    { id: 2,
      name: "Russel Westbrook",
      position: "PG",
      score: 9.0, },
    { id: 3,
      name: "James Harden",
      position: "PG",
      score: 8.0, },
    { id: 4,
      name: "Kawhi Leonard",
      position: "SF",
      score: 7.0, },
    { id: 5,
      name: "Stephen Curry",
      position: "PG",
      score: 6.0, },
    { id: 6,
      name: "Kevin Durant",
      position: "SF",
      score: 5.0, },
    { id: 7,
      name: "Giannis Antetokounmpo",
      position: "SF",
      score: 4.0, },
    { id: 8,
      name: "Chris Paul",
      position: "PG",
      score: 3.0, },
    { id: 9,
      name: "Jimmy Butler",
      position: "SG",
      score: 2.0, },
    { id: 10,
      name: "Draymond Green",
      position: "SF",
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
