import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISponsorAgreement } from 'app/shared/model/sponsor-agreement.model';
import { SponsorAgreementService } from './sponsor-agreement.service';

@Component({
    selector: 'jhi-sponsor-agreement-delete-dialog',
    templateUrl: './sponsor-agreement-delete-dialog.component.html'
})
export class SponsorAgreementDeleteDialogComponent {
    sponsorAgreement: ISponsorAgreement;

    constructor(
        private sponsorAgreementService: SponsorAgreementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sponsorAgreementService.delete(id).subscribe(response => {
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
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ sponsorAgreement }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SponsorAgreementDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sponsorAgreement = sponsorAgreement.body;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
