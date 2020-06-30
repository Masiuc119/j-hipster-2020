import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHipster2020SharedModule } from 'app/shared/shared.module';
import { ExpeditionLotrComponent } from './expedition-lotr.component';
import { ExpeditionLotrDetailComponent } from './expedition-lotr-detail.component';
import { ExpeditionLotrUpdateComponent } from './expedition-lotr-update.component';
import { ExpeditionLotrDeleteDialogComponent } from './expedition-lotr-delete-dialog.component';
import { expeditionRoute } from './expedition-lotr.route';

@NgModule({
  imports: [JHipster2020SharedModule, RouterModule.forChild(expeditionRoute)],
  declarations: [
    ExpeditionLotrComponent,
    ExpeditionLotrDetailComponent,
    ExpeditionLotrUpdateComponent,
    ExpeditionLotrDeleteDialogComponent,
  ],
  entryComponents: [ExpeditionLotrDeleteDialogComponent],
})
export class JHipster2020ExpeditionLotrModule {}
