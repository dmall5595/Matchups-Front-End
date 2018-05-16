import { Component, OnInit, Input, HostListener } from '@angular/core';
import { RankItem } from '../models/rank-item';
import { MatchupsService } from '../matchups.service'
import { SlicePipe } from '@angular/common';
import { GoogleAnalyticsEventsService } from "../google-analytics-events.service";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ListItem } from '../models/list-item';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.css']
})
export class MatchupsComponent implements OnInit {

  constructor(private matchupsService: MatchupsService,
	      private googleAnalyticsEventsService: GoogleAnalyticsEventsService,
              private route: ActivatedRoute,
	      private modalService: NgbModal,
              private http: HttpClient,
	      private router: Router) { }

  username;

  screenWidth;

  maxFileSize = 4000000;

  uploadClicked = false;
  uploadSuccess = false;
  numUploaded = 0;
  nextId = -1;

  acceptedMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
  ];

  newImg = '';
  errorMsg = ''; 

  closeResult: string;

  chosenList;
  listInfo;
  listTitle = '';
  listImg = 'https://s3.amazonaws.com/matchups-s3-upload/';
  sub_title = '';

  item: ListItem = {
    id: this.nextId,
    main_title: '',
    sub_title: '',
    sub_title_val: '',
    img: '',
  }

  showRanks = false;
  showMatchups = true;
  numSelected = 0;
  chosenItems = [];
  matchupsText = 'white';
  matchupsBG = '#1b87e5';
  ranksText = 'black';
  ranksBG = '#bec0d6';
  showWarnMatchups = false;
  showWarnRank = false;
  showWarnOverflow = false;
  choosing = false;
  
  kValue = 10;

  choice1:RankItem;
  choice2:RankItem;

  items: RankItem[];

  @Input() numToShow = 0;

  itemA = {
    title: "",
    img: '',
    id: 0,
    score: 0.0,
    numVotes: 0
  };

  itemB = {
    title: "",
    img: '',
    id: 0,
    score: 0.0,
    numVotes: 0
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    // console.log(this.screenWidth);
  }

  ngOnInit() {
    this.username = window.localStorage.getItem('username');

    this.chosenList = this.route.snapshot.paramMap.get('id');

    if (!this.chosenList)
      this.router.navigate(['/matchups/nyc']);
      this.chosenList = this.route.snapshot.paramMap.get('id');

    if (this.chosenList != null) {
      this.matchupsService.getListInfo(this.chosenList).subscribe(data => {
        this.listInfo = data[0];
        this.listTitle = this.listInfo.display_title;
        this.listImg += this.listInfo.img;
        this.nextId = this.listInfo.next_id;
        this.item.id = this.nextId;
 	this.sub_title = this.listInfo.subtitle;
      });

      this.initItems();
    }

  }

  initItems() {
    this.matchupsService.getAllItems(this.chosenList).subscribe(data => {
        this.items = data
        this.numToShow = this.items.length
        this.generateUrl()
        this.makeChoice()
        // this.sub_title = this.items[0].sub_title;
      });
  }

  upload() {
    this.uploadClicked = true;

    // first handle text
    const textData = this.getTextData();

    if (textData == -1) {
      this.errorMsg = "Please add both a picture and a title";
      this.uploadClicked = false;
      return;
    } else
       this.errorMsg = '';

    var jsonData = JSON.stringify(textData);

    this.matchupsService.addItem(jsonData).subscribe(result => { // toFix
      //console.log('Text Uploaded Successfully');
    });

    const data = this.getPicData();
    this.http.post(`https://6wddz8ps6h.execute-api.us-east-1.amazonaws.com/Prod/upload-photo`, data)
        .subscribe(
          res => {
            this.uploadSuccess = true;
            this.realClear();
          },
          err => {
            this.errorMsg = 'Could not upload image.';
            this.uploadClicked = false;
          }
        );
  }

  clearItem() {
    setTimeout(this.realClear(), 2000);    
  }

  realClear() {
    this.nextId++;
    this.item= {
      id: this.nextId,
      main_title: '',
      sub_title: '',
      sub_title_val: '',
      img: '',
    }
    this.numToShow += 1;
    this.numUploaded += 1;
    // this.uploadSuccess = false
    this.newImg = '';
    this.uploadClicked = false;
    this.initItems();
  }

  getPicData() {
    // return JSON object that contains all pictures in both mainPic and fileDataUri

    var cart = [];

    // cart.push({'filename': "0-" + this.list_title.replace(/ /g,''), 'image': this.mainPic.split(',')[1]});

    // for (var i = 0; i < this.fileDataUri.length; i++) {
      const file = this.newImg.split(',')[1];
      const filename = this.item.id + "-" + this.item.main_title.replace(/ /g,'');
      var el = {'filename': filename, 'image': file };
      cart.push(el);
    // }

    return { foo: cart };

  }

  getTextData() {

    var cart = [];

    // var mainExt = this.newImg.split(',')[0].match(/\/[0-9a-z]+/i)[0].substring(1);
    // var realMainExt = (mainExt == "jpeg") ? "jpg" : mainExt;
    // cart.push({'id': 0, 'active': 0, 'main_title': this.list_title, 'img': "0-" + this.list_title.replace(/ /g,'') + "." + realMainExt});

    cart.push({ 'main_title': this.chosenList});

    // for (var i = 0; i < this.items.length; i++) {
      if (!this.newImg || !this.item.main_title)
        return -1;
      var el = {'id': this.item.id};
      el['main_title'] = this.item.main_title;
      el['sub_title'] = this.sub_title;
      el['sub_title_val'] = this.item.sub_title_val;
      var ext = this.newImg.split(',')[0].match(/\/[0-9a-z]+/i)[0].substring(1);
      var realExt = (ext == "jpeg") ? "jpg" : ext;
      el['img'] = this.item.id + "-" + this.item.main_title.replace(/ /g,'') + "." + realExt;
      el['active'] = 0;
      el['score'] = 1400;
      el['numVotes'] = 0;
      cart.push(el);
    // }

    return { foo: cart, user: this.username };

  }

  previewFile(event) {
    const file = event.target.files[0];
    if (file && this.validateFile(file)) {

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.newImg = reader.result;
        this.errorMsg = '';
      }
    } else {
      this.errorMsg = 'File must be jpg, png, or gif and cannot be exceed 4 MB in size. Current Size: ' + file.size.toString();
    }
  }

  validateFile(file) {
    return this.acceptedMimeTypes.includes(file.type) && file.size < this.maxFileSize;
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  generateUrl() {
    if (this.chosenList == 'nba-players') {
      this.items.forEach(element => {
        element.img = '../assets/new-pics/' + element.main_title.split(' ')[1] + '-' + element.main_title.split(' ')[0] + '.png';         
      });
    } else {
      this.items.forEach(element => {
        element.img = 'https://s3.amazonaws.com/matchups-s3-upload/' + element.img;
      });
    }
  }

  choose(result) {
    this.submitEvent();
    if (result == 'a') {
        var expectedA = 1/(1+Math.pow(10,((Number(this.itemB.score) - Number(this.itemA.score))/400)))
        var expectedB = 1/(1+Math.pow(10,((Number(this.itemA.score) - Number(this.itemB.score))/400)))

        this.matchupsService.updateScore(this.username, this.chosenList, this.itemA.id, Number(this.itemA.score) + this.kValue * ( 1 - expectedA), 
          Number(this.itemA.numVotes) + 1, this.itemB.id, Number(this.itemB.score) + this.kValue * (0 - expectedB),
          Number(this.itemB.numVotes) + 1).subscribe(result =>{
            // update items list   
            this.matchupsService.getAllItems(this.chosenList).subscribe(data => {
              this.items = data
              this.generateUrl()
              this.makeChoice()
            });
          });
      } else {
        var expectedA = 1/(1+Math.pow(10,((Number(this.itemA.score) - Number(this.itemB.score))/400)))
        var expectedB = 1/(1+Math.pow(10,((Number(this.itemB.score) - Number(this.itemA.score))/400)))

        /*this.matchupsService.updateScore(this.username, this.chosenList, this.itemA.id, Number(this.itemA.score) + this.kValue * (0 - expectedA), 
          Number(this.itemA.numVotes) + 1, this.itemB.id, Number(this.itemB.score) + this.kValue * ( 1 - expectedB),
          Number(this.itemB.numVotes) + 1).subscribe(result =>{
          // update items list   
          this.matchupsService.getAllItems(this.chosenList).subscribe(data => {
            this.items = data
            this.generateUrl()                             
            this.makeChoice()          
          });
        });*/  
        this.matchupsService.updateScore(this.username, this.chosenList, this.itemB.id, Number(this.itemB.score) + this.kValue * (1 - expectedB),
          Number(this.itemB.numVotes) + 1, this.itemA.id, Number(this.itemA.score) + this.kValue * ( 0 - expectedA),
          Number(this.itemA.numVotes) + 1).subscribe(result =>{
          // update items list
          this.matchupsService.getAllItems(this.chosenList).subscribe(data => {
            this.items = data
            this.generateUrl()
            this.makeChoice()
          });
        });      
      }
  }
    
  makeChoice() {
    // new items added
    if (this.numToShow > 1 && this.numToShow <= this.items.length) {
      this.choice1 = this.items[Math.floor(Math.random()*Math.min(this.items.length, this.numToShow))];
      this.choice2 = this.items[Math.floor(Math.random()*Math.min(this.items.length, this.numToShow))];
      while (this.choice1 == this.choice2)
        this.choice2 = this.items[Math.floor(Math.random()*Math.min(this.items.length, this.numToShow))];
 
      this.itemA.title = this.choice1.main_title
      this.itemA.img = this.choice1.img
      this.itemA.id = this.choice1.id
      this.itemA.score = this.choice1.score
      this.itemA.numVotes = this.choice1.numVotes
  
      this.itemB.title = this.choice2.main_title
      this.itemB.img = this.choice2.img
      this.itemB.id = this.choice2.id
      this.itemB.score = this.choice2.score
      this.itemB.numVotes = this.choice2.numVotes
    }
  }

  goToRanks() {
    // this.router.navigate(['/matchups/nyc']);
    this.matchupsService.getAllItems(this.chosenList).subscribe(data => {
      this.items = data
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
    this.showMatchups = true
    this.showRanks = false
    this.matchupsText = 'white'
    this.matchupsBG = '#1b87e5'
    this.ranksText = 'black'
    this.ranksBG = '#bec0d6'

    this.clearSelected();
    this.keepNumToShow()    
  }
  
  chooseItem(item) {
    if (item.selected) {
      this.numSelected -= 1
      this.chosenItems.pop()   
    } else {
      this.numSelected += 1
      this.chosenItems.push(item)
    }
    item.selected = !item.selected     
    if (this.numSelected == 2) {
      this.choosing = true
      this.assignItems()
      this.goToMatchups()
      this.clearSelected()
      this.choosing = false      
    } 
  }

  clearSelected() {
    this.numSelected = 0
    this.chosenItems = []
    this.items.forEach(element => {
      element.selected = false
    });
  }

  assignItems() {
    this.itemA.title = this.chosenItems[0].main_title;
    this.itemA.img = this.chosenItems[0].img;
    this.itemA.id = this.chosenItems[0].id;
    this.itemA.score = this.chosenItems[0].score;
    this.itemA.numVotes = this.chosenItems[0].numVotes;

    this.itemB.title = this.chosenItems[1].main_title;
    this.itemB.img =  this.chosenItems[1].img;
    this.itemB.id = this.chosenItems[1].id
    this.itemB.score = this.chosenItems[1].score
    this.itemB.numVotes = this.chosenItems[1].numVotes;
  }

  keepNumToShow() {
    if (this.showMatchups && !this.choosing) 
      this.makeChoice()

    if (this.numToShow > this.items.length)
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

  submitEvent() {
    this.googleAnalyticsEventsService.emitEvent(this.chosenList, "choice", "choice made", 10);
  }

}
