import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username;
	password;
	loginError = false;
  loaderNeeded = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }


  // Handle click on "Login" button
  loginClick(e) {
  	e.preventDefault();
    this.loaderNeeded = true;
    // Call login reqest from data service
  	this.dataService.loginRequest(this.username, this.password).subscribe(response => {
      this.loaderNeeded = false;
      if(response.message === 'Login OK') { // if login and passwords are correct, log the user in
      	this.loginError = false;
  			this.dataService.loginUser(this.username);
  			sessionStorage.setItem('mybucketlist_user', this.username); // save his username in session storage
        this.router.navigate(['/list']); // redirect to list route
  		} else { // if login or password are incorrect, show error alert
      	this.loginError = true;
  		}
    });
  }

}
