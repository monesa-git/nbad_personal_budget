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
    this.getData();
  }

  getData() {
    this.dataService.getData().then(function (res) {
      console.log(res.data)
      if (res.data.user_budget.length == 0) {
        alert('Welcome to the Personal Budget app. As a first step please add your budgets in the page opened');
        window.location.href = '/budget';
      } else {
        //Still have to try this one out
        //Load the chart thingy here
        window.location.href = '/budget-detail'
      }
    }).catch(function (err) {
      alert(err.response.data.error);
    });
  }




}
