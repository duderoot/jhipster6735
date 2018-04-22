/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { SponsorDialogComponent } from '../../../../../../main/webapp/app/entities/sponsor/sponsor-dialog.component';
import { SponsorService } from '../../../../../../main/webapp/app/entities/sponsor/sponsor.service';
import { Sponsor } from '../../../../../../main/webapp/app/entities/sponsor/sponsor.model';
import { SponsorAgreementService } from '../../../../../../main/webapp/app/entities/sponsor-agreement';

describe('Component Tests', () => {

    describe('Sponsor Management Dialog Component', () => {
        let comp: SponsorDialogComponent;
        let fixture: ComponentFixture<SponsorDialogComponent>;
        let service: SponsorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [SponsorDialogComponent],
                providers: [
                    SponsorAgreementService,
                    SponsorService
                ]
            })
            .overrideTemplate(SponsorDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SponsorDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Sponsor(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.sponsor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sponsorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Sponsor();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.sponsor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sponsorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
