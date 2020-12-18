import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { RegisterComponent } from './register/register.component';
import { BudgetComponent } from './budget/budget.component';
import { BudgetMonthComponent } from './budget-month/budget-month.component';
import { AddBugetComponent } from './add-buget/add-buget.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'budget',
    component: BudgetComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'budget-detail',
    component: BudgetMonthComponent
  },
  {
    path: 'add-budget',
    component: AddBugetComponent
  },
  {
    path: '**',
    component: P404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
