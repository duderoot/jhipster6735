import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Sponsor } from './sponsor.model';
import { SponsorService } from './sponsor.service';

@Component({
    selector: 'jhi-sponsor-detail',
    templateUrl: './sponsor-detail.component.html'
})
export class SponsorDetailComponent implements OnInit, OnDestroy {

    sponsor: Sponsor;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sponsorService: SponsorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSponsors();
    }

    load(id) {
        this.sponsorService.find(id)
            .subscribe((sponsorResponse: HttpResponse<Sponsor>) => {
                this.sponsor = sponsorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSponsors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sponsorListModification',
            (response) => this.load(this.sponsor.id)
        );
    }
}
