import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SponsorAgreement } from './sponsor-agreement.model';
import { SponsorAgreementPopupService } from './sponsor-agreement-popup.service';
import { SponsorAgreementService } from './sponsor-agreement.service';

@Component({
    selector: 'jhi-sponsor-agreement-delete-dialog',
    templateUrl: './sponsor-agreement-delete-dialog.component.html'
})
export class SponsorAgreementDeleteDialogComponent {

    sponsorAgreement: SponsorAgreement;

    constructor(
        private sponsorAgreementService: SponsorAgreementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sponsorAgreementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sponsorAgreementListModification',
                content: 'Deleted an sponsorAgreement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sponsor-agreement-delete-popup',
    template: ''
})
export class SponsorAgreementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sponsorAgreementPopupService: SponsorAgreementPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sponsorAgreementPopupService
                .open(SponsorAgreementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
