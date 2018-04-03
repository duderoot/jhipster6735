/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
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
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SponsorAgreementService,
                    JhiEventManager
                ]
            }).overrideTemplate(SponsorAgreementDetailComponent, '')
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

            spyOn(service, 'find').and.returnValue(Observable.of(new SponsorAgreement(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.sponsorAgreement).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
