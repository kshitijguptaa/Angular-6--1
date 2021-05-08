import {
  Routes
} from '@angular/router';
import {
  EmployeeMgmtComponent
} from './employee-mgmt/employee-mgmt.component';

export const appRoutes: Routes = [

  {
    path: 'EmpMgmt',
    component: EmployeeMgmtComponent,

  },
  {
    path: '',
    redirectTo: '/EmpMgmt',
    pathMatch: 'full'
  }
];