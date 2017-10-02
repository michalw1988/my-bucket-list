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
		if (sessionStorage.getItem('mybucketlist_user')) {
			dataService.loginUser(sessionStorage.getItem('mybucketlist_user'));
			this.router.navigate(['/list']);
		} else {
			this.router.navigate(['/login']);
		}
	}

	checkUserLogged() {
		if (this.dataService.userLogged) {
			return true;
		} else {
			return false;
		}
	}

  title = 'app';
}
