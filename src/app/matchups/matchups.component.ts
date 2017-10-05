import { Component, OnInit, Input } from '@angular/core';
import { FanRankItem } from '../models/fan-rank-item';
import { MatchupsService } from '../matchups.service'


@Component({
  selector: 'app-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.css']
})
export class MatchupsComponent implements OnInit {

  constructor(private matchupsService: MatchupsService) { }

  showRank = false
  showMatchups = true
  numSelected = 0
  chosenPlayers = []
  matchupsText = 'white'
  matchupsBG = '#1b87e5'
  ranksText = 'black'
  ranksBG = '#bec0d6'

  temp: any
  newTemp: any  
  temp3: any

  @Input() numToShow = 10
  playera = {
    name: "",
    img: '',
    id: 0,
    score: 0
  }

  playerb = {
    name: "",
    img: '',
    id: 0,
    score: 0
  }

  choice1:FanRankItem;
  choice2:FanRankItem;

  posts: any = [];

  players: FanRankItem[]

  ngOnInit() {
    this.matchupsService.getAllPlayers().subscribe(data => {
      this.players = data
      this.makeChoice()  
      this.generateUrl()            
    });

    this.matchupsService.updateScore('59d5a67d2af77462a28ffee1', 1.5).subscribe()
  }

  generateUrl() {
    this.players.forEach(element => {
      if (element.first_name != "Lebron")
        element.url = 'https://nba-players.herokuapp.com/players/' + element.last_name + '/' + element.first_name;         
    });
  }

  choose(result) {
      if (result == 'a') {
        console.log(this.playera)        
      } else {

      }
      
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
    this.playera.id = this.choice1.id
    this.playera.score = this.choice1.score

    this.playerb.name = this.choice2.first_name + " " + this.choice2.last_name;
    if (this.choice2.first_name != 'Lebron')
      this.playerb.img = 'https://nba-players.herokuapp.com/players/' + this.choice2.last_name + '/' + this.choice2.first_name;
    this.playerb.id = this.choice2.id
    this.playerb.score = this.choice2.score
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
