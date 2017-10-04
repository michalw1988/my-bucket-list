import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private dataService: DataService, private router: Router) { 
		// if username is stored in the session storage, then user is automatically logged in
		if (sessionStorage.getItem('mybucketlist_user')) {
			dataService.loginUser(sessionStorage.getItem('mybucketlist_user'));
			this.router.navigate(['/list']); // navigation to main page for logged in user
		} else {
			this.router.navigate(['/login']); // navigation to main page for logged out user
		}
	}
	
}
