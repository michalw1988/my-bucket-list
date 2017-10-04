import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.css']
})
export class NewaccountComponent implements OnInit {

	username = '';
	password1 = '';
	password2 = '';
	errorMessage = '';
	accountCreated = false;
	loaderNeeded = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }


  // Handle click on "Create" button
  createClick(e) {
  	e.preventDefault();
  	this.accountCreated = false;
  	if (this.username == '' || this.password1 == '' || this.password2 == '') { // check if all fields are filled
  		this.errorMessage = 'Fill the entire form.';
  	} else if (this.password1 != this.password2) { // check if apsswords match
  		this.errorMessage = "Passwords don't match.";
  	} else {
  		this.checkUsername(); // if validation passed, check if username is free
  	}
  }


  // Call checkusername request from data service
  checkUsername() {
  	this.loaderNeeded = true;
  	this.dataService.checkusernameRequest(this.username).subscribe(response => {
		  if(response.message === 'Username is free') {
		  	this.createAccount(); // if username is free, creates a new account
			} else {
		  	this.loaderNeeded = false;
		  	this.errorMessage = 'This username is already taken.';
			}
		});
  }


  // Call newuser request from data service
  createAccount() {
  	this.dataService.newuserRequest(this.username, this.password1).subscribe(response => {
  		this.loaderNeeded = false;
  		if(response.message === 'User created') {
  			this.errorMessage = '';
  			this.username = '';
				this.password1 = '';
				this.password2 = '';
  			this.accountCreated = true;
  		}
  	});
  }

}
