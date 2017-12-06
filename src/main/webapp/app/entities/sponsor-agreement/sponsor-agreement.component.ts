import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SponsorAgreement } from './sponsor-agreement.model';
import { SponsorAgreementService } from './sponsor-agreement.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-sponsor-agreement',
    templateUrl: './sponsor-agreement.component.html'
})
export class SponsorAgreementComponent implements OnInit, OnDestroy {
sponsorAgreements: SponsorAgreement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sponsorAgreementService: SponsorAgreementService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.sponsorAgreementService.query().subscribe(
            (res: ResponseWrapper) => {
                this.sponsorAgreements = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSponsorAgreements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SponsorAgreement) {
        return item.id;
    }
    registerChangeInSponsorAgreements() {
        this.eventSubscriber = this.eventManager.subscribe('sponsorAgreementListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}