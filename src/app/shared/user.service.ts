import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  environment
} from '../../environments/environment';
import {
  User
} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    hobbies: '',
    empType: '',
  };



  constructor(private http: HttpClient) {}

  //HttpMethods

  addEmployee(user: User) {
    return this.http.post(environment.apiBaseUrl + '/addEmployee', user);
  }

  updateEmpDetails(user: User) {
    return this.http.post(environment.apiBaseUrl + '/updateEmpDetails', user);
  }

  getEmpList() {
    return this.http.get(environment.apiBaseUrl + '/getEmpList');
  }

  searchEmp(userId) {
    return this.http.post(environment.apiBaseUrl + '/searchEmp', userId);
  }

  deleteEmp(userId) {
    return this.http.post(environment.apiBaseUrl + '/deleteEmp', userId);
  }
  retriveImage(userId) {
    return this.http.post(environment.apiBaseUrl + '/retriveImage', userId);
  }
}
