import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';


const routes: Routes = [
  {path:'list',component:EmployeeListComponent},
  {path:'add',component:EmployeeAddComponent},
  {path:'search',component:EmployeeSearchComponent},
  {path:'detail/:id', component: EmployeeDetailComponent }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
