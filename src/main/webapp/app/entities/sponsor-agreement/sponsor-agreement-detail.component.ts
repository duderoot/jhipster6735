import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISponsorAgreement } from 'app/shared/model/sponsor-agreement.model';

@Component({
    selector: 'jhi-sponsor-agreement-detail',
    templateUrl: './sponsor-agreement-detail.component.html'
})
export class SponsorAgreementDetailComponent implements OnInit {
    sponsorAgreement: ISponsorAgreement;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ sponsorAgreement }) => {
            this.sponsorAgreement = sponsorAgreement.body ? sponsorAgreement.body : sponsorAgreement;
        });
    }

    previousState() {
        window.history.back();
    }
}
