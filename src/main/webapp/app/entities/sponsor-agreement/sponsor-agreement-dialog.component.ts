import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SponsorAgreement } from './sponsor-agreement.model';
import { SponsorAgreementPopupService } from './sponsor-agreement-popup.service';
import { SponsorAgreementService } from './sponsor-agreement.service';
import { Sponsor, SponsorService } from '../sponsor';

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
            .subscribe((res: HttpResponse<Sponsor[]>) => {
                if (!this.sponsorAgreement.sponsor || !this.sponsorAgreement.sponsor.id) {
                    this.sponsors = res.body;
                } else {
                    this.sponsorService
                        .find(this.sponsorAgreement.sponsor.id)
                        .subscribe((subRes: HttpResponse<Sponsor>) => {
                            this.sponsors = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<SponsorAgreement>>) {
        result.subscribe((res: HttpResponse<SponsorAgreement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
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
