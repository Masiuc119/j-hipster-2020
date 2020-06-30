import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IExpeditionLotr, ExpeditionLotr } from 'app/shared/model/expedition-lotr.model';
import { ExpeditionLotrService } from './expedition-lotr.service';
import { IUnitLotr } from 'app/shared/model/unit-lotr.model';
import { UnitLotrService } from 'app/entities/unit-lotr/unit-lotr.service';

@Component({
  selector: 'jhi-expedition-lotr-update',
  templateUrl: './expedition-lotr-update.component.html',
})
export class ExpeditionLotrUpdateComponent implements OnInit {
  isSaving = false;
  units: IUnitLotr[] = [];
  deadLineDp: any;

  editForm = this.fb.group({
    id: [],
    complexity: [],
    dispatchTime: [],
    deadLine: [],
    rate: [null, [Validators.min(0), Validators.max(1)]],
    unitId: [],
  });

  constructor(
    protected expeditionService: ExpeditionLotrService,
    protected unitService: UnitLotrService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ expedition }) => {
      if (!expedition.id) {
        const today = moment().startOf('day');
        expedition.dispatchTime = today;
      }

      this.updateForm(expedition);

      this.unitService.query().subscribe((res: HttpResponse<IUnitLotr[]>) => (this.units = res.body || []));
    });
  }

  updateForm(expedition: IExpeditionLotr): void {
    this.editForm.patchValue({
      id: expedition.id,
      complexity: expedition.complexity,
      dispatchTime: expedition.dispatchTime ? expedition.dispatchTime.format(DATE_TIME_FORMAT) : null,
      deadLine: expedition.deadLine,
      rate: expedition.rate,
      unitId: expedition.unitId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const expedition = this.createFromForm();
    if (expedition.id !== undefined) {
      this.subscribeToSaveResponse(this.expeditionService.update(expedition));
    } else {
      this.subscribeToSaveResponse(this.expeditionService.create(expedition));
    }
  }

  private createFromForm(): IExpeditionLotr {
    return {
      ...new ExpeditionLotr(),
      id: this.editForm.get(['id'])!.value,
      complexity: this.editForm.get(['complexity'])!.value,
      dispatchTime: this.editForm.get(['dispatchTime'])!.value
        ? moment(this.editForm.get(['dispatchTime'])!.value, DATE_TIME_FORMAT)
        : undefined,
      deadLine: this.editForm.get(['deadLine'])!.value,
      rate: this.editForm.get(['rate'])!.value,
      unitId: this.editForm.get(['unitId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpeditionLotr>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUnitLotr): any {
    return item.id;
  }
}
