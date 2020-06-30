import { Moment } from 'moment';
import { IExpeditionLotr } from 'app/shared/model/expedition-lotr.model';
import { ILanguageLotr } from 'app/shared/model/language-lotr.model';

export interface IUnitLotr {
  id?: number;
  hireDate?: Moment;
  biography?: any;
  numberOfTeeth?: number;
  userId?: number;
  expeditions?: IExpeditionLotr[];
  languages?: ILanguageLotr[];
}

export class UnitLotr implements IUnitLotr {
  constructor(
    public id?: number,
    public hireDate?: Moment,
    public biography?: any,
    public numberOfTeeth?: number,
    public userId?: number,
    public expeditions?: IExpeditionLotr[],
    public languages?: ILanguageLotr[]
  ) {}
}
