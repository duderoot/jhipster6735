import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISponsorAgreement } from 'app/shared/model/sponsor-agreement.model';
import { Principal } from 'app/core';
import { SponsorAgreementService } from './sponsor-agreement.service';

@Component({
    selector: 'jhi-sponsor-agreement',
    templateUrl: './sponsor-agreement.component.html'
})
export class SponsorAgreementComponent implements OnInit, OnDestroy {
    sponsorAgreements: ISponsorAgreement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sponsorAgreementService: SponsorAgreementService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sponsorAgreementService.query().subscribe(
            (res: HttpResponse<ISponsorAgreement[]>) => {
                this.sponsorAgreements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSponsorAgreements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISponsorAgreement) {
        return item.id;
    }

    registerChangeInSponsorAgreements() {
        this.eventSubscriber = this.eventManager.subscribe('sponsorAgreementListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
