import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DataTablesModule } from 'angular-datatables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pb-add-buget',
  templateUrl: './add-buget.component.html',
  styleUrls: ['./add-buget.component.scss']
})
export class AddBugetComponent implements OnInit {
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
    });

    //getting the month and the year
    var start = (document.getElementById('start') as HTMLInputElement).value;
    //fetching only month in it.
    var month = start.split("-");
    var month_value = month[1] - 1;

    this.http.get('http://localhost:3000/api/v1/getBudgetByMonth/' + month_value, { headers })
      .subscribe(posts => {
        this.posts = posts.user_budget;

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

  addBudgetByMonth() {
    console.log("hello getting here");
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const budget = (document.getElementById('amount') as HTMLInputElement).value;
    const color = (document.getElementById('color') as HTMLInputElement).value;

    //getting the month and the year
    var start = (document.getElementById('start') as HTMLInputElement).value;
    //fetching only month in it.
    var month = start.split("-");
    var month_value = month[1] - 1;

    console.log(color);

    this.dataService.putBudgetByMonth(title, budget, color, month_value).then(function (res) {
      alert("Budget has been added successfully");
      window.location = '/add-budget';
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
    //getting the month and the year
    var start = (document.getElementById('start') as HTMLInputElement).value;
    //fetching only month in it.
    var month = start.split("-");
    var month_value = month[1] - 1;
    const editBudgetTitle = (document.getElementById('edit-title') as HTMLInputElement).value;
    const editBudgetAmount = (document.getElementById('edit-amount') as HTMLInputElement).value;
    const editBudgetColor = (document.getElementById('edit-color') as HTMLInputElement).value;
    var confirm_status = confirm("Are you sure you want to edit " + editBudgetTitle);
    if (confirm_status == true) {
      this.dataService.edit_budget_by_month(editBudgetTitle, editBudgetAmount, editBudgetColor, month_value).then(function (res) {
        window.location = '/add-budget';
      }).catch(function (err) {
        alert(err.response.data.error);
      });
    } else {
      console.log("user pressed cancel");
    }
  }

  deleteBudgetByMonth(deleteBudgetTitle) {
    //getting the month and the year
    var start = (document.getElementById('start') as HTMLInputElement).value;
    //fetching only month in it.
    var month = start.split("-");
    var month_value = month[1] - 1;

    var confirm_status = confirm("Are you sure you want to delete " + deleteBudgetTitle);
    if (confirm_status == true) {
      this.dataService.delete_budget_by_month(deleteBudgetTitle, month_value).then(function (res) {
        window.location = '/add-budget';
      }).catch(function (err) {
        alert(err.response.data.error);
      });
    } else {
      console.log("user pressed cancel");
    }
  }

}
