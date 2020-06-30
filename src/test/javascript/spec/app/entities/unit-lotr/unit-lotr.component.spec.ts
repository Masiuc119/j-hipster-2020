import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JHipster2020TestModule } from '../../../test.module';
import { UnitLotrComponent } from 'app/entities/unit-lotr/unit-lotr.component';
import { UnitLotrService } from 'app/entities/unit-lotr/unit-lotr.service';
import { UnitLotr } from 'app/shared/model/unit-lotr.model';

describe('Component Tests', () => {
  describe('UnitLotr Management Component', () => {
    let comp: UnitLotrComponent;
    let fixture: ComponentFixture<UnitLotrComponent>;
    let service: UnitLotrService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JHipster2020TestModule],
        declarations: [UnitLotrComponent],
      })
        .overrideTemplate(UnitLotrComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnitLotrComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnitLotrService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UnitLotr(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.units && comp.units[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
