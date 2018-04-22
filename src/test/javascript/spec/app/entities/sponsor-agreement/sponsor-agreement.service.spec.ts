/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SponsorAgreementService } from 'app/entities/sponsor-agreement/sponsor-agreement.service';
import { SponsorAgreement } from 'app/shared/model/sponsor-agreement.model';
import { SERVER_API_URL } from 'app/app.constants';

describe('Service Tests', () => {
    describe('SponsorAgreement Service', () => {
        let injector: TestBed;
        let service: SponsorAgreementService;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [SponsorAgreementService]
            });
            injector = getTestBed();
            service = injector.get(SponsorAgreementService);
            httpMock = injector.get(HttpTestingController);
        });

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find(123).subscribe(() => {});

                const req = httpMock.expectOne({ method: 'GET' });

                const resourceUrl = SERVER_API_URL + 'api/sponsor-agreements';
                expect(req.request.url).toEqual(resourceUrl + '/' + 123);
            });

            it('should create a SponsorAgreement', () => {
                service.create(new SponsorAgreement(null)).subscribe(received => {
                    expect(received.body.id).toEqual(null);
                });

                const req = httpMock.expectOne({ method: 'POST' });
                req.flush({ id: null });
            });

            it('should update a SponsorAgreement', () => {
                service.update(new SponsorAgreement(123)).subscribe(received => {
                    expect(received.body.id).toEqual(123);
                });

                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush({ id: 123 });
            });

            it('should return a SponsorAgreement', () => {
                service.find(123).subscribe(received => {
                    expect(received.body.id).toEqual(123);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush({ id: 123 });
            });

            it('should return a list of SponsorAgreement', () => {
                service.query(null).subscribe(received => {
                    expect(received.body[0].id).toEqual(123);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush([new SponsorAgreement(123)]);
            });

            it('should delete a SponsorAgreement', () => {
                service.delete(123).subscribe(received => {
                    expect(received.url).toContain('/' + 123);
                });

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush(null);
            });

            it('should propagate not found response', () => {
                service.find(123).subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404,
                    statusText: 'Bad Request'
                });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
