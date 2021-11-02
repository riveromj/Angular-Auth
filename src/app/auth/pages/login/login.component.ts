import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  miFormulario: FormGroup = this.fb.group({
    email: ['test@gmail.com', [Validators.required, Validators.email]],
    password: ['11111111', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb:FormBuilder,
              private router:Router,
              private authService: AuthService) { }

  login(){
    /* this.authService.validarToken()
      .subscribe( res => console.log(res)) */
   
     console.log(this.miFormulario.value);

    const { email , password} = this.miFormulario.value;
    this.authService.login(email, password)
    .subscribe( ok =>{
      console.log(ok.ok)
      if (ok.ok === true){
        this.router.navigateByUrl('/dashboard'); 
      }else{
        // mostrat mensaje de error
        Swal.fire('Error', ok, 'error')
      }
    })
    
  }

}
