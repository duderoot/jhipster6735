import { ISponsor } from './sponsor.model';

export interface ISponsorAgreement {
    id?: number;
    total?: number;
    sponsor?: ISponsor;
}

export class SponsorAgreement implements ISponsorAgreement {
    constructor(public id?: number, public total?: number, public sponsor?: ISponsor) {}
}
