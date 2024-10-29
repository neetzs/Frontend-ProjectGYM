import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
//importo lo que voy a usar en la logica
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';
//Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuil = inject(FormBuilder);
  
  //Formulario para Iniciar
  public formLogin: FormGroup = this.formBuil.group({
    correo:['',Validators.required],
    clave:['',Validators.required]
  })

  //Metodo para Iniciar Sesion
  iniciarSesion(){
    if(this.formLogin.invalid)return;
    
    const objeto:Login = {
      correo: this.formLogin.value.correo,
      clave: this.formLogin.value.clave
    }

    //Validacion por "isSucces" de la Api
    this.accesoService.login(objeto).subscribe({
      next:(data) =>{
        if(data.isSuccess){
          localStorage.setItem("token",data.token)
          this.router.navigate(['inicio']) //"inicio" debe ser igual a lo mapeado en approutes.ts
        }else{
          alert("Las Credenciales son Incorrectas.")
        }
      },
      //Esto por si tira error
      error:(error) =>{
        console.log(error.message);
      }
    })
  }

  //Metodo para Registro
  registrarse(){
    this.router.navigate(['registro']) //Redirige a registro
  }
}
