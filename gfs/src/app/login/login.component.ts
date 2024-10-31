import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor( private apiService: ApiService ) { }

  // ngOnInit(): void {
  //   this.login('admin', 'root');
  // }

  login(username: string, password: string): void {
    this.apiService.loginFake(username, password);
  }
}
