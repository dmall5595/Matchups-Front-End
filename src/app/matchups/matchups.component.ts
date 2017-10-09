import { Component, OnInit, Input } from '@angular/core';
import { FanRankItem } from '../models/fan-rank-item';
import { MatchupsService } from '../matchups.service'
import { SlicePipe } from '@angular/common';


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
    score: 0.0
  }

  playerb = {
    name: "",
    img: '',
    id: 0,
    score: 0.0
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

  }

  generateUrl() {
    this.players.forEach(element => {
      if (element.first_name != "Lebron")
        element.url = 'https://nba-players.herokuapp.com/players/' + element.last_name + '/' + element.first_name;         
    });
  }

  choose(result) {
      if (result == 'a') {
        this.matchupsService.updateScore(this.playera.id.toString(), Number(this.playera.score) + .01, 
          this.playerb.id.toString(), Number(this.playerb.score) - .01).subscribe(result =>{
            // update players list   
            this.matchupsService.getAllPlayers().subscribe(data => {
              this.players = data
              this.makeChoice()          
            });
          });
      } else {
        this.matchupsService.updateScore(this.playera.id.toString(), Number(this.playera.score) - .01, 
          this.playerb.id.toString(), Number(this.playerb.score) + .01).subscribe(result =>{
          // update players list   
          this.matchupsService.getAllPlayers().subscribe(data => {
            this.players = data
            this.makeChoice()          
          });
        });        
      }
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
      this.playera.img = this.choice1.url
    this.playera.id = this.choice1.id
    this.playera.score = this.choice1.score

    this.playerb.name = this.choice2.first_name + " " + this.choice2.last_name;
    if (this.choice2.first_name != 'Lebron')
      this.playerb.img = 'https://nba-players.herokuapp.com/players/' + this.choice2.last_name + '/' + this.choice2.first_name;
    else
      this.playerb.img = this.choice2.url
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
    this.matchupsService.getAllPlayers().subscribe(data => {
      this.players = data
      this.generateUrl()           
    });
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
      this.chosenPlayers.pop()   
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
      this.playera.id = this.chosenPlayers[0].id
      this.playera.score = this.chosenPlayers[0].score

    this.playerb.name = this.chosenPlayers[1].first_name + " " + this.chosenPlayers[1].last_name;
    if (this.chosenPlayers[1].first_name != 'Lebron')
      this.playerb.img = 'https://nba-players.herokuapp.com/players/' + this.chosenPlayers[1].last_name + '/' + this.chosenPlayers[1].first_name;
    else
      this.playerb.img = '../assets/n-lebron.png'
      this.playerb.id = this.chosenPlayers[1].id
      this.playerb.score = this.chosenPlayers[1].score
  }

}
