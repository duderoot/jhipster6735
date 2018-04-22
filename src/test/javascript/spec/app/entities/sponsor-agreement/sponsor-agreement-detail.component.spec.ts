/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { JhipsterTestModule } from '../../../test.module';
import { SponsorAgreementDetailComponent } from 'app/entities/sponsor-agreement/sponsor-agreement-detail.component';
import { SponsorAgreement } from 'app/shared/model/sponsor-agreement.model';

describe('Component Tests', () => {
    describe('SponsorAgreement Management Detail Component', () => {
        let comp: SponsorAgreementDetailComponent;
        let fixture: ComponentFixture<SponsorAgreementDetailComponent>;
        const route = ({ data: of({ sponsorAgreement: new SponsorAgreement(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [SponsorAgreementDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SponsorAgreementDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SponsorAgreementDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sponsorAgreement).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
