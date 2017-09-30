import { Component, OnInit } from '@angular/core';
import { FanRankItem } from '../models/fan-rank-item';

@Component({
  selector: 'app-fan-rank',
  templateUrl: './fan-rank.component.html',
  styleUrls: ['./fan-rank.component.css']
})
export class FanRankComponent implements OnInit {

  constructor() { }

  url = 'https://nba-players.herokuapp.com/players/'
  
  players: FanRankItem[] = [
    { id: 1,
      first_name: "Lebron",
      last_name: "James",
      position: "SF",
      score: 10.0,
      url: 'https://nba-players.herokuapp.com/players/james', 
      selected: false },
    { id: 2,
      first_name: "Russell",
      last_name: "Westbrook",
      position: "PG",
      score: 9.0, 
      url: '', 
      selected: false },
    { id: 3,
      first_name: "James",
      last_name: "Harden",
      position: "PG",
      score: 8.0, 
      url: '', 
      selected: false },
    { id: 4,
      first_name: "Kawhi",
      last_name: "Leonard",
      position: "SF",
      score: 7.0, 
      url: '', 
      selected: false },
    { id: 5,
      first_name: "Stephen",
      last_name: "Curry",
      position: "PG",
      score: 6.0, 
      url: '', 
      selected: false },
    { id: 6,
      first_name: "Kevin",
      last_name: "Durant",
      position: "SF",
      score: 5.0, 
      url: '', 
      selected: false },
    { id: 7,
      first_name: "Giannis",
      last_name: "Antetokounmpo",
      position: "SF",
      score: 4.0, 
      url: '', 
      selected: false },
    { id: 8,
      first_name: "Chris",
      last_name: "Paul",
      position: "PG",
      score: 3.0, 
      url: '', 
      selected: false },
    { id: 9,
      first_name: "Jimmy",
      last_name: "Butler",
      position: "SG",
      score: 2.0, 
      url: '', 
      selected: false },
    { id: 10,
      first_name: "Draymond",
      last_name: "Green",
      position: "SF",
      score: 1.0, 
      url: '', 
      selected: false }
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
    console.log(this.url + this.players[0].last_name)
    this.generateUrl()
  }

  generateUrl() {
    this.players.forEach(element => {
      if (element.first_name != "Lebron")
        element.url = 'https://nba-players.herokuapp.com/players/' + element.last_name + '/' + element.first_name;         
    });
  }

}
