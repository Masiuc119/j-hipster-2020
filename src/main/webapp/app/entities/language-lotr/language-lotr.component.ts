import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILanguageLotr } from 'app/shared/model/language-lotr.model';
import { LanguageLotrService } from './language-lotr.service';
import { LanguageLotrDeleteDialogComponent } from './language-lotr-delete-dialog.component';

@Component({
  selector: 'jhi-language-lotr',
  templateUrl: './language-lotr.component.html',
})
export class LanguageLotrComponent implements OnInit, OnDestroy {
  languages?: ILanguageLotr[];
  eventSubscriber?: Subscription;

  constructor(protected languageService: LanguageLotrService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.languageService.query().subscribe((res: HttpResponse<ILanguageLotr[]>) => (this.languages = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLanguages();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILanguageLotr): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLanguages(): void {
    this.eventSubscriber = this.eventManager.subscribe('languageListModification', () => this.loadAll());
  }

  delete(language: ILanguageLotr): void {
    const modalRef = this.modalService.open(LanguageLotrDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.language = language;
  }
}
