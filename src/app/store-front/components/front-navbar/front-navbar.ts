import { AuthService } from '@/auth/services/auth.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class FrontNavbar {
  authService = inject(AuthService);
}
