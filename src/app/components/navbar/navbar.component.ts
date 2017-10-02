import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  logoutClick(e) {
    e.preventDefault();
    sessionStorage.removeItem('mybucketlist_user');
    this.dataService.logoutUser();
    this.router.navigate(['/login']);
  }
  
}
