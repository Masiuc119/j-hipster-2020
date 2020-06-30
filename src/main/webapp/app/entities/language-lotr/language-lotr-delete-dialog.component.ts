import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILanguageLotr } from 'app/shared/model/language-lotr.model';
import { LanguageLotrService } from './language-lotr.service';

@Component({
  templateUrl: './language-lotr-delete-dialog.component.html',
})
export class LanguageLotrDeleteDialogComponent {
  language?: ILanguageLotr;

  constructor(
    protected languageService: LanguageLotrService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.languageService.delete(id).subscribe(() => {
      this.eventManager.broadcast('languageListModification');
      this.activeModal.close();
    });
  }
}
