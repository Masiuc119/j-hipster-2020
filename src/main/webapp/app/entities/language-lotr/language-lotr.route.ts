import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILanguageLotr, LanguageLotr } from 'app/shared/model/language-lotr.model';
import { LanguageLotrService } from './language-lotr.service';
import { LanguageLotrComponent } from './language-lotr.component';
import { LanguageLotrDetailComponent } from './language-lotr-detail.component';
import { LanguageLotrUpdateComponent } from './language-lotr-update.component';

@Injectable({ providedIn: 'root' })
export class LanguageLotrResolve implements Resolve<ILanguageLotr> {
  constructor(private service: LanguageLotrService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILanguageLotr> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((language: HttpResponse<LanguageLotr>) => {
          if (language.body) {
            return of(language.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LanguageLotr());
  }
}

export const languageRoute: Routes = [
  {
    path: '',
    component: LanguageLotrComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jHipster2020App.language.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LanguageLotrDetailComponent,
    resolve: {
      language: LanguageLotrResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jHipster2020App.language.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LanguageLotrUpdateComponent,
    resolve: {
      language: LanguageLotrResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jHipster2020App.language.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LanguageLotrUpdateComponent,
    resolve: {
      language: LanguageLotrResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jHipster2020App.language.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
