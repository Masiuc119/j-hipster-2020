import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { UnitLotrService } from 'app/entities/unit-lotr/unit-lotr.service';
import { IUnitLotr, UnitLotr } from 'app/shared/model/unit-lotr.model';

describe('Service Tests', () => {
  describe('UnitLotr Service', () => {
    let injector: TestBed;
    let service: UnitLotrService;
    let httpMock: HttpTestingController;
    let elemDefault: IUnitLotr;
    let expectedResult: IUnitLotr | IUnitLotr[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(UnitLotrService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new UnitLotr(0, currentDate, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            hireDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a UnitLotr', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            hireDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hireDate: currentDate,
          },
          returnedFromService
        );

        service.create(new UnitLotr()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a UnitLotr', () => {
        const returnedFromService = Object.assign(
          {
            hireDate: currentDate.format(DATE_FORMAT),
            biography: 'BBBBBB',
            numberOfTeeth: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hireDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of UnitLotr', () => {
        const returnedFromService = Object.assign(
          {
            hireDate: currentDate.format(DATE_FORMAT),
            biography: 'BBBBBB',
            numberOfTeeth: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hireDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a UnitLotr', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
