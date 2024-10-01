import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  state$: Observable<any> | undefined;

  EmployeeData: Employee = new Employee();
  submitted: boolean = false;
  isvalid: boolean = false;
  serverErrors: { [key: string]: string[] } = {};
  ErrorInSalary: any;
  ErrorInEmail: any;
  ErrorInPhoneNumber: any;

  constructor(private EmployeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.state$ = this.route.paramMap.pipe(map(() => window.history.state),);
  }

  async ngOnInit() {
    await this.state$?.subscribe((params) => {
      if (params.employee !== null && params.employee !== undefined) { this.EmployeeData = (params.employee); }
      console.log('ProductID', this.EmployeeData, params.employee); // ProductID }); 
    });

  }

  // saveEmployee() {
  //   this.submitted = true;
  //   this.IsValid();
  //   if (!this.isvalid) {
  //     return;
  //   }
  //   this.EmployeeService.SaveEmployees(this.EmployeeData).subscribe({
  //     next: (response) => {
  //       console.log('Employee saved successfully!', response);
  //       // Optionally reset the form or display a success message
  //       this.submitted = false;
  //       this.isvalid = true;
  //       this.resetForm();
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.error('Error saving employee!', error);
  //       // Handle the error response
  //       if (error.error instanceof ErrorEvent) {
  //         // A client-side or network error occurred
  //         console.error('Client-side error:', error.error.message);
  //       } else {
  //         // The backend returned an unsuccessful response code
  //         console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
  //       }
  //       // You can show a user-friendly message here if needed
  //     }
  //   });
  // }
  saveEmployee() {
    debugger;
    this.submitted = true;
    this.IsValid();
    if (!this.isvalid) {
      return;
    }
    this.EmployeeService.SaveEmployees(this.EmployeeData).subscribe({
      next: (response) => {
        console.log('Employee saved successfully!', response);
        this.submitted = false;
        this.isvalid = true;
        this.resetForm();
        // Optionally, navigate to a success page or show a success message
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error saving employee!', error);
        if (error.status === 400) {
          // Handle validation errors
          this.handleValidationErrors(error.error);
        } else {
          // Handle other types of errors
          console.error('An unexpected error occurred:', error.message);
          // You can show a generic error message to the user here
        }
      }
    });
  }
  handleValidationErrors(errorResponse: any) {
    this.serverErrors = {};
    if (errorResponse && typeof errorResponse === 'object') {
      for (const key in errorResponse) {
        if (errorResponse.hasOwnProperty(key)) {
          this.serverErrors[key] = Array.isArray(errorResponse[key]) 
            ? errorResponse[key] 
            : [errorResponse[key]];
        }
      }
    }


    let srvrer:any =this.serverErrors['errors'][0];
    this.ErrorInSalary =srvrer.Salary;
    this.ErrorInEmail =srvrer.Email;
    this.ErrorInPhoneNumber =srvrer.PhoneNumber;
  }

  resetForm() {
    this.EmployeeData = new Employee(); // Reset to a new instance of Employee
  }

  GoBack() {
    this.router.navigate(['']);
  }
  IsValid() {
    this.isvalid = true;
    this.EmployeeData.FirstName = (this.EmployeeData.FirstName == '' ||
      this.EmployeeData.FirstName == null ||
      this.EmployeeData.FirstName == undefined) ?
      '' : this.EmployeeData.FirstName;

    this.EmployeeData.LastName = (this.EmployeeData.LastName == '' ||
      this.EmployeeData.LastName == null ||
      this.EmployeeData.LastName == undefined) ?
      '' : this.EmployeeData.LastName;

    this.EmployeeData.Email = (this.EmployeeData.Email == '' ||
      this.EmployeeData.Email == null ||
      this.EmployeeData.Email == undefined) ?
      '' : this.EmployeeData.Email;

    this.EmployeeData.Skills = (this.EmployeeData.Skills == '' ||
      this.EmployeeData.Skills == null ||
      this.EmployeeData.Skills == undefined) ?
      '' : this.EmployeeData.Skills;

    this.EmployeeData.PhoneNumber = (this.EmployeeData.PhoneNumber == '' ||
      this.EmployeeData.PhoneNumber == null ||
      this.EmployeeData.PhoneNumber == undefined) ?
      '' : this.EmployeeData.PhoneNumber;

    this.EmployeeData.Department = (this.EmployeeData.Department == '' ||
      this.EmployeeData.Department == null ||
      this.EmployeeData.Department == undefined) ?
      '' : this.EmployeeData.Department;

    this.EmployeeData.Position = (this.EmployeeData.Position == '' ||
      this.EmployeeData.Position == null ||
      this.EmployeeData.Position == undefined) ?
      '' : this.EmployeeData.Position;

    this.EmployeeData.Salary = (this.EmployeeData.Salary == '' ||
      this.EmployeeData.Salary == null ||
      this.EmployeeData.Salary == undefined) ?
      '' : this.EmployeeData.Salary;



    if (this.EmployeeData.FirstName == ''
      || this.EmployeeData.LastName == ''
      || this.EmployeeData.Department == ''
      || this.EmployeeData.Email == ''
      || this.EmployeeData.PhoneNumber == ''
      || this.EmployeeData.Position == ''
      || this.EmployeeData.Skills == ''
      || this.EmployeeData.Salary == ''
    ) {
      this.isvalid = false;
    } else {
      this.isvalid = true;
    }

    return this.isvalid;
  }
}
