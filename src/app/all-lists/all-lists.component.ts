import { Component, OnInit } from '@angular/core';
import { MatchupsService } from '../matchups.service'

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.css']
})
export class AllListsComponent implements OnInit {

  constructor(private matchupsService: MatchupsService) { }

  activeChoices: any;
  inactiveChoices = [];

  ngOnInit() {

    this.matchupsService.getListTitles().subscribe(data => {
      this.activeChoices = data;
      this.handleData();
    });   

  }

  handleData() {

    var i = 0;
    var numChecked = 0;
    var numToCheck = this.activeChoices.length;
    while (numChecked < numToCheck) {
      var element = this.activeChoices[i];
      //if (true) {
        element['mongo_title'] = '/matchups/' + element['mongo_title'];
        i += 1
        numChecked += 1
      /*} else {
        element['mongo_title'] = '/all-lists';
        const index = this.activeChoices.indexOf(element);
        this.inactiveChoices.push(element);
        this.activeChoices.splice(index, 1);
        numChecked += 1
      }*/
    }
    // this.activeChoices.sort();

  }

  // choices = [['NBA Players', '/matchups/nba-players'], ['NBA Teams', '/matchups/nba-teams'], ['NFL Players', '/matchups/nfl-players'], ['NFL Teams', '/matchups/nfl-teams'] ];
  
}
