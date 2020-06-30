import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHipster2020SharedModule } from 'app/shared/shared.module';
import { LanguageLotrComponent } from './language-lotr.component';
import { LanguageLotrDetailComponent } from './language-lotr-detail.component';
import { LanguageLotrUpdateComponent } from './language-lotr-update.component';
import { LanguageLotrDeleteDialogComponent } from './language-lotr-delete-dialog.component';
import { languageRoute } from './language-lotr.route';

@NgModule({
  imports: [JHipster2020SharedModule, RouterModule.forChild(languageRoute)],
  declarations: [LanguageLotrComponent, LanguageLotrDetailComponent, LanguageLotrUpdateComponent, LanguageLotrDeleteDialogComponent],
  entryComponents: [LanguageLotrDeleteDialogComponent],
})
export class JHipster2020LanguageLotrModule {}
