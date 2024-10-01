import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Employee } from '../models/Employee';
import { SaveResponse } from '../models/saveresponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.api;
  constructor(private http :HttpClient) { }


  SaveEmployees( data: Employee): Observable<SaveResponse> {
    const url = `${this.apiUrl}/Employee/SaveEmployee`;
    return this.http.post<SaveResponse>(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    });
  }

  GetEmployees( ): Observable<Employee[]> {
    const url = `${this.apiUrl}/Employee/GetEmployee`;
    return this.http.get<Employee[]>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    });
  }

  // GetProductByID( ID:number): Observable<ProductDetail> {
  //   const url = `${this.apiUrl}/getproduct`;
  //   return this.http.get<ProductDetail>(url , {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }) ,
  //     params: new HttpParams().set('ProductID', ID.toString())
  //   });
  // }

  deleteEmployee(employeeId: number): Observable<SaveResponse> {
    return this.http.delete<SaveResponse>(`${this.apiUrl}/Employee/DeleteEmployee/${employeeId}`);
  }

}
