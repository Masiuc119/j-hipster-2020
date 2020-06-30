import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUnitLotr, UnitLotr } from 'app/shared/model/unit-lotr.model';
import { UnitLotrService } from './unit-lotr.service';
import { UnitLotrComponent } from './unit-lotr.component';
import { UnitLotrDetailComponent } from './unit-lotr-detail.component';
import { UnitLotrUpdateComponent } from './unit-lotr-update.component';

@Injectable({ providedIn: 'root' })
export class UnitLotrResolve implements Resolve<IUnitLotr> {
  constructor(private service: UnitLotrService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUnitLotr> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((unit: HttpResponse<UnitLotr>) => {
          if (unit.body) {
            return of(unit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UnitLotr());
  }
}

export const unitRoute: Routes = [
  {
    path: '',
    component: UnitLotrComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jHipster2020App.unit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UnitLotrDetailComponent,
    resolve: {
      unit: UnitLotrResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jHipster2020App.unit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UnitLotrUpdateComponent,
    resolve: {
      unit: UnitLotrResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jHipster2020App.unit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UnitLotrUpdateComponent,
    resolve: {
      unit: UnitLotrResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jHipster2020App.unit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
