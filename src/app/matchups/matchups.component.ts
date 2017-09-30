import { Component, OnInit, Input } from '@angular/core';
import { FanRankItem } from '../models/fan-rank-item';


@Component({
  selector: 'app-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.css']
})
export class MatchupsComponent implements OnInit {

  constructor() { }

  showRank = false
  showMatchups = true
  numSelected = 0
  chosenPlayers = []
  matchupsText = 'white'
  matchupsBG = '#1b87e5'
  ranksText = 'black'
  ranksBG = '#bec0d6'


  @Input() numToShow = 10
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
      url: '../assets/n-lebron.png', 
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

  ngOnInit() {
    this.makeChoice()
    this.generateUrl()
    
  }

  generateUrl() {
    this.players.forEach(element => {
      if (element.first_name != "Lebron")
        element.url = 'https://nba-players.herokuapp.com/players/' + element.last_name + '/' + element.first_name;         
    });
  }

  choose(result) {
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
      this.playera.img = '../assets/n-lebron.png'

    this.playerb.name = this.choice2.first_name + " " + this.choice2.last_name;
    if (this.choice2.first_name != 'Lebron')
      this.playerb.img = 'https://nba-players.herokuapp.com/players/' + this.choice2.last_name + '/' + this.choice2.first_name;
    else
      this.playerb.img = '../assets/n-lebron.png'
  }

  goToRanks() {
    this.showMatchups = false
    this.showRank = true
    this.matchupsText = 'black'
    this.matchupsBG = '#bec0d6'
    this.ranksText = 'white'
    this.ranksBG = '#1b87e5'
  }

  goToMatchups() {
    this.showMatchups = true
    this.showRank = false
    this.matchupsText = 'white'
    this.matchupsBG = '#1b87e5'
    this.ranksText = 'black'
    this.ranksBG = '#bec0d6'
  }
  
  choosePlayer(player) {
    if (player.selected) {
      this.numSelected -= 1
    } else {
      this.numSelected += 1
      this.chosenPlayers.push(player)
    }
    player.selected = !player.selected     
    if (this.numSelected == 2) {
      this.assignPlayers()
      this.goToMatchups()
      this.clearSelected()
    } 
  }

  clearSelected() {
    this.numSelected = 0
    this.chosenPlayers = []
    this.players.forEach(element => {
      element.selected = false
    });
  }

  assignPlayers() {
    this.playera.name = this.chosenPlayers[0].first_name + " " + this.chosenPlayers[0].last_name;
    if (this.chosenPlayers[0].first_name != 'Lebron')
      this.playera.img = 'https://nba-players.herokuapp.com/players/' + this.chosenPlayers[0].last_name + '/' + this.chosenPlayers[0].first_name;
    else
      this.playera.img = '../assets/n-lebron.png'

    this.playerb.name = this.chosenPlayers[1].first_name + " " + this.chosenPlayers[1].last_name;
    if (this.chosenPlayers[1].first_name != 'Lebron')
      this.playerb.img = 'https://nba-players.herokuapp.com/players/' + this.chosenPlayers[1].last_name + '/' + this.chosenPlayers[1].first_name;
    else
      this.playerb.img = '../assets/n-lebron.png'
    
  }

}
