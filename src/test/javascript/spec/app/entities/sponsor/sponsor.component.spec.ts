/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { SponsorComponent } from 'app/entities/sponsor/sponsor.component';
import { SponsorService } from 'app/entities/sponsor/sponsor.service';
import { Sponsor } from 'app/shared/model/sponsor.model';

describe('Component Tests', () => {
    describe('Sponsor Management Component', () => {
        let comp: SponsorComponent;
        let fixture: ComponentFixture<SponsorComponent>;
        let service: SponsorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [SponsorComponent],
                providers: [SponsorService]
            })
                .overrideTemplate(SponsorComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SponsorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new Sponsor(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sponsors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
