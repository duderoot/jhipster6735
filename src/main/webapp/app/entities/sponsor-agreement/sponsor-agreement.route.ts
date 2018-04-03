import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SponsorAgreementComponent } from './sponsor-agreement.component';
import { SponsorAgreementDetailComponent } from './sponsor-agreement-detail.component';
import { SponsorAgreementPopupComponent } from './sponsor-agreement-dialog.component';
import { SponsorAgreementDeletePopupComponent } from './sponsor-agreement-delete-dialog.component';

export const sponsorAgreementRoute: Routes = [
    {
        path: 'sponsor-agreement',
        component: SponsorAgreementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SponsorAgreements'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sponsor-agreement/:id',
        component: SponsorAgreementDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SponsorAgreements'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sponsorAgreementPopupRoute: Routes = [
    {
        path: 'sponsor-agreement-new',
        component: SponsorAgreementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SponsorAgreements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sponsor-agreement/:id/edit',
        component: SponsorAgreementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SponsorAgreements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sponsor-agreement/:id/delete',
        component: SponsorAgreementDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SponsorAgreements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
