import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUnitLotr } from 'app/shared/model/unit-lotr.model';
import { UnitLotrService } from './unit-lotr.service';

@Component({
  templateUrl: './unit-lotr-delete-dialog.component.html',
})
export class UnitLotrDeleteDialogComponent {
  unit?: IUnitLotr;

  constructor(protected unitService: UnitLotrService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.unitService.delete(id).subscribe(() => {
      this.eventManager.broadcast('unitListModification');
      this.activeModal.close();
    });
  }
}
