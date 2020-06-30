import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExpeditionLotr } from 'app/shared/model/expedition-lotr.model';

type EntityResponseType = HttpResponse<IExpeditionLotr>;
type EntityArrayResponseType = HttpResponse<IExpeditionLotr[]>;

@Injectable({ providedIn: 'root' })
export class ExpeditionLotrService {
  public resourceUrl = SERVER_API_URL + 'api/expeditions';

  constructor(protected http: HttpClient) {}

  create(expedition: IExpeditionLotr): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(expedition);
    return this.http
      .post<IExpeditionLotr>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(expedition: IExpeditionLotr): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(expedition);
    return this.http
      .put<IExpeditionLotr>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExpeditionLotr>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExpeditionLotr[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(expedition: IExpeditionLotr): IExpeditionLotr {
    const copy: IExpeditionLotr = Object.assign({}, expedition, {
      dispatchTime: expedition.dispatchTime && expedition.dispatchTime.isValid() ? expedition.dispatchTime.toJSON() : undefined,
      deadLine: expedition.deadLine && expedition.deadLine.isValid() ? expedition.deadLine.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dispatchTime = res.body.dispatchTime ? moment(res.body.dispatchTime) : undefined;
      res.body.deadLine = res.body.deadLine ? moment(res.body.deadLine) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((expedition: IExpeditionLotr) => {
        expedition.dispatchTime = expedition.dispatchTime ? moment(expedition.dispatchTime) : undefined;
        expedition.deadLine = expedition.deadLine ? moment(expedition.deadLine) : undefined;
      });
    }
    return res;
  }
}
