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

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  loginClick(e) {
  	e.preventDefault();

  	this.dataService.loginRequest(this.username, this.password).subscribe(response => {
      //console.log(response.message);
      if(response.message === 'Login OK') {
      	this.loginError = false;
  			this.dataService.loginUser(this.username);

  			sessionStorage.setItem('mybucketlist_user', this.username);

        this.router.navigate(['/list']);

  		} else {
      	this.loginError = true;
  		}
    });
  }

}
