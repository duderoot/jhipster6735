import { BaseEntity } from './../../shared';

export class Sponsor implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public sponsorAgreement?: BaseEntity,
    ) {
    }
}
