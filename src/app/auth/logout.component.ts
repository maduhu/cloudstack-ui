import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdlDialogService } from '../dialog/dialog-module';
import { AuthService } from '../shared/services';
import { RouterUtilsService } from '../shared/services/router-utils.service';


@Component({
  selector: 'cs-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private dialogService: MdlDialogService,
    private router: Router,
    private routerUtilsService: RouterUtilsService
  ) {}

  public ngOnInit(): void {
    this.authService.logout().subscribe(() => {
      const next = this.activatedRoute.snapshot.queryParams['next'];
      const redirectionParams = next ? this.routerUtilsService.getRedirectionQueryParams(next) : {};
      this.router.navigate(['/login'], redirectionParams);
      this.dialogService.hideAllDialogs();
    });
  }
}
