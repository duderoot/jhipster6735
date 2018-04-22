import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { ISponsorAgreement } from 'app/shared/model/sponsor-agreement.model';
import { SponsorAgreementService } from './sponsor-agreement.service';
import { ISponsor } from 'app/shared/model/sponsor.model';
import { SponsorService } from 'app/entities/sponsor';

@Component({
    selector: 'jhi-sponsor-agreement-update',
    templateUrl: './sponsor-agreement-update.component.html'
})
export class SponsorAgreementUpdateComponent implements OnInit {
    private _sponsorAgreement: ISponsorAgreement;
    isSaving: boolean;

    sponsors: ISponsor[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sponsorAgreementService: SponsorAgreementService,
        private sponsorService: SponsorService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ sponsorAgreement }) => {
            this.sponsorAgreement = sponsorAgreement.body ? sponsorAgreement.body : sponsorAgreement;
        });
        this.sponsorService.query({ filter: 'sponsoragreement-is-null' }).subscribe(
            (res: HttpResponse<ISponsor[]>) => {
                if (!this.sponsorAgreement.sponsor || !this.sponsorAgreement.sponsor.id) {
                    this.sponsors = res.body;
                } else {
                    this.sponsorService.find(this.sponsorAgreement.sponsor.id).subscribe(
                        (subRes: HttpResponse<ISponsor>) => {
                            this.sponsors = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sponsorAgreement.id !== undefined) {
            this.subscribeToSaveResponse(this.sponsorAgreementService.update(this.sponsorAgreement));
        } else {
            this.subscribeToSaveResponse(this.sponsorAgreementService.create(this.sponsorAgreement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISponsorAgreement>>) {
        result.subscribe(
            (res: HttpResponse<ISponsorAgreement>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: ISponsorAgreement) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSponsorById(index: number, item: ISponsor) {
        return item.id;
    }
    get sponsorAgreement() {
        return this._sponsorAgreement;
    }

    set sponsorAgreement(sponsorAgreement: ISponsorAgreement) {
        this._sponsorAgreement = sponsorAgreement;
    }
}
