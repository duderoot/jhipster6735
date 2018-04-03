import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    SponsorService,
    SponsorPopupService,
    SponsorComponent,
    SponsorDetailComponent,
    SponsorDialogComponent,
    SponsorPopupComponent,
    SponsorDeletePopupComponent,
    SponsorDeleteDialogComponent,
    sponsorRoute,
    sponsorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sponsorRoute,
    ...sponsorPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SponsorComponent,
        SponsorDetailComponent,
        SponsorDialogComponent,
        SponsorDeleteDialogComponent,
        SponsorPopupComponent,
        SponsorDeletePopupComponent,
    ],
    entryComponents: [
        SponsorComponent,
        SponsorDialogComponent,
        SponsorPopupComponent,
        SponsorDeleteDialogComponent,
        SponsorDeletePopupComponent,
    ],
    providers: [
        SponsorService,
        SponsorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSponsorModule {}
