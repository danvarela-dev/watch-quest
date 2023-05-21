import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  constructor(private auth: AuthenticationService) {}

  test(): void {
    this.auth.requestToken().subscribe((response) => {
      console.log(response);
    });
  }
}
