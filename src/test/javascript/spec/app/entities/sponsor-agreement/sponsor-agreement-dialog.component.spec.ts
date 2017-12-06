/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { SponsorAgreementDialogComponent } from '../../../../../../main/webapp/app/entities/sponsor-agreement/sponsor-agreement-dialog.component';
import { SponsorAgreementService } from '../../../../../../main/webapp/app/entities/sponsor-agreement/sponsor-agreement.service';
import { SponsorAgreement } from '../../../../../../main/webapp/app/entities/sponsor-agreement/sponsor-agreement.model';
import { SponsorService } from '../../../../../../main/webapp/app/entities/sponsor';

describe('Component Tests', () => {

    describe('SponsorAgreement Management Dialog Component', () => {
        let comp: SponsorAgreementDialogComponent;
        let fixture: ComponentFixture<SponsorAgreementDialogComponent>;
        let service: SponsorAgreementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [SponsorAgreementDialogComponent],
                providers: [
                    SponsorService,
                    SponsorAgreementService
                ]
            })
            .overrideTemplate(SponsorAgreementDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SponsorAgreementDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorAgreementService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SponsorAgreement(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.sponsorAgreement = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sponsorAgreementListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SponsorAgreement();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.sponsorAgreement = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sponsorAgreementListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
