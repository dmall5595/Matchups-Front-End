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

  showRanks = false
  showMatchups = true
  numSelected = 0
  chosenPlayers = []
  matchupsText = 'white'
  matchupsBG = '#1b87e5'
  ranksText = 'black'
  ranksBG = '#bec0d6'
  showWarnMatchups = false
  showWarnRank = false  
  showWarnOverflow = false
  amountToChangeScore = .01
  isNavbarCollapsed = true
  choosing = false
  kValue = 10

  temp: any
  newTemp: any  
  temp3: any

  playera = {
    name: "",
    img: '',
    id: 0,
    score: 0.0,
    numVotes: 0
  }

  playerb = {
    name: "",
    img: '',
    id: 0,
    score: 0.0,
    numVotes: 0
  }

  choice1:FanRankItem;
  choice2:FanRankItem;

  posts: any = [];

  players: FanRankItem[]

  @Input() numToShow = 10

  ngOnInit() {
    this.matchupsService.getAllPlayers().subscribe(data => {
      this.players = data
      this.generateUrl()           
      this.makeChoice()  
      console.log(this.players)      
    });
    this.isNavbarCollapsed = true
  }

  generateUrl() {
    this.players.forEach(element => {
      element.url = '../assets/player-pics/' + element.last_name.toLowerCase() + '-' + element.first_name.toLowerCase() + '.png';         
    });
  }

  choose(result) {
      if (result == 'a') {
        var expectedA = 1/(1+Math.pow(10,((Number(this.playerb.score) - Number(this.playera.score))/400)))
        var expectedB = 1/(1+Math.pow(10,((Number(this.playera.score) - Number(this.playerb.score))/400)))

        this.matchupsService.updateScore(this.playera.id.toString(), Number(this.playera.score) + this.kValue * ( 1 - expectedA), 
          Number(this.playera.numVotes) + 1, this.playerb.id.toString(), Number(this.playerb.score) + this.kValue * (0 - expectedB),
          Number(this.playera.numVotes) + 1).subscribe(result =>{
            // update players list   
            this.matchupsService.getAllPlayers().subscribe(data => {
              this.players = data
              this.generateUrl()                   
              this.makeChoice()          
            });
          });
      } else {
        var expectedA = 1/(1+Math.pow(10,((Number(this.playera.score) - Number(this.playerb.score))/400)))
        var expectedB = 1/(1+Math.pow(10,((Number(this.playerb.score) - Number(this.playera.score))/400)))

        this.matchupsService.updateScore(this.playera.id.toString(), Number(this.playera.score) + this.kValue * (0 - expectedA), 
          Number(this.playera.numVotes) + 1, this.playerb.id.toString(), Number(this.playerb.score) + this.kValue * ( 1 - expectedB),
          Number(this.playera.numVotes) + 1).subscribe(result =>{
          // update players list   
          this.matchupsService.getAllPlayers().subscribe(data => {
            this.players = data
            this.generateUrl()                             
            this.makeChoice()          
          });
        });        
      }
  }
    
  makeChoice() {
    // new players added
    if (this.numToShow > 1 && this.numToShow <= this.players.length) {
      this.choice1 = this.players[Math.floor(Math.random()*Math.min(this.players.length, this.numToShow))];
      this.choice2 = this.players[Math.floor(Math.random()*Math.min(this.players.length, this.numToShow))];
      while (this.choice1 == this.choice2)
        this.choice2 = this.players[Math.floor(Math.random()*Math.min(this.players.length, this.numToShow))];
  
      this.playera.name = this.choice1.first_name + " " + this.choice1.last_name;
      this.playera.img = this.choice1.url
      this.playera.id = this.choice1.id
      this.playera.score = this.choice1.score
      this.playera.numVotes = this.choice1.numVotes
  
      this.playerb.name = this.choice2.first_name + " " + this.choice2.last_name;
      this.playerb.img = this.choice2.url
      this.playerb.id = this.choice2.id
      this.playerb.score = this.choice2.score
      this.playerb.numVotes = this.choice2.numVotes
    }
  }

  goToRanks() {
    this.isNavbarCollapsed = false

    this.matchupsService.getAllPlayers().subscribe(data => {
      this.players = data
      this.generateUrl()                 
      this.generateUrl()           
    });

    this.showMatchups = false
    this.showRanks = true
    this.matchupsText = 'black'
    this.matchupsBG = '#bec0d6'
    this.ranksText = 'white'
    this.ranksBG = '#1b87e5'

    this.keepNumToShow()    
  }

  goToMatchups() {
    this.isNavbarCollapsed = false
   
    this.showMatchups = true
    this.showRanks = false
    this.matchupsText = 'white'
    this.matchupsBG = '#1b87e5'
    this.ranksText = 'black'
    this.ranksBG = '#bec0d6'

    this.keepNumToShow()    
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
      this.choosing = true
      this.assignPlayers()
      this.goToMatchups()
      this.clearSelected()
      this.choosing = false      
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
    this.playera.img = this.chosenPlayers[0].url;
    this.playera.id = this.chosenPlayers[0].id
    this.playera.score = this.chosenPlayers[0].score

    this.playerb.name = this.chosenPlayers[1].first_name + " " + this.chosenPlayers[1].last_name;
    this.playerb.img =  this.chosenPlayers[1].url;
    this.playerb.id = this.chosenPlayers[1].id
    this.playerb.score = this.chosenPlayers[1].score
  }

  keepNumToShow() {
    if (this.showMatchups && !this.choosing) {
      this.makeChoice()
    }

    if (this.numToShow > this.players.length)
      this.showWarnOverflow = true
    else 
      this.showWarnOverflow = false        

    if (this.showMatchups)
      if (this.numToShow < 2)
        this.showWarnMatchups = true
      else 
        this.showWarnMatchups = false      
    else if (this.showRanks) 
      if (this.numToShow < 1)
        this.showWarnRank = true
      else
        this.showWarnRank = false      

  }

}
