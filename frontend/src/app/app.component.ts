import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { ScreenLoaderService } from './shared/components/screen-loader/screen-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Plantfolio';

  constructor(private authService: AuthService, private loadersrvc: ScreenLoaderService) { }
  ngOnInit() {
    // this.authService.verifyToken();
  }
}
