import { Injectable } from '@angular/core';
// import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ListItem } from './models/list-item';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { RankItem } from './models/rank-item';

@Injectable()
export class MatchupsService {

  constructor(private http: HttpClient) { }
  url = 'https://matchups-backend.ml:8000/'

  /*tokenHeader = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': token
    })
  };*/

  noTokenHeader = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

  /*testPost(token) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token
      })
    };

    var data = {'username': 'testing', 'password': 'the post'};

    return this.http.post(this.url + 'auth/', JSON.stringify(data), httpOptions)
        // .map(res => console.log(res));

  }*/

  // Get all players from the API
  getAllItems(chosenList) {
    return this.http.get<RankItem[]>(this.url + 'matchups/' + chosenList)
    // .map(res => res.json());

  }

  getNewItems() {
    return this.http.get(this.url + 'new')
    // .map(res => res.json());
  }

  getListTitles() {
    return this.http.get(this.url + 'all-lists')
    // .map(res => res.json());
  }

  getListInfo(list) {
    return this.http.get(this.url + 'list-info/' + list)
    // .map(res => res.json());
  }

  getFeed() {
     return this.http.get(this.url + 'feed')
    // .map(res => res.json());
  }

  login(username, password) {
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');

    
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };*/

    // let body = new URLSearchParams();
    // body.set('username', username.toLowerCase());
    // body.set('password', password);

    var body = {'username': username.toLowerCase(), 'password': password};
    // body['username'] = username.toLowerCase();
    // body['password'] = password;

    // return this.http.post(this.url + 'signin', JSON.stringify(body), {headers: headers})

    return this.http.post(this.url + 'signin', body, this.noTokenHeader)
    // .map(res => res.json());
  }

  signup(username, email, password) {
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
 
    const user = {"username": username.toLowerCase(), "email": email.toLowerCase(), "password": password};

    return this.http.post(this.url + 'signup', JSON.stringify(user), this.noTokenHeader)
    // .map(res => res.json());  
  }

  updateScore(username, listTitle, id1: Number, newScore1: Number, newVote1: Number, id2: Number, newScore2: Number, newVote2: Number) {    
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append('Content-Type', 'application/json');   

    /*const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };*/ 

    /*let body = new URLSearchParams();
    body.set('id1', id1);
    body.set('score1', newScore1.toString());
    body.set('newVote1', newVote1.toString());
    body.set('id2', id2);
    body.set('score2', newScore2.toString());
    body.set('newVote2', newVote2.toString());*/
  
    // send in two lists
    
    var list = [];
    var el1 = {};
    el1['id1'] = id1;
    el1['score1'] = newScore1;
    el1['newVote1'] = newVote1;
    list.push(el1);
    var el2 = {};
    el2['id2'] = id2;
    el2['score2'] = newScore2;
    el2['newVote2'] = newVote2; 
    list.push(el2);

    var body = { foo: list, user: username };

    return this.http.put(this.url + 'matchups/' + listTitle, JSON.stringify(body), this.noTokenHeader);
    
  }

  addList(data: string, token) {
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', token);
    // console.log(headers);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token
      })
    };

    // console.log(httpOptions);

    return this.http.post(this.url + 'auth/add-list', data.toString(), httpOptions)
      // .map(res => console.log(res)); 
  }

  addItem(item) {
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');

    return this.http.post(this.url + 'add-item', item, this.noTokenHeader);
  }

  // newNote() {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //   let body = new URLSearchParams();
  //   var username = "test"
  //   body.set('score', username);
    
  //   let options = {
  //       headers: new Headers().set('Content-Type', 'application/x-www-form-urlencoded')
  //   };
    
  //   return this.http
  //       .post('http://localhost:8000/notes', body.toString(), {headers: headers});

  // }
  // getBooksWithObservable(): Observable<Any> {
  //   return this.http.get(this.url)
  //       .map(this.extractData)
  //       .catch(this.handleErrorObservable);
  // } 

  // private extractData(res: Response) {
  //   let body = res.json();
  //   return body;
  // }
  // private handleErrorObservable (error: Response | any) {
  //   console.error(error.message || error);
  //   return Observable.throw(error.message || error);
  // }
  // private handleErrorPromise (error: Response | any) {
  //   console.error(error.message || error);
  //   return Promise.reject(error.message || error);
  // }	

}
