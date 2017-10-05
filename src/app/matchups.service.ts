import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//import { HttpClient } from '@angular/common/http';

@Injectable()
export class MatchupsService {

  constructor(private http: Http) { }

  // Get all players from the API
  getAllPlayers() {
    return this.http.get('http://localhost:8000/notes')
    .map(res => res.json());

  }

  getPlayer(id) {
    return this.http.get('http://localhost:8000/notes/' + id)
    .map(res => res.json());
  }

  updateScore(id: String, newScore: Number) {    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.set('score', newScore.toString());

    return this.http.put('http://localhost:8000/notes/' + id, body.toString(), {headers: headers})
    
  }

  newNote() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    var username = "test"
    body.set('score', username);
    
    let options = {
        headers: new Headers().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    
    return this.http
        .post('http://localhost:8000/notes', body.toString(), {headers: headers});

  }
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
