// built-in
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  RouterModule
} from '@angular/router';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
// components
import {
  AppComponent
} from './app.component';
//routes
import {
  appRoutes
} from './routes';
import {
  UserService
} from './shared/user.service';
//other
import {
  FileSelectDirective
} from 'ng2-file-upload';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  NgMultiSelectDropDownModule
} from 'ng-multiselect-dropdown';
import {
  MatListModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule
} from '@angular/material';
import {
  EmployeeMgmtComponent
} from './employee-mgmt/employee-mgmt.component';
@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    EmployeeMgmtComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatOptionModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  exports: [MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ]

})
export class AppModule {}
