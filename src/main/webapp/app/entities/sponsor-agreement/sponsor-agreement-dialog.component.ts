import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SponsorAgreement } from './sponsor-agreement.model';
import { SponsorAgreementPopupService } from './sponsor-agreement-popup.service';
import { SponsorAgreementService } from './sponsor-agreement.service';
import { Sponsor, SponsorService } from '../sponsor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-sponsor-agreement-dialog',
    templateUrl: './sponsor-agreement-dialog.component.html'
})
export class SponsorAgreementDialogComponent implements OnInit {

    sponsorAgreement: SponsorAgreement;
    isSaving: boolean;

    sponsors: Sponsor[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sponsorAgreementService: SponsorAgreementService,
        private sponsorService: SponsorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sponsorService
            .query({filter: 'sponsoragreement-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.sponsorAgreement.sponsor || !this.sponsorAgreement.sponsor.id) {
                    this.sponsors = res.json;
                } else {
                    this.sponsorService
                        .find(this.sponsorAgreement.sponsor.id)
                        .subscribe((subRes: Sponsor) => {
                            this.sponsors = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sponsorAgreement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sponsorAgreementService.update(this.sponsorAgreement));
        } else {
            this.subscribeToSaveResponse(
                this.sponsorAgreementService.create(this.sponsorAgreement));
        }
    }

    private subscribeToSaveResponse(result: Observable<SponsorAgreement>) {
        result.subscribe((res: SponsorAgreement) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SponsorAgreement) {
        this.eventManager.broadcast({ name: 'sponsorAgreementListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSponsorById(index: number, item: Sponsor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sponsor-agreement-popup',
    template: ''
})
export class SponsorAgreementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sponsorAgreementPopupService: SponsorAgreementPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sponsorAgreementPopupService
                    .open(SponsorAgreementDialogComponent as Component, params['id']);
            } else {
                this.sponsorAgreementPopupService
                    .open(SponsorAgreementDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
