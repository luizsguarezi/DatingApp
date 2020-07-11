import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MemberDetalResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | import('rxjs').Observable<User>{
      return this.userService.getUser(route.params['id']).pipe(
          catchError(error => {
              this.alertify.error('Problema ao recuperar dados');
              this.router.navigate(['/members']);
              return of(null);
          })
      );
  }
}
