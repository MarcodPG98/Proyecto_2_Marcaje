import { Component, OnInit } from '@angular/core';
import { LoggedService } from '../../services/logged.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn : boolean | undefined;

  constructor(
    private logged: LoggedService,
    private router: Router,
    private token: TokenService
  ) { }

  ngOnInit(): void {
    this.logged.authStatus.subscribe( value => 
      this.loggedIn = value
    );
  }

  logout(event: MouseEvent){
    event.preventDefault();
    this.token.remove();
    this.logged.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}
