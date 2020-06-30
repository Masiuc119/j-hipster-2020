import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IUnitLotr } from 'app/shared/model/unit-lotr.model';

@Component({
  selector: 'jhi-unit-lotr-detail',
  templateUrl: './unit-lotr-detail.component.html',
})
export class UnitLotrDetailComponent implements OnInit {
  unit: IUnitLotr | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unit }) => (this.unit = unit));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
