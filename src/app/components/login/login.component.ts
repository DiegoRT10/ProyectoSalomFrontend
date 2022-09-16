import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    pass: ''
  }
  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  Login(){
   
    this.authService.singin(this.user).subscribe((res:any) =>{
    
      localStorage.setItem('token',res.token);
      this.router.navigate(['private']);
    });
  }

}
