/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { SponsorAgreementComponent } from 'app/entities/sponsor-agreement/sponsor-agreement.component';
import { SponsorAgreementService } from 'app/entities/sponsor-agreement/sponsor-agreement.service';
import { SponsorAgreement } from 'app/shared/model/sponsor-agreement.model';

describe('Component Tests', () => {
    describe('SponsorAgreement Management Component', () => {
        let comp: SponsorAgreementComponent;
        let fixture: ComponentFixture<SponsorAgreementComponent>;
        let service: SponsorAgreementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [SponsorAgreementComponent],
                providers: [SponsorAgreementService]
            })
                .overrideTemplate(SponsorAgreementComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SponsorAgreementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorAgreementService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new SponsorAgreement(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sponsorAgreements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
