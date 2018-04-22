import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SponsorAgreement } from './sponsor-agreement.model';
import { SponsorAgreementService } from './sponsor-agreement.service';

@Component({
    selector: 'jhi-sponsor-agreement-detail',
    templateUrl: './sponsor-agreement-detail.component.html'
})
export class SponsorAgreementDetailComponent implements OnInit, OnDestroy {

    sponsorAgreement: SponsorAgreement;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sponsorAgreementService: SponsorAgreementService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSponsorAgreements();
    }

    load(id) {
        this.sponsorAgreementService.find(id).subscribe((sponsorAgreement) => {
            this.sponsorAgreement = sponsorAgreement;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSponsorAgreements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sponsorAgreementListModification',
            (response) => this.load(this.sponsorAgreement.id)
        );
    }
}
