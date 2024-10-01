import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SaveResponse } from '../models/saveresponse';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  EmployeeList: Employee[]=[];

  constructor(private EmployeeService : EmployeeService,
    private router : Router,
    ){}

async ngOnInit(){  
await this.GetEmployees();
}

async GetEmployees(){
await this.EmployeeService.GetEmployees().subscribe((data)=>{
console.log('pdata',data);
this.EmployeeList=data;
if( !this.EmployeeList ){
this.EmployeeList=[];
}
},error => {
  console.error('Error fetching employees:', error);
}
)

}
DeleteEmployee(employeeId: number) {
  debugger;
  {
    this.EmployeeService.deleteEmployee(employeeId).subscribe(
      (response: SaveResponse) => {
        if (response.Saved) {
          this.GetEmployees();
          // Handle successful deletion, e.g., remove from the list
          console.log('Employee deleted successfully.');
        } else {
          // Handle deletion failure
          console.error('Failed to delete employee.');
        }
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
}
editEmployee(employee: Employee) {
  console.log(employee);
  
  this.router.navigate(['employeeform'], { state: { employee } });
}
GoBack(){
  this.router.navigate(['employeeform']);
}
}
