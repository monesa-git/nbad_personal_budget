import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  router = Router;
  constructor(public dataService: DataService, router: Router) { }

  ngOnInit(): void {

  }

  checkCredentials() {

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    this.dataService.checkCredentials(username, password)
      .then(function (res) {
        console.log(res.data);
        document.cookie = 'token = ' + res.data.token;
        window.location = '/home';
        // this.router.navigate(['/home']);
      }).catch(function (err) {
        alert(err.response.data.error);
      });

  }
  register() {
    window.location = '/register';
  }

}
