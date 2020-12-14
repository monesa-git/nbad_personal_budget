import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DataTablesModule } from 'angular-datatables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'pb-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  posts;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  constructor(public dataService: DataService, private http: HttpClient) { }

  ngOnInit(): void {

    var edit_form = document.getElementById("edit-form") as HTMLElement;
    edit_form.style.display = "none";
    this.getBudgetData();

  }

  getBudgetData() {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token'))
      .split('=')[1];

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookieValue}`
    })

    this.http.get('http://localhost:3000/api/v1/getBudget', { headers })
      .subscribe(posts => {
        this.posts = posts.user_budget.allotedBudget;

        var dt = this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          scrollY: "400px",
          scrollCollapse: true
        };
      }, error => {
        alert("Token has expired. Please login again");
        window.location = '/'
      });
  }

  addBudget() {
    console.log("hello getting here");
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const budget = (document.getElementById('amount') as HTMLInputElement).value;
    const color = (document.getElementById('color') as HTMLInputElement).value;

    console.log(color);

    this.dataService.add_budget(title, budget, color).then(function (res) {
      alert("Budget has been added successfully");
      window.location = '/budget';
    }).catch(function (err) {
      alert(err.response.data.error);
    });
  }

  editBudget(editBudgetTitle, editBudgetAmount, editBudgetColor) {
    // alert("hello it is editBudget : " + editBudgetTitle);
    var edit_form = document.getElementById("edit-form") as HTMLElement;
    edit_form.style.display = "";
    (document.getElementById('edit-title') as HTMLInputElement).value = editBudgetTitle;
    (document.getElementById('edit-amount') as HTMLInputElement).value = editBudgetAmount;
    (document.getElementById('edit-color') as HTMLInputElement).value = editBudgetColor;

  }

  editButtonSubmit() {
    const editBudgetTitle = (document.getElementById('edit-title') as HTMLInputElement).value;
    const editBudgetAmount = (document.getElementById('edit-amount') as HTMLInputElement).value;
    const editBudgetColor = (document.getElementById('edit-color') as HTMLInputElement).value;
    var confirm_status = confirm("Are you sure you want to edit " + editBudgetTitle);
    if (confirm_status == true) {
      this.dataService.edit_budget(editBudgetTitle, editBudgetAmount, editBudgetColor).then(function (res) {
        window.location = '/budget';
      }).catch(function (err) {
        alert(err.response.data.error);
      });
    } else {
      console.log("user pressed cancel");
    }
  }

  deleteBudget(deleteBudgetTitle) {
    var confirm_status = confirm("Are you sure you want to delete " + deleteBudgetTitle);
    if (confirm_status == true) {
      this.dataService.delete_budget(deleteBudgetTitle).then(function (res) {
        window.location = '/budget';
      }).catch(function (err) {
        alert(err.response.data.error);
      });
    } else {
      console.log("user pressed cancel");
    }
  }

}
