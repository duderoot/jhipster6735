/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterTestModule } from '../../../test.module';
import { SponsorAgreementDetailComponent } from '../../../../../../main/webapp/app/entities/sponsor-agreement/sponsor-agreement-detail.component';
import { SponsorAgreementService } from '../../../../../../main/webapp/app/entities/sponsor-agreement/sponsor-agreement.service';
import { SponsorAgreement } from '../../../../../../main/webapp/app/entities/sponsor-agreement/sponsor-agreement.model';

describe('Component Tests', () => {

    describe('SponsorAgreement Management Detail Component', () => {
        let comp: SponsorAgreementDetailComponent;
        let fixture: ComponentFixture<SponsorAgreementDetailComponent>;
        let service: SponsorAgreementService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [SponsorAgreementDetailComponent],
                providers: [
                    SponsorAgreementService
                ]
            })
            .overrideTemplate(SponsorAgreementDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SponsorAgreementDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorAgreementService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SponsorAgreement(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sponsorAgreement).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
