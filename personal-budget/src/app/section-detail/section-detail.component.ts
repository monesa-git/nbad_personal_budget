import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.scss']
})
export class SectionDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("in section details")
  }

}
