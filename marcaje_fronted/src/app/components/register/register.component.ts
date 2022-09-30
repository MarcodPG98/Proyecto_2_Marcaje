import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage = '';
  user!: FormGroup;
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private token: TokenService
  ) { }

  ngOnInit(): void {
    this.user = new FormGroup({
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required,),
      password: new FormControl('', Validators.required,),
      password_confirmation: new FormControl('', Validators.required,)

    });
  }

  onSubmit(){
    if (!this.user.valid) {
      return;
    }
    let user: User = this.user.value;
    this.authService.register(user).subscribe((res: any) => {
      
      this.handleResponse();

      Swal.fire(
        'Usuario Agregado',
        res.errorMessage,
        'success'
      )
    }, error => {
      Swal.fire(
        'Datos no Validos',
        error.errorMessage,
        'error'
      )
    });
  }

  // accediendo al token devuelto
  handleResponse(){
    this.router.navigateByUrl('/');
  }
}
