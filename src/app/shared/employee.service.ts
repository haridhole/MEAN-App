import { Injectable } from '@angular/core';
import { Http,Response  } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {

  
constructor(private http:Http) 
{
}

selectedEmployee:Employee ={"_id":"","name":"","office":"","position":"","salary":null};

employees : Employee[];


readonly baseUrl='http://localhost:3000/employees/';


postEmployees(emp:Employee){
  return this.http.post(this.baseUrl,emp);
   
}


getEmployees(){
return  this.http.get(this.baseUrl)
.map((res:Response)=> res.json());
}

putEmployees(emp:Employee){
  return this.http.put(this.baseUrl+`/${emp._id}`,emp);
}

deleteEmployees(_id:string){
  return this.http.delete(this.baseUrl+`/${_id}`)
}

}
