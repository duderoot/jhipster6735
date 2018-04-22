import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISponsor } from 'app/shared/model/sponsor.model';
import { Principal } from 'app/core';
import { SponsorService } from './sponsor.service';

@Component({
    selector: 'jhi-sponsor',
    templateUrl: './sponsor.component.html'
})
export class SponsorComponent implements OnInit, OnDestroy {
    sponsors: ISponsor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sponsorService: SponsorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sponsorService.query().subscribe(
            (res: HttpResponse<ISponsor[]>) => {
                this.sponsors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSponsors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISponsor) {
        return item.id;
    }

    registerChangeInSponsors() {
        this.eventSubscriber = this.eventManager.subscribe('sponsorListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
