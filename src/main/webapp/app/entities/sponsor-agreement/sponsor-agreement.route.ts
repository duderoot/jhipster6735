import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { SponsorAgreement } from 'app/shared/model/sponsor-agreement.model';
import { SponsorAgreementService } from './sponsor-agreement.service';
import { SponsorAgreementComponent } from './sponsor-agreement.component';
import { SponsorAgreementDetailComponent } from './sponsor-agreement-detail.component';
import { SponsorAgreementUpdateComponent } from './sponsor-agreement-update.component';
import { SponsorAgreementDeletePopupComponent } from './sponsor-agreement-delete-dialog.component';

@Injectable()
export class SponsorAgreementResolve implements Resolve<any> {
    constructor(private service: SponsorAgreementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new SponsorAgreement();
    }
}

export const sponsorAgreementRoute: Routes = [
    {
        path: 'sponsor-agreement',
        component: SponsorAgreementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SponsorAgreements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sponsor-agreement/:id/view',
        component: SponsorAgreementDetailComponent,
        resolve: {
            sponsorAgreement: SponsorAgreementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SponsorAgreements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sponsor-agreement/new',
        component: SponsorAgreementUpdateComponent,
        resolve: {
            sponsorAgreement: SponsorAgreementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SponsorAgreements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sponsor-agreement/:id/edit',
        component: SponsorAgreementUpdateComponent,
        resolve: {
            sponsorAgreement: SponsorAgreementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SponsorAgreements'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sponsorAgreementPopupRoute: Routes = [
    {
        path: 'sponsor-agreement/:id/delete',
        component: SponsorAgreementDeletePopupComponent,
        resolve: {
            sponsorAgreement: SponsorAgreementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SponsorAgreements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
