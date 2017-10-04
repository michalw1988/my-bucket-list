import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	
	password1 = '';
	password2 = '';
	errorMessage = '';
	passwordChanged = false;
	loaderNeeded = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }


  // Handle click on "Change" button
  changePasswordClick(e) {
  	e.preventDefault();
  	this.passwordChanged = false;
  	if (this.password1 === '' || this.password2 === '') { // check if both passwords are entered
  		this.errorMessage = 'Enter both passwords.';
  	} else if (this.password1 !== this.password2) { // check if passwords are identical
  		this.errorMessage = "Passwords don't match.";
  	} else {
  		this.changePassword(); // change password if validation passed
  	}
  }


  // Call changepassword request from data service 
  changePassword() {
  	this.loaderNeeded = true;
  	this.dataService.changepasswordRequest(this.dataService.username, this.password1).subscribe(response => {
  		this.loaderNeeded = false;
  	  this.errorMessage = '';
  	  this.password1 = '';
			this.password2 = '';
  	  this.passwordChanged = true;
  	});
  }


  // Handle click on "Confirm" button for removing user's account
  removeAccountClick(e) {
  	e.preventDefault();
  	this.loaderNeeded = true;
  	// Call deleteuser request from data service
  	this.dataService.deleteuserRequest(this.dataService.username).subscribe(response => {
  		this.loaderNeeded = false;
  	  if(response.message === 'User deleted') {
  	  	// Log the user out, removes his username from session storage and navigate him to login page
  	  	this.dataService.logoutUser();
  	  	sessionStorage.removeItem('mybucketlist_user');
    		this.router.navigate(['/login']);
  	  }
  	});
  }

}