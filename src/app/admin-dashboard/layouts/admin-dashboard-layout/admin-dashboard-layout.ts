import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './admin-dashboard-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AdminDashboardLayout {

  authService = inject(AuthService);

  user = computed(this.authService.user);


}
