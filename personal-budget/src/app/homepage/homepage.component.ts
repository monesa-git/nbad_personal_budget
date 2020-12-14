import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {




  // This is for Chart js
  public dataChart = {
    datasets: [{
      data: [],
      backgroundColor: [],
    }],

    labels: []
  };


  // THis is for D3JS chart
  //  public data = [
  //   {Framework: 'Vue', Stars: '166443', Released: '2014'},
  //   {Framework: 'React', Stars: '150793', Released: '2013'},
  //   {Framework: 'Angular', Stars: '62342', Released: '2016'},
  //   {Framework: 'Backbone', Stars: '27647', Released: '2010'},
  //   {Framework: 'Ember', Stars: '21471', Released: '2011'},
  // ];

  private svg;
  private margin = 50;
  private width = 600;
  private height = 500;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  public data;


  // private data_value = 'jell';

  constructor(public dataService: DataService) {

  }

  ngOnInit(): void {
    // console.log(this.dataService.budgetData);
    // if (this.dataService.budgetData == undefined || this.dataService.budgetData.length == 0){
    //   console.log('It is coming to the if part as there is no data and the page has been reloaded');
    //   this.dataService.getData().subscribe((res: any) => {
    //     console.log(res);
    //     this.dataService.budgetData = res.MyBudget;
    //     for (let i = 0; i < res.myBudget.length; i++){
    //       this.dataChart.datasets[0].data[i] = res.myBudget[i].budget;
    //       this.dataChart.labels[i] = res.myBudget[i].title;
    //       this.dataChart.datasets[0].backgroundColor[i] = res.myBudget[i].color;
    //     }
    //     // rendering the chart js chart
    //     this.createChart();
    //     this.data = res.myBudget;

    //     // rendering the D3js chart
    //     this.createSvg();
    //     this.createColors();
    //     this.drawChart();
    //   });
    // }else{
    //   // dataservice is already there.. so
    //   console.log('It is coming to else part where the dataservice is already there');
    //   for (let i = 0; i < this.dataService.budgetData.length; i++){
    //     this.dataChart.datasets[0].data[i] = this.dataService.budgetData[i].budget;
    //     this.dataChart.labels[i] = this.dataService.budgetData[i].title;
    //     this.dataChart.datasets[0].backgroundColor[i] = this.dataService.budgetData[i].color;
    //   }

    //   // rendering the chart js chart
    //   this.createChart();

    //   this.data = this.dataService.budgetData;

    //   // rendering the D3js chart
    //   this.createSvg();
    //   this.createColors();
    //   this.drawChart();
    // }

    // tslint:disable-next-line: only-arrow-functions
    // tslint:disable-next-line: typedef

    this.getData();
    // console.log("inside value : ", value);

  }

  getData() {
    this.dataService.getData().then(function (res) {
      console.log(res.data)
      if (res.data.user_budget.length == 0) {
        alert('Welcome to the Personal Budget app. As a first step please add your budgets in the page opened');
        window.location = '/budget';
      } else {
        //Still have to try this one out
        //Load the chart thingy here
        window.location = '/budget-detail'
      }
    }).catch(function (err) {
      alert(err.response.data.error);
    });
  }




}
