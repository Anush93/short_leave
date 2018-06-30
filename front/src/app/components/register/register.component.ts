import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: String;
  email: String;
  password: String;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  registerData() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    this.authService.registerUser(user) .subscribe(res => {
     if (res.state) {
       this.router.navigate(['/login']);
     } else {
      this.router.navigate(['/register']);
     }
    });
  }

}
