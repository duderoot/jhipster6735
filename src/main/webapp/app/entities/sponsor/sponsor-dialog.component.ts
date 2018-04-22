import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Sponsor } from './sponsor.model';
import { SponsorPopupService } from './sponsor-popup.service';
import { SponsorService } from './sponsor.service';
import { SponsorAgreement, SponsorAgreementService } from '../sponsor-agreement';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-sponsor-dialog',
    templateUrl: './sponsor-dialog.component.html'
})
export class SponsorDialogComponent implements OnInit {

    sponsor: Sponsor;
    isSaving: boolean;

    sponsoragreements: SponsorAgreement[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sponsorService: SponsorService,
        private sponsorAgreementService: SponsorAgreementService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sponsorAgreementService.query()
            .subscribe((res: ResponseWrapper) => { this.sponsoragreements = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sponsor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sponsorService.update(this.sponsor));
        } else {
            this.subscribeToSaveResponse(
                this.sponsorService.create(this.sponsor));
        }
    }

    private subscribeToSaveResponse(result: Observable<Sponsor>) {
        result.subscribe((res: Sponsor) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Sponsor) {
        this.eventManager.broadcast({ name: 'sponsorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSponsorAgreementById(index: number, item: SponsorAgreement) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sponsor-popup',
    template: ''
})
export class SponsorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sponsorPopupService: SponsorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sponsorPopupService
                    .open(SponsorDialogComponent as Component, params['id']);
            } else {
                this.sponsorPopupService
                    .open(SponsorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
