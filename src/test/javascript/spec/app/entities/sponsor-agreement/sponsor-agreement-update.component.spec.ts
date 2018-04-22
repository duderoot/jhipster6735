/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { SponsorAgreementUpdateComponent } from 'app/entities/sponsor-agreement/sponsor-agreement-update.component';
import { SponsorAgreementService } from 'app/entities/sponsor-agreement/sponsor-agreement.service';
import { SponsorAgreement } from 'app/shared/model/sponsor-agreement.model';

import { SponsorService } from 'app/entities/sponsor';

describe('Component Tests', () => {
    describe('SponsorAgreement Management Update Component', () => {
        let comp: SponsorAgreementUpdateComponent;
        let fixture: ComponentFixture<SponsorAgreementUpdateComponent>;
        let service: SponsorAgreementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [SponsorAgreementUpdateComponent],
                providers: [SponsorService, SponsorAgreementService]
            })
                .overrideTemplate(SponsorAgreementUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SponsorAgreementUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorAgreementService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SponsorAgreement(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.sponsorAgreement = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SponsorAgreement();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.sponsorAgreement = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
