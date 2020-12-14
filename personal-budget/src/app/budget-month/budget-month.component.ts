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
    var month_value = month[1] - 1;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookieValue}`
    })

    this.http.get('http://localhost:3000/api/v1/getBudgetByMonth/' + month_value, { headers })
      .subscribe(posts => {
        console.log(posts.user_budget)
        this.posts = posts.user_budget;
        this.dataService.budgetData = posts.user_budget;

        var result_budget = posts.user_budget;

        // var dt = this.dtOptions = {
        //   pagingType: 'full_numbers',
        //   pageLength: 5,
        //   processing: true,
        //   scrollY: "400px",
        //   scrollCollapse: true
        // };


        console.log(posts.user_budget);
        for (var i = 0; i < result_budget.length; i++) {
          this.dataChart.datasets[0].data[i] = result_budget[i].budget;
          this.dataChart.labels[i] = result_budget[i].title;
          this.dataChart.datasets[0].backgroundColor[i] = result_budget[i].color;
        }
        this.chart_display()

        this.getAllotedBudget()

      });
  }

  createPieChart() {
    // var ctx = document.getElementById("myChart").getContext("2d");
    const ctx = document.getElementById('pie-chart');
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataChart
    });
  }

  createDoughNutChart() {
    // var ctx = document.getElementById("myChart").getContext("2d");

    const ctx = document.getElementById('doughnut-chart');
    const myPieChart = new Chart(ctx, {
      type: 'doughnut',
      data: this.dataChart
    });
  }

  createBarChart() {
    // var ctx = document.getElementById("myChart").getContext("2d");

    const ctx = document.getElementById('bar-chart');
    const myPieChart = new Chart(ctx, {
      type: 'bar',
      data: this.dataChart
    });
  }

  createLineChart() {
    // var ctx = document.getElementById("myChart").getContext("2d");

    const ctx = document.getElementById('line-chart');
    const myPieChart = new Chart(ctx, {
      type: 'line',
      data: this.dataChart
    });
  }



  chart_display() {
    var display_type = (document.getElementById('display') as HTMLInputElement).value;
    console.log(display_type);
    var pie = (document.getElementById('pie-chart-container') as HTMLInputElement);
    var doughnut = (document.getElementById('doughnut-chart-container') as HTMLInputElement);
    var bar = (document.getElementById('bar-chart-container') as HTMLInputElement);
    var line = (document.getElementById('line-chart-container') as HTMLInputElement);
    var table = (document.getElementById('table-id-area') as HTMLInputElement);
    if (display_type == 'piechart') {
      this.createPieChart();
      pie.style.display = "";
      doughnut.style.display = "none";
      bar.style.display = "none";
      line.style.display = "none";
      table.style.display = "none";
    } else if (display_type == 'doughnut') {
      this.createDoughNutChart();
      pie.style.display = "none";
      doughnut.style.display = "";
      bar.style.display = "none";
      line.style.display = "none";
      table.style.display = "none";
    } else if (display_type == 'barchart') {
      this.createBarChart();
      pie.style.display = "none";
      doughnut.style.display = "none";
      bar.style.display = "";
      line.style.display = "none";
      table.style.display = "none";
    } else if (display_type == 'linechart') {
      this.createLineChart();
      pie.style.display = "none";
      doughnut.style.display = "none";
      bar.style.display = "none";
      table.style.display = "none";
      line.style.display = "";
    } else if (display_type == 'table') {
      pie.style.display = "none";
      doughnut.style.display = "none";
      bar.style.display = "none";
      table.style.display = "";
      line.style.display = "none";
      var dt = this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        scrollY: "400px",
        scrollCollapse: true
      };
    }
  }

  getAllotedBudget() {

  }

}
