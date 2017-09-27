import { Component, OnInit, Input } from '@angular/core';
import { FanRankItem } from '../models/fan-rank-item';


@Component({
  selector: 'app-head-to-head',
  templateUrl: './head-to-head.component.html',
  styleUrls: ['./head-to-head.component.css']
})
export class HeadToHeadComponent implements OnInit {

  constructor() { }

  @Input() numToShow = 350
  playera = {
    name: "",
    img: ''
  }

  playerb = {
    name: "",
    img: ''
  }

  choice1:FanRankItem;
  choice2:FanRankItem;

  players: FanRankItem[] = [
    { id: 1,
      first_name: "Lebron",
      last_name: "James",
      position: "SF",
      score: 10.0,
      url: 'https://nba-players.herokuapp.com/players/james', },
    { id: 2,
      first_name: "Russell",
      last_name: "Westbrook",
      position: "PG",
      score: 9.0, 
      url: '', },
    { id: 3,
      first_name: "James",
      last_name: "Harden",
      position: "PG",
      score: 8.0, 
      url: '', },
    { id: 4,
      first_name: "Kawhi",
      last_name: "Leonard",
      position: "SF",
      score: 7.0, 
      url: '', },
    { id: 5,
      first_name: "Stephen",
      last_name: "Curry",
      position: "PG",
      score: 6.0, 
      url: '', },
    { id: 6,
      first_name: "Kevin",
      last_name: "Durant",
      position: "SF",
      score: 5.0, 
      url: '', },
    { id: 7,
      first_name: "Giannis",
      last_name: "Antetokounmpo",
      position: "SF",
      score: 4.0, 
      url: '', },
    { id: 8,
      first_name: "Chris",
      last_name: "Paul",
      position: "PG",
      score: 3.0, 
      url: '', },
    { id: 9,
      first_name: "Jimmy",
      last_name: "Butler",
      position: "SG",
      score: 2.0, 
      url: '', },
    { id: 10,
      first_name: "Draymond",
      last_name: "Green",
      position: "SF",
      score: 1.0, 
      url: '', }
  ];

  ngOnInit() {
    this.makeChoice()
  }

  choose(result) {
    // score logged
    if (result == 'a')
      console.log(this.choice1.first_name + " better")
    else
      console.log(this.choice2.first_name + " better")

      this.makeChoice()
  }
    
  makeChoice() {
    // new players added
    this.choice1 = this.players[Math.floor(Math.random()*this.players.length)];
    this.choice2 = this.players[Math.floor(Math.random()*this.players.length)];
    while (this.choice1 == this.choice2)
      this.choice2 = this.players[Math.floor(Math.random()*this.players.length)];

    this.playera.name = this.choice1.first_name + " " + this.choice1.last_name;
    if (this.choice1.first_name != 'Lebron')
      this.playera.img = 'https://nba-players.herokuapp.com/players/' + this.choice1.last_name + '/' + this.choice1.first_name;
    else
      this.playera.img = 'https://nba-players.herokuapp.com/players/james'

    this.playerb.name = this.choice2.first_name + " " + this.choice2.last_name;
    if (this.choice2.first_name != 'Lebron')
      this.playerb.img = 'https://nba-players.herokuapp.com/players/' + this.choice2.last_name + '/' + this.choice2.first_name;
    else
      this.playerb.img = 'https://nba-players.herokuapp.com/players/james'
  }
  

}
