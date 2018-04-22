import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { ISponsor } from 'app/shared/model/sponsor.model';
import { SponsorService } from './sponsor.service';
import { ISponsorAgreement } from 'app/shared/model/sponsor-agreement.model';
import { SponsorAgreementService } from 'app/entities/sponsor-agreement';

@Component({
    selector: 'jhi-sponsor-update',
    templateUrl: './sponsor-update.component.html'
})
export class SponsorUpdateComponent implements OnInit {
    private _sponsor: ISponsor;
    isSaving: boolean;

    sponsoragreements: ISponsorAgreement[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sponsorService: SponsorService,
        private sponsorAgreementService: SponsorAgreementService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ sponsor }) => {
            this.sponsor = sponsor.body ? sponsor.body : sponsor;
        });
        this.sponsorAgreementService.query().subscribe(
            (res: HttpResponse<ISponsorAgreement[]>) => {
                this.sponsoragreements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sponsor.id !== undefined) {
            this.subscribeToSaveResponse(this.sponsorService.update(this.sponsor));
        } else {
            this.subscribeToSaveResponse(this.sponsorService.create(this.sponsor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISponsor>>) {
        result.subscribe((res: HttpResponse<ISponsor>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ISponsor) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSponsorAgreementById(index: number, item: ISponsorAgreement) {
        return item.id;
    }
    get sponsor() {
        return this._sponsor;
    }

    set sponsor(sponsor: ISponsor) {
        this._sponsor = sponsor;
    }
}
