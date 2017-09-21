import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-head-to-head',
  templateUrl: './head-to-head.component.html',
  styleUrls: ['./head-to-head.component.css']
})
export class HeadToHeadComponent implements OnInit {

  constructor() { }

  @Input() numToShow = 350

  ngOnInit() {
  }

}
