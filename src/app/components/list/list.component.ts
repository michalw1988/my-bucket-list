import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	userData:any = '';
	goalsCount = 0;
	newGoal = '';
	goalId;

  constructor(private dataService: DataService) {
  	this.getUserData();
  }

  ngOnInit() {
  }

  getUserData() {
  	this.dataService.getuserRequest(this.dataService.username).subscribe(response => {
  	  this.userData = response.data[0];
  	  this.goalsCount = response.data[0].list.length;
  	});
  }

  addGoalClick(e) {
  	e.preventDefault();
  	const todayDate = (new Date()).toISOString().split('T')[0];
  	if (this.newGoal !== '') {
	  	this.dataService.addgoalRequest(this.dataService.username, this.newGoal, todayDate).subscribe(response => {
	  	  //console.log(response);
	  	  this.getUserData();
	  	  this.newGoal = '';
	  	});
  	}
  }

  completeGoalClick(e) {
  	const todayDate = (new Date()).toISOString().split('T')[0];
  	this.dataService.completegoalRequest(this.dataService.username, e.target.id, todayDate).subscribe(response => {
  	  //console.log(response);
	  	this.getUserData();
  	});
  }


  saveGoalId(e) {
  	this.goalId = e.target.id;
  }

  deleteGoalClick(e) {
  	this.dataService.deletegoalRequest(this.dataService.username, this.goalId).subscribe(response => {
  	  //console.log(response);
	  	this.getUserData();
  	});

  }


}
