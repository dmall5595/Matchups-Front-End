import { Component, ViewChild, ElementRef } from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatchupsService } from './matchups.service'

declare let ga: Function;

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html', 
 styleUrls: ['./app.component.css'] 
})
export class AppComponent {
 isNavbarCollapsed = true;
 navbarCollapsed = true;

 year = '';
 
 showLogin = false;
 loggedIn = false;
 username;
 email;
 password;
 passwordConfirm;
 response;

 constructor(public router: Router, 
             private modalService: NgbModal,
             private matchupsService: MatchupsService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    var today = new Date();
    var date = today.getFullYear();
    this.year = date.toString();
    if (window.localStorage.getItem('token') != undefined) {
      this.loggedIn = true;
      this.username = window.localStorage.getItem('username');
      this.email = window.localStorage.getItem('email');
    }

    /*this.matchupsService.testPost(window.localStorage.getItem('token')).subscribe(thing => {
        console.log(thing);
      });*/

  }

  @ViewChild('navbarToggler') navbarToggler:ElementRef;

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }

  open(content) {
    this.modalService.open(content);
  }

  goToLogin() {
    this.showLogin = !this.showLogin;
  }

  goToSignup() {

  }

  login() {
    this.matchupsService.login(this.username, this.password).subscribe(data => {
      this.response = data;
      window.localStorage.setItem('token', this.response.token);
      window.localStorage.setItem('username', this.response.username);
      window.localStorage.setItem('_id', this.response.id);
      window.localStorage.setItem('email', this.response.email);
      if (this.response.success) {
        this.loggedIn = true;
        this.email = this.response.email;
      }
    });
  }

  signup() {

    if (this.password != this.passwordConfirm)
      console.log("passwords don't match");
    else {
      this.matchupsService.signup(this.username, this.email, this.password).subscribe(data => {
        this.response = data;
        window.localStorage.setItem('token', this.response.token);
        window.localStorage.setItem('username', this.response.user.username);
        window.localStorage.setItem('_id', this.response.user._id);
        window.localStorage.setItem('email', this.response.user.email);
        if (this.response.success)
          this.loggedIn = true;
      });
    }   

  }

  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('_id');
    window.localStorage.removeItem('email');
    this.loggedIn = false;
  }

}

