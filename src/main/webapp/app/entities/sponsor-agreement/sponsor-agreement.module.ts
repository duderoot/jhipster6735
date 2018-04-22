import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared';
import {
    SponsorAgreementService,
    SponsorAgreementComponent,
    SponsorAgreementDetailComponent,
    SponsorAgreementUpdateComponent,
    SponsorAgreementDeletePopupComponent,
    SponsorAgreementDeleteDialogComponent,
    sponsorAgreementRoute,
    sponsorAgreementPopupRoute,
    SponsorAgreementResolve
} from './';

const ENTITY_STATES = [...sponsorAgreementRoute, ...sponsorAgreementPopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SponsorAgreementComponent,
        SponsorAgreementDetailComponent,
        SponsorAgreementUpdateComponent,
        SponsorAgreementDeleteDialogComponent,
        SponsorAgreementDeletePopupComponent
    ],
    entryComponents: [
        SponsorAgreementComponent,
        SponsorAgreementUpdateComponent,
        SponsorAgreementDeleteDialogComponent,
        SponsorAgreementDeletePopupComponent
    ],
    providers: [SponsorAgreementService, SponsorAgreementResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSponsorAgreementModule {}
