import {
  Component,
  EventEmitter,
  OnInit
} from '@angular/core';
import {
  UserService
} from '../shared/user.service';
import {
  Router
} from "@angular/router";
import {
  NgForm
} from '@angular/forms';
import {
  DatePipe
} from '@angular/common';
import {
  FileUploader
} from 'ng2-file-upload';
import {
  IDropdownSettings
} from 'ng-multiselect-dropdown';
const URL = 'http://localhost:3000/api/profileUpload';

@Component({
  selector: 'app-employee-mgmt',
  templateUrl: './employee-mgmt.component.html',
  styleUrls: ['./employee-mgmt.component.css']
})
export class EmployeeMgmtComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public userDetails: any;
  public editSwitch: boolean;
  showSucessMessage: boolean;
  serverErrorMessages: any;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'photo'
  });
  pipe = new DatePipe('en-US');
  now = Date.now();
  updateId: any
  showAddEmp: boolean;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings
  imageData
  imageToShow: any;
  searchValue: any;
  searchResult: boolean;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getEmployeeList()
    this.dropdownList = [{
        item_id: 1,
        item_text: 'Java learning'
      },
      {
        item_id: 2,
        item_text: 'CakePHP learning'
      },
      {
        item_id: 3,
        item_text: 'Angular learning'
      },
      {
        item_id: 4,
        item_text: 'Node learning'
      }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
      
    };
    this.searchResult = false;
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.imageData = response
    };
  }

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}
  addEmployeee() {
    this.showAddEmp = true
  }
  getEmployeeList() {
    this.userService.getEmpList().subscribe(
      res => {
        this.editSwitch = false;
        
        this.userDetails = res['results'];
      },
      err => {
        console.log(err);

      }
    );
  }

  searchEmp(form : NgForm) {
    console.log('form.value==', form.value)
    this.userService.searchEmp( form.value).subscribe(
      res => {
        this.searchResult = true
        this.userDetails = res['results']
        return res
      },
      err => {}
    )
  }
  onClickDelete(id: any) {

    if (confirm("Are you sure you want to delete?")) {
      this.deleteEmp(id)
      this.userDetails = []
      this.getEmployeeList()
    } else {}
  }
  deleteEmp(id: any) {
    const json = {}
    json['_id'] = id
    this.userService.deleteEmp(json).subscribe(
      res => {

        return res
      },
      err => {}
    )
  }
  enableEdit(id: any) {
    this.editSwitch = true;
    this.updateId = id
  }
  // retriewImage(id) {
  //   const json = {}
  //   json['_id'] = id
  //   this.userService.retriveImage(json).subscribe(
  //     res => {
  //       var image = new Image();
  //       image.src = window.URL.createObjectURL(res);
  //       this.imageToShow = image

  //       document.body.appendChild(image);
  //       this.getEmployeeList()
  //       return res
  //     },
  //     err => {}
  //   )
  // }

  onSubmitAdd(form: NgForm) {
    const dateFormatted = this.pipe.transform(form.value.DOB, 'dd/MM/yyyy');
    form.value.DOB = dateFormatted
    form.value.image = this.imageData
    this.userService.addEmployee(form.value).subscribe(
      res => {
        this.getEmployeeList()
        this.showAddEmp = false;
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }
  onSubmitUpdate(form: NgForm, item) {
    const dateFormatted = this.pipe.transform(form.value.DOB, 'dd/MM/yyyy');
    form.value.DOB = dateFormatted
    form.value._id = item._id
    this.userService.updateEmpDetails(form.value).subscribe(
      res => {
        this.getEmployeeList()
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }
  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      hobbies: '',
      empType: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
