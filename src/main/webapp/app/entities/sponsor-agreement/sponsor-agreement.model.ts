import { BaseEntity } from './../../shared';

export class SponsorAgreement implements BaseEntity {
    constructor(
        public id?: number,
        public total?: number,
        public sponsor?: BaseEntity,
    ) {
    }
}
