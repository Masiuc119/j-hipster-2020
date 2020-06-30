import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JHipster2020TestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { ExpeditionLotrDeleteDialogComponent } from 'app/entities/expedition-lotr/expedition-lotr-delete-dialog.component';
import { ExpeditionLotrService } from 'app/entities/expedition-lotr/expedition-lotr.service';

describe('Component Tests', () => {
  describe('ExpeditionLotr Management Delete Component', () => {
    let comp: ExpeditionLotrDeleteDialogComponent;
    let fixture: ComponentFixture<ExpeditionLotrDeleteDialogComponent>;
    let service: ExpeditionLotrService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JHipster2020TestModule],
        declarations: [ExpeditionLotrDeleteDialogComponent],
      })
        .overrideTemplate(ExpeditionLotrDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExpeditionLotrDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpeditionLotrService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
