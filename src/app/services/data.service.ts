import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  //url = 'http://localhost:3000';
  url = 'https://my-bucket-list-api.herokuapp.com';
  options;
  headers;

  userLogged = false;
  username = '';

  constructor(public http:Http) {
  	console.log('Data service connected...');
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.options = new RequestOptions({ headers: this.headers });
  }

  loginUser(username) {
    this.userLogged = true;
    this.username = username;
  }

  logoutUser() {
    this.username = '';
    this.userLogged = false;
  }



  loginRequest(username, password) {
    //const username = 'rafal';
    //const password = '123';
  	return this.http.post(`${this.url}/login`,
  		`username=${username}&password=${password}`, this.options)
  		.map(res => res.json());
  }

  getuserRequest(username) {
    //const username = 'marek';
    return this.http.post(`${this.url}/getuser`,
      `username=${username}`, this.options)
      .map(res => res.json());
  }

  checkusernameRequest(username) {
    //const username = 'rafal';
    return this.http.post(`${this.url}/checkusername`,
      `username=${username}`, this.options)
      .map(res => res.json());
  }

  newuserRequest(username, password) {
    //const username = 'alex';
    //const password = '111';
    return this.http.post(`${this.url}/newuser`,
      `username=${username}&password=${password}`, this.options)
      .map(res => res.json());
  }

  changepasswordRequest(username, password) {
    //const username = 'yeti';
    //const password = '123';
    return this.http.post(`${this.url}/changepassword`,
      `username=${username}&password=${password}`, this.options)
      .map(res => res.json());
  }

  deleteuserRequest(username) {
    //const username = 'yeti';
    return this.http.post(`${this.url}/deleteuser`,
      `username=${username}`, this.options)
      .map(res => res.json());
  }

  addgoalRequest(username, goal, dateAdded) {
    //const username = 'yeti';
    //const goal = 'Climb Gerlach';
    //const dateAdded = '2017-01-02';
    return this.http.post(`${this.url}/addgoal`,
      `username=${username}&goal=${goal}&dateAdded=${dateAdded}`, this.options)
      .map(res => res.json());
  }

  completegoalRequest(username, id, dateDone) {
    //const username = 'michal';
    //const id = '2220527531';
    //const dateDone = '2018-03-03';
    return this.http.post(`${this.url}/completegoal`,
      `username=${username}&id=${id}&dateDone=${dateDone}`, this.options)
      .map(res => res.json());
  }

  editgoalRequest() {
    const username = 'michal';
    const id = '2220527531';
    const goal = 'Climb Gerlach in Winter!';
    const dateAdded = '2017-01-01';
    const done = true;
    const dateDone = '2018-03-03';
    return this.http.post(`${this.url}/editgoal`,
      `username=${username}&id=${id}&goal=${goal}&dateAdded=${dateAdded}&done=${done}&dateDone=${dateDone}`, this.options)
      .map(res => res.json());
  }

  deletegoalRequest(username, id) {
    //const username = 'yeti';
    //const id = '5373977842';
    return this.http.post(`${this.url}/deletegoal`,
      `username=${username}&id=${id}`, this.options)
      .map(res => res.json());
  }

}
