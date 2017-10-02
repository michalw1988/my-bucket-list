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

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  changePasswordClick(e) {
  	e.preventDefault();
  	this.passwordChanged = false;
  	if (this.password1 === '' || this.password2 === '') {
  		this.errorMessage = 'Enter both passwords.';
  	} else if (this.password1 != this.password2) {
  		this.errorMessage = "Passwords don't match.";
  	} else {
  		this.changePassword();
  	}
  }

  changePassword() {
  	this.dataService.changepasswordRequest(this.dataService.username, this.password1).subscribe(response => {
  	  this.errorMessage = '';
  	  this.password1 = '';
			this.password2 = '';
  	  this.passwordChanged = true;
  	});
  }

  removeAccountClick(e) {
  	e.preventDefault();
  	this.dataService.deleteuserRequest(this.dataService.username).subscribe(response => {
  	  if(response.message === 'User deleted') {
  	  	this.dataService.logoutUser();
    		this.router.navigate(['/login']);
  	  }
  	});
  }

}
