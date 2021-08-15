import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError,map,tap } from 'rxjs/operators'
import { Employee } from './employee';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private Url = "http://localhost:8083/employees"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private _http:HttpClient) { }





getEmployees(): Observable<Employee[]> {
  return this._http.get<Employee[]>(this.Url)
  .pipe(
    tap(_=> this.log('Employees Fetched')),
    catchError(this.handleError<Employee[]>('getEmployees',[]))

  ); 
}




addEmployee(employee: Employee): Observable<Employee> {
  return this._http.post<Employee>(this.Url, employee, this.httpOptions)
  .pipe(tap((newEmployee: Employee) => this.log(`added Employee w/ id=${newEmployee.id}`)),
  catchError(this.handleError<Employee>('addEmployee'))
  );
}


searchEmployees(term: string): Observable<Employee[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this._http.get<Employee[]>(`${this.Url}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found Employee matching "${term}"`) :
       this.log(`no Employee matching "${term}"`)),
    catchError(this.handleError<Employee[]>('searchEmployees', []))
  );
}


 /** DELETE: delete the hero from the server */
 deleteEmployee(id: number): Observable<Employee> {
  const url = `${this.Url}/${id}`;

  return this._http.delete<Employee>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted employee id id=${id}`)),
    catchError(this.handleError<Employee>('deleteEmployee'))
  );
}

getEmployee(id: number): Observable<Employee> {
  const url = `${this.Url}/${id}`;
  return this._http.get<Employee>(url).pipe(
    tap(_ => this.log(`fetched employee id=${id}`)),
    catchError(this.handleError<Employee>(`getEmployee id=${id}`))
  );
}

updateEmployee(employee: Employee): Observable<any> {
  return this._http.put(this.Url, employee, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${employee.id}`)),
    catchError(this.handleError<any>('updateEmployee'))
  );
}


private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
     // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
  }



}
  




