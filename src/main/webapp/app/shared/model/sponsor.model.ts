import { ISponsorAgreement } from './sponsor-agreement.model';

export interface ISponsor {
    id?: number;
    name?: string;
    sponsorAgreement?: ISponsorAgreement;
}

export class Sponsor implements ISponsor {
    constructor(public id?: number, public name?: string, public sponsorAgreement?: ISponsorAgreement) {}
}
