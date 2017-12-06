/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { SponsorAgreementDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/sponsor-agreement/sponsor-agreement-delete-dialog.component';
import { SponsorAgreementService } from '../../../../../../main/webapp/app/entities/sponsor-agreement/sponsor-agreement.service';

describe('Component Tests', () => {

    describe('SponsorAgreement Management Delete Component', () => {
        let comp: SponsorAgreementDeleteDialogComponent;
        let fixture: ComponentFixture<SponsorAgreementDeleteDialogComponent>;
        let service: SponsorAgreementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [SponsorAgreementDeleteDialogComponent],
                providers: [
                    SponsorAgreementService
                ]
            })
            .overrideTemplate(SponsorAgreementDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SponsorAgreementDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorAgreementService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
