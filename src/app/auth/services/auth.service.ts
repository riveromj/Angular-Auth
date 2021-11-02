
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return {...this._usuario}
  }

  constructor( private http: HttpClient) { }

  registerUser(name: string, email:string, password:string){
    const url =`${this.baseUrl}/auth/new`;
    const body = {name, email , password};
    console.log('creado usuario')
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap( res =>{ 
          if (res.ok){
            localStorage.setItem('token', res.token!);
          }
        }),
        map( res=> res ),
        catchError(err => of(err.error.msg))
      )

  }

  login(email:string, password:string){

    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    //retorna on objeto observable
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( res =>{ 
          if (res.ok){
            localStorage.setItem('token', res.token!);
          }
        }),
        map( res=> res ),
        catchError(err => of(err.error.msg))
      )
}


  validarToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;

    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url, { headers } )
            .pipe(
              map( res=> {
                localStorage.setItem('token', res.token!);
                this._usuario={
                  name: res.name!,
                  uid:res.uid!,
                  email:res.email!
                }
                return res.ok
              }),
              catchError(err => of(false))
            )
  }

  logout(){
   // localStorage.removeItem('token');
   localStorage.clear();
  }
}
