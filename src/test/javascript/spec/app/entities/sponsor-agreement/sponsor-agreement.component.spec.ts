/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterTestModule } from '../../../test.module';
import { SponsorAgreementComponent } from '../../../../../../main/webapp/app/entities/sponsor-agreement/sponsor-agreement.component';
import { SponsorAgreementService } from '../../../../../../main/webapp/app/entities/sponsor-agreement/sponsor-agreement.service';
import { SponsorAgreement } from '../../../../../../main/webapp/app/entities/sponsor-agreement/sponsor-agreement.model';

describe('Component Tests', () => {

    describe('SponsorAgreement Management Component', () => {
        let comp: SponsorAgreementComponent;
        let fixture: ComponentFixture<SponsorAgreementComponent>;
        let service: SponsorAgreementService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [SponsorAgreementComponent],
                providers: [
                    SponsorAgreementService
                ]
            })
            .overrideTemplate(SponsorAgreementComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SponsorAgreementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorAgreementService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SponsorAgreement(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sponsorAgreements[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
