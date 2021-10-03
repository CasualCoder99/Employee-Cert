import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './services/route-guard.service';
import { QuestionsComponent } from './questions/questions.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateTestComponent } from './create-test/create-test.component';
import { ResultsComponent } from './results/results.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { TestsComponent } from './tests/tests.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { GiveTestComponent } from './give-test/give-test.component';
import { TestComponent } from './test/test.component';

const routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},  
  {path: 'forgot-password', component: PasswordResetComponent},
  {path: 'home', component: HomeComponent, canActivate: [RouteGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService] },
  {path: 'questions', component: QuestionsComponent, canActivate: [RouteGuardService] },
  {path: 'create-employee', component: CreateEmployeeComponent, canActivate: [RouteGuardService] },
  {path: 'create-test', component: CreateTestComponent, canActivate: [RouteGuardService] },
  {path: 'results', component: ResultsComponent, canActivate: [RouteGuardService] },
  {path: 'test', component: TestComponent, canActivate: [RouteGuardService] },
  {path: 'profile', component: ProfileComponent, canActivate: [RouteGuardService] },
  {path: 'password-reset', component: PasswordResetComponent, canActivate: [RouteGuardService] },
  {path: 'give-test', component: GiveTestComponent, canActivate: [RouteGuardService] },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    LogoutComponent,
    QuestionsComponent,
    CreateTestComponent,
    ResultsComponent,
    CreateEmployeeComponent,
    ProfileComponent,
    PasswordResetComponent,
    GiveTestComponent,
    TestComponent
  ],
  imports: [CommonModule,
    BrowserModule, 
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
