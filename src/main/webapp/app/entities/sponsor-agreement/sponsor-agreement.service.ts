import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SponsorAgreement } from './sponsor-agreement.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SponsorAgreementService {

    private resourceUrl =  SERVER_API_URL + 'api/sponsor-agreements';

    constructor(private http: Http) { }

    create(sponsorAgreement: SponsorAgreement): Observable<SponsorAgreement> {
        const copy = this.convert(sponsorAgreement);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(sponsorAgreement: SponsorAgreement): Observable<SponsorAgreement> {
        const copy = this.convert(sponsorAgreement);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SponsorAgreement> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to SponsorAgreement.
     */
    private convertItemFromServer(json: any): SponsorAgreement {
        const entity: SponsorAgreement = Object.assign(new SponsorAgreement(), json);
        return entity;
    }

    /**
     * Convert a SponsorAgreement to a JSON which can be sent to the server.
     */
    private convert(sponsorAgreement: SponsorAgreement): SponsorAgreement {
        const copy: SponsorAgreement = Object.assign({}, sponsorAgreement);
        return copy;
    }
}
