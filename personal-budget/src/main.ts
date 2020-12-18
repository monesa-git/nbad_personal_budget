import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import axios from 'axios';

if (environment.production) {
  enableProdMode();
}
var seconds = 60;
var timer;


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

start_timer();

function myFunction() {
  if (seconds > 15) {
    console.log(seconds);
    seconds--;
  } else {
    clearInterval(timer);
    var confirm_status = confirm("Your token will be expired in 15 seconds. Do you want to refresh your token?");
    if (confirm_status == true) {
      refresh_token().then(function (res) {
        document.cookie = "token = ";
        console.log(res.data.token);
        document.cookie = 'token = ' + res.data.token;
        seconds = 60;
        start_timer();
      }).catch(function (err) {
        alert(err.response.data.error);
      });
    } else {
      console.log("user pressed cancel");
    }
  }
}

function start_timer() {
  timer = window.setInterval(function () {
    myFunction();
  }, 1000);
}


function refresh_token() {
  var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))
    .split('=')[1];

  const config = {
    headers: { Authorization: 'Bearer ' + cookieValue },

  };
  return axios.get('http://104.131.167.38:3000/api/v1/refreshToken', config);
}
