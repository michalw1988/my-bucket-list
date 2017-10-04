import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	userData: any = '';
	goalsCount = 0;
	goalId;
	newGoal = '';
	addErrorMessage = '';
	editedGoal;
	editedDateAdded;
	editedDone;
	editedDateDone;
	editErrorMessage = '';
	loaderNeeded = false;

  constructor(private dataService: DataService) {
  	this.getUserData();
  }

  ngOnInit() {
  }


  // Call getuser request from data service
  getUserData() {
  	this.loaderNeeded = true;
  	this.dataService.getuserRequest(this.dataService.username).subscribe(response => {
  		this.loaderNeeded = false;
  	  this.userData = response.data[0]; // load all user data into an object
  	  this.goalsCount = response.data[0].list.length; // get current number of user's goals
  	});
  }


  // Handle "Add" button click on Add goal pop-up
  addGoalClick(e) {
  	e.preventDefault();
  	const todayDate = (new Date()).toISOString().split('T')[0]; // get current date
  	if (this.newGoal === '') { // check if goal description is not empty
  		this.addErrorMessage = 'Goal cannot be empty.'; // display error if it is empty
  	} else { // or add it to database if it's not empty
  		this.loaderNeeded = true;
  		// call addgoal request from data service
	  	this.dataService.addgoalRequest(this.dataService.username, this.newGoal, todayDate).subscribe(response => {
	  		this.loaderNeeded = false;
	  	  this.getUserData(); // get all user data once again
	  	  this.newGoal = '';
	  	  this.addErrorMessage = '';
	  	  $('#addGoalModal').modal('toggle'); // close Add goal modal
	  	});
  	}
  }


  // Handle "I did it!" button click
  completeGoalClick(e) {
  	const todayDate = (new Date()).toISOString().split('T')[0]; // get current date
  	this.loaderNeeded = true;
  	// Call completegoal request from data service
  	this.dataService.completegoalRequest(this.dataService.username, e.target.id, todayDate).subscribe(response => {
  		this.loaderNeeded = false;
	  	this.getUserData(); // get all user data once again
  	});
  }


  // Temporarely save a goal id
  saveGoalId(e) {
  	this.goalId = e.target.id;
  }


  // Temporarely save all goal data for a goal with given id
  saveGoalData(e) {
  	for (let goal of this.userData.list) { // find a goal on user's list
  		if (goal.id === e.target.id) { // if match found, save the data
  			this.goalId = goal.id;
  			this.editedGoal = goal.goal;
  			this.editedDateAdded = goal.date_added;
  			this.editedDone = goal.done;
  			this.editedDateDone = goal.date_done;
  			this.editErrorMessage = '';
  		}
  	}
  }


  // Handle "Save" button click on Edit goal pop-up
	editGoalClick(e) {
		if ( // check if all fields are filled
			(this.editedDone && (this.editedGoal === '' || this.editedDateAdded === '' || this.editedDateDone === '')) || // when goal is done
			(!this.editedDone && (this.editedGoal === '' || this.editedDateAdded === '')) // when goal is not done
		) {
			this.editErrorMessage = 'Please enter all data.';
		} else { // if validation passed send edited goal data to the API
			if (this.editedDone == 'false') { // if goal is changed to not done, remove its completion date
				this.editedDateDone = '';
			}
			// call editgoal request from data service
			this.loaderNeeded = true;
	  	this.dataService.editgoalRequest(
	  		this.dataService.username, 
	  		this.goalId, 
	  		this.editedGoal, 
	  		this.editedDateAdded, 
	  		this.editedDone, 
	  		this.editedDateDone
	  	).subscribe(response => {
	  		this.loaderNeeded = false;
	  		$('#editGoalModal').modal('toggle'); // close Edit goal modal
		  	this.getUserData(); // get all user data once again
	  	});
		}
	}


	// Handle "Confirm" button click on Delete goal pop-up
  deleteGoalClick(e) {
  	this.loaderNeeded = true;
  	// call deletegoal request from data service
  	this.dataService.deletegoalRequest(this.dataService.username, this.goalId).subscribe(response => {
  		this.loaderNeeded = false;
	  	this.getUserData(); // get all user data once again
  	});
  }
}
