import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  miFormulario: FormGroup= this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb:FormBuilder,
              private router:Router,
              private authService: AuthService) { }

  register(){
    console.log(this.miFormulario.value,'*****');
    const {name , email, password} = this.miFormulario.value;
    this.authService.registerUser( name, email, password)
      .subscribe( ok =>{
        if (ok.ok === true){
          this.router.navigateByUrl('/dashboard'); 
        }else{
          // mostrat mensaje de error
          Swal.fire('Error', ok, 'error')
        }
      })
    }
}
