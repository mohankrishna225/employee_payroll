import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})






export class EmployeeAddComponent implements OnInit {

  employee: Employee | undefined

  // This addForm name refers the FormGroup="" attribute in Component.html Must be Same
  // Validations| we can pass an array of validations even default values can be pushed
  addForm = this.fb.group({
    name: ['',[Validators.required,Validators.minLength(4)]],
    salary: ['',[Validators.required,Validators.pattern("^[0-9]*$")]]
  });

  // Dependency Injection of a Service and FormBuilder form Reactive Forms
  constructor(private employeeService: EmployeeService,private fb:FormBuilder) { }

  ngOnInit(): void {
      

  }



  submit() {
    if(this.addForm.valid) { 
      this.employee = <Employee> this.addForm.value;
      console.log("Adding Employee"+ this.employee.name+" : "+ this.employee.salary);
    
    this.employeeService.addEmployee(this.employee).subscribe();
    console.log("Employee Added Succesfully")
    this.addForm.reset();

    }else {
      console.log("Employee does not Exist")
    }

  }

  //Mandatory Getter Methods Check Reactive Forms Doc on Angular.io 
   get name() {return this.addForm.get('name'); }
   get salary() {return this.addForm.get('salary'); } 
   
  } 


