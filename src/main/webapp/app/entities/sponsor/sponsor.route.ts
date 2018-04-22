import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Sponsor } from 'app/shared/model/sponsor.model';
import { SponsorService } from './sponsor.service';
import { SponsorComponent } from './sponsor.component';
import { SponsorDetailComponent } from './sponsor-detail.component';
import { SponsorUpdateComponent } from './sponsor-update.component';
import { SponsorDeletePopupComponent } from './sponsor-delete-dialog.component';

@Injectable()
export class SponsorResolve implements Resolve<any> {
    constructor(private service: SponsorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Sponsor();
    }
}

export const sponsorRoute: Routes = [
    {
        path: 'sponsor',
        component: SponsorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sponsors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sponsor/:id/view',
        component: SponsorDetailComponent,
        resolve: {
            sponsor: SponsorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sponsors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sponsor/new',
        component: SponsorUpdateComponent,
        resolve: {
            sponsor: SponsorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sponsors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sponsor/:id/edit',
        component: SponsorUpdateComponent,
        resolve: {
            sponsor: SponsorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sponsors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sponsorPopupRoute: Routes = [
    {
        path: 'sponsor/:id/delete',
        component: SponsorDeletePopupComponent,
        resolve: {
            sponsor: SponsorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sponsors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
