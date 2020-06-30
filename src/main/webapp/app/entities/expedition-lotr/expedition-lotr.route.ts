import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExpeditionLotr, ExpeditionLotr } from 'app/shared/model/expedition-lotr.model';
import { ExpeditionLotrService } from './expedition-lotr.service';
import { ExpeditionLotrComponent } from './expedition-lotr.component';
import { ExpeditionLotrDetailComponent } from './expedition-lotr-detail.component';
import { ExpeditionLotrUpdateComponent } from './expedition-lotr-update.component';

@Injectable({ providedIn: 'root' })
export class ExpeditionLotrResolve implements Resolve<IExpeditionLotr> {
  constructor(private service: ExpeditionLotrService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExpeditionLotr> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((expedition: HttpResponse<ExpeditionLotr>) => {
          if (expedition.body) {
            return of(expedition.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ExpeditionLotr());
  }
}

export const expeditionRoute: Routes = [
  {
    path: '',
    component: ExpeditionLotrComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jHipster2020App.expedition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExpeditionLotrDetailComponent,
    resolve: {
      expedition: ExpeditionLotrResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jHipster2020App.expedition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExpeditionLotrUpdateComponent,
    resolve: {
      expedition: ExpeditionLotrResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jHipster2020App.expedition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExpeditionLotrUpdateComponent,
    resolve: {
      expedition: ExpeditionLotrResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jHipster2020App.expedition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
