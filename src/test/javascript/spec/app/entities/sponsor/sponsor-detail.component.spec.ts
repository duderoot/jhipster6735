/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { SponsorDetailComponent } from '../../../../../../main/webapp/app/entities/sponsor/sponsor-detail.component';
import { SponsorService } from '../../../../../../main/webapp/app/entities/sponsor/sponsor.service';
import { Sponsor } from '../../../../../../main/webapp/app/entities/sponsor/sponsor.model';

describe('Component Tests', () => {

    describe('Sponsor Management Detail Component', () => {
        let comp: SponsorDetailComponent;
        let fixture: ComponentFixture<SponsorDetailComponent>;
        let service: SponsorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [SponsorDetailComponent],
                providers: [
                    SponsorService
                ]
            })
            .overrideTemplate(SponsorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SponsorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Sponsor(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sponsor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
