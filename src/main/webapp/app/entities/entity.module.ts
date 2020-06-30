import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'unit-lotr',
        loadChildren: () => import('./unit-lotr/unit-lotr.module').then(m => m.JHipster2020UnitLotrModule),
      },
      {
        path: 'language-lotr',
        loadChildren: () => import('./language-lotr/language-lotr.module').then(m => m.JHipster2020LanguageLotrModule),
      },
      {
        path: 'expedition-lotr',
        loadChildren: () => import('./expedition-lotr/expedition-lotr.module').then(m => m.JHipster2020ExpeditionLotrModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JHipster2020EntityModule {}
