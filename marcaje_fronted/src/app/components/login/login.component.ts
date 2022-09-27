import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    if (!this.user.valid) {
      return;
    }
    let user: User = this.user.value;
    this.authService.login(user).subscribe((res: any) => {

      this.handleResponse(res);
      
      Swal.fire(
        'Datos Validos',
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
  handleResponse(data: any){
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

}
