import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    SponsorAgreementService,
    SponsorAgreementPopupService,
    SponsorAgreementComponent,
    SponsorAgreementDetailComponent,
    SponsorAgreementDialogComponent,
    SponsorAgreementPopupComponent,
    SponsorAgreementDeletePopupComponent,
    SponsorAgreementDeleteDialogComponent,
    sponsorAgreementRoute,
    sponsorAgreementPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sponsorAgreementRoute,
    ...sponsorAgreementPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SponsorAgreementComponent,
        SponsorAgreementDetailComponent,
        SponsorAgreementDialogComponent,
        SponsorAgreementDeleteDialogComponent,
        SponsorAgreementPopupComponent,
        SponsorAgreementDeletePopupComponent,
    ],
    entryComponents: [
        SponsorAgreementComponent,
        SponsorAgreementDialogComponent,
        SponsorAgreementPopupComponent,
        SponsorAgreementDeleteDialogComponent,
        SponsorAgreementDeletePopupComponent,
    ],
    providers: [
        SponsorAgreementService,
        SponsorAgreementPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSponsorAgreementModule {}
