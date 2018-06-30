import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
user: any;
authtoken: any;
  constructor(
    private http: Http
  ) { }
  registerUser(user) {
const headers = new Headers ();
headers.append('content-Type', 'application/json');

return this.http.post('http://localhost:3000/user/register', user, {headers: headers}) .pipe(map (res => res.json()));
  }

  loginUser(user) {
    const headers = new Headers ();
    headers.append('content-Type', 'application/json');

    return this.http.post('http://localhost:3000/user/login', user, {headers: headers}) .pipe(map (res => res.json()));

  }

  getProfile() {
  this.fetchToken();

    const headers = new Headers ();
    headers.append('Authorization', this.authtoken);
    headers.append('content-Type', 'application/json');

    return this.http.get('http://localhost:3000/user/profile', {headers: headers}) .pipe(map (res => res.json()));

  }

  fetchToken() {
    const token = localStorage.getItem('tokenid');
    this.authtoken = token;
  }

  storeData(token, userdata) {
localStorage.setItem('tokenid', token);
localStorage.setItem('user', JSON.stringify(userdata));
this.authtoken = token;
this.user = userdata;
  }

  logout() {
  this.authtoken = null;
  this.user = null;
  localStorage.clear();
  }
}


