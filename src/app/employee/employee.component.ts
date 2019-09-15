import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmployeeService} from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import 'rxjs/Rx';

declare var M:any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
 
    
  constructor(public employeeService:EmployeeService)
   { 
    
  
    
   }

   ngOnInit() 
  {

    this.resetForm();
    this.refreshEmployeeList();
    
  }
 
  resetForm(form?:NgForm) {
  if(form)
  {
    form.reset();
    this.employeeService.selectedEmployee = {
  _id:"",
  name:"",
  position:"",
  office:"",
  salary:null }

  }
}

onSubmit(form:NgForm)
{

  if(form.value._id=="")
  {
  this.employeeService.postEmployees(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeeList();
  });
 }

 else
 {
  this.employeeService.putEmployees(form.value).subscribe((res)=>{
    this.resetForm(form);
    this.refreshEmployeeList();
});
 }


}

refreshEmployeeList(){
  
this.employeeService.getEmployees()
.subscribe(data=>  this.employeeService.employees=data);

}

editEmployee(emp:Employee){
this.employeeService.selectedEmployee=emp;
}

deleteEmployee(_id:string,form:NgForm){
if(confirm('Are you sure to delete?')==true)
{
  this.employeeService.deleteEmployees(_id)
  .subscribe((res)=>{
  this.resetForm(form);
    this.refreshEmployeeList();})
}
}

}
