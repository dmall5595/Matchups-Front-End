import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ListItem } from '../models/list-item';
import { HttpClient } from '@angular/common/http';
import { MatchupsService } from '../matchups.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {

  constructor(private http: HttpClient,
              private matchupsService: MatchupsService,
	      private router: Router) { }

  ngOnInit() {
    this.username = window.localStorage.getItem('username');
  }

  username;

  maxFileSize = 4000000;

  showMinus = false;
  uploadClicked = false;
  uploadSuccess = false;

  items: ListItem[] = [];
  next_id = 1;
  list_title = '';
  subtitle = '';

  acceptedMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
  ];

  mainPic = '';
  mainError = '';
  fileDataUri:string[] = new Array();
  errorMsg:string[] = new Array(); 

  previewFile(event, i:number) {
    const file = event.target.files[0];
    if (file && this.validateFile(file)) {

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        if (i == -1) {
          this.mainPic = reader.result;
          this.mainError = '';
        } else {
          this.fileDataUri[i] = reader.result;
          this.errorMsg[i] = '';
        }
      }
    } else {
      if (i == -1)
        this.mainError = 'File must be jpg, png, or gif and cannot be exceed 4 MB in size. Current Size: ' + file.size.toString();
      else
        this.errorMsg[i] = 'File must be jpg, png, or gif and cannot be exceed 4 MB in size. Current Size: ' + file.size.toString();
    }
  }

  validateFile(file) {
    return this.acceptedMimeTypes.includes(file.type) && file.size < this.maxFileSize;
  }

  upload() {

    // check credentials and get token
    const token = window.localStorage.getItem('token'); 
    console.log(token);
    if (!token) {
      this.mainError = "No token found. Please sign up.";
      this.uploadClicked = false;
      return;  
    }
    this.uploadClicked = true;

    // first handle text
    const textData = this.getTextData();
    
    if (textData == -1) {
      this.mainError = "Please add both a picture and a title to all open slots";
      this.uploadClicked = false;
      return;
    } else 
       this.mainError = '';
    
    var jsonData = JSON.stringify(textData);
 
    this.matchupsService.addList(jsonData, token).subscribe(result => {
      console.log('Text Uploaded Successfully');
    });
    
    const data = this.getPicData();
    this.http.post(`https://6wddz8ps6h.execute-api.us-east-1.amazonaws.com/Prod/upload-photo`, data)
        .subscribe(
          res => {
	    this.uploadSuccess = true;
	    const mTitle = this.list_title.trim().toLowerCase().replace(/ /g, '-');
	    this.router.navigate(['/matchups/' + mTitle]);
          },
          err => {
            this.mainError = 'Could not upload image.';
	    this.uploadClicked = false;
          }
        );
  }

  getPicData() {
    // return JSON object that contains all pictures in both mainPic and fileDataUri

    var cart = [];

    cart.push({'filename': "0-" + this.list_title.replace(/ /g,''), 'image': this.mainPic.split(',')[1]});

    for (var i = 0; i < this.fileDataUri.length; i++) {
      const file = this.fileDataUri[i].split(',')[1];
      const filename = this.items[i].id + "-" + this.items[i].main_title.replace(/ /g,'');
      var el = {'filename': filename, 'image': file };
      cart.push(el);
    }

    return { foo: cart };

  }

  getTextData() {

    if (!this.mainPic || !this.list_title)
      return -1;

    var cart = [];

    var mainExt = this.mainPic.split(',')[0].match(/\/[0-9a-z]+/i)[0].substring(1);
    var realMainExt = (mainExt == "jpeg") ? "jpg" : mainExt;
    cart.push({'id': 0, 'active': 0, 'main_title': this.list_title, 'subtitle': this.subtitle, 'img': "0-" + this.list_title.replace(/ /g,'') + "." + realMainExt, 'next_id': this.next_id}); 

    for (var i = 0; i < this.items.length; i++) {
      if (!this.fileDataUri[i] || !this.items[i].main_title)
        return -1;
      var el = {'id': this.items[i].id}; 
      el['main_title'] = this.items[i].main_title;
      el['sub_title'] = this.items[i].sub_title;
      el['sub_title_val'] = this.items[i].sub_title_val;
      var ext = this.fileDataUri[i].split(',')[0].match(/\/[0-9a-z]+/i)[0].substring(1);
      var realExt = (ext == "jpeg") ? "jpg" : ext;
      el['img'] = this.items[i].id + "-" + this.items[i].main_title.replace(/ /g,'') + "." + realExt;
      el['active'] = 0;
      el['score'] = 1400;
      el['numVotes'] = 0;
      cart.push(el);
    }

    return { foo: cart, user: this.username };

  }

  addOne() {
    this.showMinus = true;

    this.fileDataUri.push('');
    var item: ListItem = {
      id: this.next_id,
      main_title: '',
      sub_title: '',
      sub_title_val: '',
      img: '',
    }
    this.next_id += 1

    this.items.push(item);
  }

  removeOne() {
    this.items.pop();
    this.fileDataUri.pop();

    if (this.items.length == 0)
      this.showMinus = false; 
  }

}
