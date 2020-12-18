import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';
import { DataTablesModule } from 'angular-datatables';
import { Chart } from 'chart.js';


@Component({
  selector: 'pb-budget-month',
  templateUrl: './budget-month.component.html',
  styleUrls: ['./budget-month.component.scss']
})
export class BudgetMonthComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  posts;
  total_amount = 0;


  //This is for Chart js
  public dataChart = {
    datasets: [{
      data: [],
      backgroundColor: [],
    }],

    labels: []
  };

  public data;

  constructor(private http: HttpClient, public dataService: DataService) { }

  ngOnInit(): void {
    this.getBudgetData();
  }

  getBudgetData() {
    this.dataChart = {
      datasets: [{
        data: [],
        backgroundColor: [],
      }],

      labels: []
    };
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token'))
      .split('=')[1];

    //getting the month and the year
    var start = (document.getElementById('start') as HTMLInputElement).value;
    //fetching only month in it.
    var month = start.split("-");
    var month_value = parseInt(month[1]) - 1;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookieValue}`
    })

    this.http.get('http://104.131.167.38:3000/api/v1/getBudgetByMonth/' + month_value, { headers })
      .subscribe(posts => {
        console.log(posts["user_budget"])
        this.posts = posts["user_budget"];
        this.dataService.budgetData = posts["user_budget"];

        var result_budget = posts["user_budget"];

        var dt = this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          scrollY: "400px",
          scrollCollapse: true
        };


        for (var i = 0; i < result_budget.length; i++) {
          this.dataChart.datasets[0].data[i] = result_budget[i].budget;
          this.total_amount += parseInt(result_budget[i].budget);
          this.dataChart.labels[i] = result_budget[i].title;
          this.dataChart.datasets[0].backgroundColor[i] = result_budget[i].color;
        }
        this.chart_display()
        this.getAllotedBudget()

      }, error => {
        alert(error.error.error);
        window.location.href = '/'
      });
  }

  createPieChart() {
    const ctx = document.getElementById('pie-chart');
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataChart
    });
  }

  createDoughNutChart() {
    const ctx = document.getElementById('doughnut-chart');
    const myDouhnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: this.dataChart
    });
  }

  createBarChart() {
    const ctx = document.getElementById('bar-chart');
    const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: this.dataChart,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createLineChart() {

    const ctx = document.getElementById('line-chart');
    const mylineChart = new Chart(ctx, {
      animationEnabled: true,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      backgroundColor: "white",
      theme: "light2",
      type: 'line',
      data: this.dataChart
    });
  }



  chart_display() {

    this.createPieChart();
    this.createDoughNutChart();
    this.createBarChart();
    this.createLineChart();

  }

  getAllotedBudget() {

  }

}
