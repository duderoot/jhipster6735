import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared';
import {
    SponsorService,
    SponsorComponent,
    SponsorDetailComponent,
    SponsorUpdateComponent,
    SponsorDeletePopupComponent,
    SponsorDeleteDialogComponent,
    sponsorRoute,
    sponsorPopupRoute,
    SponsorResolve
} from './';

const ENTITY_STATES = [...sponsorRoute, ...sponsorPopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SponsorComponent,
        SponsorDetailComponent,
        SponsorUpdateComponent,
        SponsorDeleteDialogComponent,
        SponsorDeletePopupComponent
    ],
    entryComponents: [SponsorComponent, SponsorUpdateComponent, SponsorDeleteDialogComponent, SponsorDeletePopupComponent],
    providers: [SponsorService, SponsorResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSponsorModule {}
