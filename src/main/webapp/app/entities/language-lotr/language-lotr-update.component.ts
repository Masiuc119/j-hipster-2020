import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILanguageLotr, LanguageLotr } from 'app/shared/model/language-lotr.model';
import { LanguageLotrService } from './language-lotr.service';
import { IUnitLotr } from 'app/shared/model/unit-lotr.model';
import { UnitLotrService } from 'app/entities/unit-lotr/unit-lotr.service';

@Component({
  selector: 'jhi-language-lotr-update',
  templateUrl: './language-lotr-update.component.html',
})
export class LanguageLotrUpdateComponent implements OnInit {
  isSaving = false;
  units: IUnitLotr[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.minLength(1), Validators.maxLength(15)]],
    units: [],
  });

  constructor(
    protected languageService: LanguageLotrService,
    protected unitService: UnitLotrService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ language }) => {
      this.updateForm(language);

      this.unitService.query().subscribe((res: HttpResponse<IUnitLotr[]>) => (this.units = res.body || []));
    });
  }

  updateForm(language: ILanguageLotr): void {
    this.editForm.patchValue({
      id: language.id,
      title: language.title,
      units: language.units,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const language = this.createFromForm();
    if (language.id !== undefined) {
      this.subscribeToSaveResponse(this.languageService.update(language));
    } else {
      this.subscribeToSaveResponse(this.languageService.create(language));
    }
  }

  private createFromForm(): ILanguageLotr {
    return {
      ...new LanguageLotr(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      units: this.editForm.get(['units'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILanguageLotr>>): void {
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

  getSelected(selectedVals: IUnitLotr[], option: IUnitLotr): IUnitLotr {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
