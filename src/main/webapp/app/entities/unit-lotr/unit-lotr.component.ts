import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUnitLotr } from 'app/shared/model/unit-lotr.model';
import { UnitLotrService } from './unit-lotr.service';
import { UnitLotrDeleteDialogComponent } from './unit-lotr-delete-dialog.component';

@Component({
  selector: 'jhi-unit-lotr',
  templateUrl: './unit-lotr.component.html',
})
export class UnitLotrComponent implements OnInit, OnDestroy {
  units?: IUnitLotr[];
  eventSubscriber?: Subscription;

  constructor(
    protected unitService: UnitLotrService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.unitService.query().subscribe((res: HttpResponse<IUnitLotr[]>) => (this.units = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUnits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUnitLotr): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInUnits(): void {
    this.eventSubscriber = this.eventManager.subscribe('unitListModification', () => this.loadAll());
  }

  delete(unit: IUnitLotr): void {
    const modalRef = this.modalService.open(UnitLotrDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.unit = unit;
  }
}
