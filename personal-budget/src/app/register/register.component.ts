import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  register_user() {

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const firstname = (document.getElementById('firstname') as HTMLInputElement).value;
    const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
    const age = (document.getElementById('age') as HTMLInputElement).value;
    const gender = (document.getElementById('gender') as HTMLInputElement).value;

    this.dataService.register_user(firstname, lastname, age, gender, username, password)
      .then(function (res) {
        console.log(res.data);
        document.cookie = 'token = ' + res.data.token;
        window.location = '/home';
      }).catch(function (err) {
        console.log(err);
      });

  }
}
