import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public budgetData = [];
  public data_value;

  public users_budget_data;

  constructor(private http: HttpClient) { }

  public getData() {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token'))
      .split('=')[1];
    const config = {
      headers: { Authorization: 'Bearer ' + cookieValue }
    };
    return axios.get('http://localhost:3000/api/v1/getBudget', config);
  }

  public checkCredentials(user_val, pass_val) {
    console.log('check credentials inside service');
    return axios.get('http://localhost:3000/api/v1/login', {
      auth: {
        username: user_val,
        password: pass_val
      }
    });
  }

  public register_user(first_name, last_name, age_val, gender_val, email_val, password_Val) {
    console.log('check credentials inside service');

    return axios.post('http://localhost:3000/api/v1/signup',
      {
        "firstName": first_name,
        'lastName': last_name,
        'age': age_val,
        'gender': gender_val,
        'email': email_val,
        'password': password_Val
      });
  }

  public add_budget(title, budget, color) {
    var cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token'))
      .split('=')[1];

    const data = {
      "title": title,
      "budget": budget,
      "color": color
    };
    const config = {
      headers: { Authorization: 'Bearer ' + cookieValue },

    };
    return axios.put('http://localhost:3000/api/v1/putBudget', data, config);
  }

  public delete_budget(budget_name) {
    var cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token'))
      .split('=')[1];

    const data = {
      "title": budget_name
    };
    const config = {
      headers: { Authorization: 'Bearer ' + cookieValue },

    };
    return axios.put('http://localhost:3000/api/v1/deleteBudget', data, config);
  }

  public edit_budget(budget_name, budget_amount, budget_color) {
    var cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token'))
      .split('=')[1];

    const data = {
      "title": budget_name,
      "color": budget_color,
      "budget": budget_amount
    };
    const config = {
      headers: { Authorization: 'Bearer ' + cookieValue },

    };
    return axios.put('http://localhost:3000/api/v1/editBudget', data, config);
  }

  public edit_budget_by_month(budget_name, budget_amount, budget_color, month_Value) {
    var cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token'))
      .split('=')[1];

    const data = {
      "title": budget_name,
      "color": budget_color,
      "budget": budget_amount,
      "month": month_Value
    };
    const config = {
      headers: { Authorization: 'Bearer ' + cookieValue },

    };
    return axios.put('http://localhost:3000/api/v1/editBudgetByMonth', data, config);
  }

  public delete_budget_by_month(budget_name, month) {
    var cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token'))
      .split('=')[1];

    const data = {
      "title": budget_name,
      "month": month
    };
    const config = {
      headers: { Authorization: 'Bearer ' + cookieValue },

    };
    return axios.put('http://localhost:3000/api/v1/deleteBudgetByMonth', data, config);
  }

  public putBudgetByMonth(title, budget, color, month_value) {
    var cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('token'))
      .split('=')[1];

    const data = {
      "title": title,
      "budget": budget,
      "color": color,
      "month": month_value
    };
    const config = {
      headers: { Authorization: 'Bearer ' + cookieValue },

    };
    return axios.put('http://localhost:3000/api/v1/putBudgetByMonth', data, config);
  }


}
