import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  errorMessage = '';
  user!: FormGroup;
  
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    if (!this.user.valid) {
      return;
    }
    let user: User = this.user.value;
    this.authService.sendPasswordResetLink(user).subscribe((res: any) => {

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
    
  }
}
