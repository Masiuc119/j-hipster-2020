import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { JHipster2020TestModule } from '../../../test.module';
import { UnitLotrDetailComponent } from 'app/entities/unit-lotr/unit-lotr-detail.component';
import { UnitLotr } from 'app/shared/model/unit-lotr.model';

describe('Component Tests', () => {
  describe('UnitLotr Management Detail Component', () => {
    let comp: UnitLotrDetailComponent;
    let fixture: ComponentFixture<UnitLotrDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ unit: new UnitLotr(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JHipster2020TestModule],
        declarations: [UnitLotrDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UnitLotrDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UnitLotrDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load unit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.unit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
