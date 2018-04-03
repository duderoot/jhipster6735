import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Sponsor } from './sponsor.model';
import { SponsorService } from './sponsor.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-sponsor',
    templateUrl: './sponsor.component.html'
})
export class SponsorComponent implements OnInit, OnDestroy {
sponsors: Sponsor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sponsorService: SponsorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.sponsorService.query().subscribe(
            (res: HttpResponse<Sponsor[]>) => {
                this.sponsors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSponsors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Sponsor) {
        return item.id;
    }
    registerChangeInSponsors() {
        this.eventSubscriber = this.eventManager.subscribe('sponsorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
