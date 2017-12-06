/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterTestModule } from '../../../test.module';
import { SponsorComponent } from '../../../../../../main/webapp/app/entities/sponsor/sponsor.component';
import { SponsorService } from '../../../../../../main/webapp/app/entities/sponsor/sponsor.service';
import { Sponsor } from '../../../../../../main/webapp/app/entities/sponsor/sponsor.model';

describe('Component Tests', () => {

    describe('Sponsor Management Component', () => {
        let comp: SponsorComponent;
        let fixture: ComponentFixture<SponsorComponent>;
        let service: SponsorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [SponsorComponent],
                providers: [
                    SponsorService
                ]
            })
            .overrideTemplate(SponsorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SponsorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Sponsor(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sponsors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
