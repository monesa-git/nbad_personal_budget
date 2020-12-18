import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { DataService } from './data.service';
import { RegisterComponent } from './register/register.component';
import { BudgetComponent } from './budget/budget.component';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BudgetMonthComponent } from './budget-month/budget-month.component';
import { AddBugetComponent } from './add-buget/add-buget.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomepageComponent,
    ArticleComponent,
    LoginComponent,
    P404Component,
    RegisterComponent,
    BudgetComponent,
    BudgetMonthComponent,
    AddBugetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    FontAwesomeModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
