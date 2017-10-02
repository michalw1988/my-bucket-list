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

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  createClick(e) {
  	e.preventDefault();
  	this.accountCreated = false;
  	// console.log(this.username);
  	// console.log(this.password1);
  	// console.log(this.password2);
  	if (this.username == '' || this.password1 == '' || this.password2 == '') {
  		this.errorMessage = 'Fill the entire form.';
  	} else if (this.password1 != this.password2) {
  		this.errorMessage = "Passwords don't match.";
  	} else {
  		this.checkUsername();
  	}
  }

  checkUsername() {
  	this.dataService.checkusernameRequest(this.username).subscribe(response => {
  	  //console.log(response.message);
		  if(response.message === 'Username is free') {
		  	this.createAccount()
			} else {
		  	this.errorMessage = 'This username is already taken.';
			}
		});
  }

  createAccount() {
  	this.dataService.newuserRequest(this.username, this.password1).subscribe(response => {
  		//console.log(response);
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
