import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  url = 'https://my-bucket-list-api.herokuapp.com';
  options;
  headers;
  userLogged = false;
  username = '';

  constructor(public http:Http) {
  	console.log('Data service connected...');
    // Headers for API requests
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.options = new RequestOptions({ headers: this.headers });
  }


  // Set user as logged in
  loginUser(username) {
    this.userLogged = true;
    this.username = username;
  }


  // Set user as logged out
  logoutUser() {
    this.username = '';
    this.userLogged = false;
  }


  // Checks if given username and password pair exists in the database
  loginRequest(username, password) {
  	return this.http.post(`${this.url}/login`,
  		`username=${username}&password=${password}`, this.options)
  		.map(res => res.json());
  }


  // Gets all data for given username from the database
  getuserRequest(username) {
    return this.http.post(`${this.url}/getuser`,
      `username=${username}`, this.options)
      .map(res => res.json());
  }


  // Checks if given username exists in the database
  checkusernameRequest(username) {
    return this.http.post(`${this.url}/checkusername`,
      `username=${username}`, this.options)
      .map(res => res.json());
  }


  // Creates new user in the database and assigns him a password
  newuserRequest(username, password) {
    return this.http.post(`${this.url}/newuser`,
      `username=${username}&password=${password}`, this.options)
      .map(res => res.json());
  }


  // Chagnes password for given username
  changepasswordRequest(username, password) {
    return this.http.post(`${this.url}/changepassword`,
      `username=${username}&password=${password}`, this.options)
      .map(res => res.json());
  }


  // Removes given user from the database
  deleteuserRequest(username) {
    return this.http.post(`${this.url}/deleteuser`,
      `username=${username}`, this.options)
      .map(res => res.json());
  }


  // Adds new goal for given user
  addgoalRequest(username, goal, dateAdded) {
    return this.http.post(`${this.url}/addgoal`,
      `username=${username}&goal=${goal}&dateAdded=${dateAdded}`, this.options)
      .map(res => res.json());
  }


  // For given user, marks goal with given id as done and sets a completion date
  completegoalRequest(username, id, dateDone) {
    return this.http.post(`${this.url}/completegoal`,
      `username=${username}&id=${id}&dateDone=${dateDone}`, this.options)
      .map(res => res.json());
  }


  // For given user, assigns new values for goal with given id
  editgoalRequest(username, id, goal, dateAdded, done, dateDone) {
    return this.http.post(`${this.url}/editgoal`,
      `username=${username}&id=${id}&goal=${goal}&dateAdded=${dateAdded}&done=${done}&dateDone=${dateDone}`, this.options)
      .map(res => res.json());
  }


  // For given user, removes goal with given id
  deletegoalRequest(username, id) {
    return this.http.post(`${this.url}/deletegoal`,
      `username=${username}&id=${id}`, this.options)
      .map(res => res.json());
  }
}
