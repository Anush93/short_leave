import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loginUser() {
    const user = {
    email: this.email,
    password: this.password,
    };
    this.authService.loginUser(user).subscribe(res => {
      if (res.state) {
        this.authService.storeData(res.token, res.user);
        this.router.navigate(['/profile']);
      } else {
       this.router.navigate(['/login']);
      }
     });
  }

}

