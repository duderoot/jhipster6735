import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SponsorAgreement } from './sponsor-agreement.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SponsorAgreement>;

@Injectable()
export class SponsorAgreementService {

    private resourceUrl =  SERVER_API_URL + 'api/sponsor-agreements';

    constructor(private http: HttpClient) { }

    create(sponsorAgreement: SponsorAgreement): Observable<EntityResponseType> {
        const copy = this.convert(sponsorAgreement);
        return this.http.post<SponsorAgreement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sponsorAgreement: SponsorAgreement): Observable<EntityResponseType> {
        const copy = this.convert(sponsorAgreement);
        return this.http.put<SponsorAgreement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SponsorAgreement>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SponsorAgreement[]>> {
        const options = createRequestOption(req);
        return this.http.get<SponsorAgreement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SponsorAgreement[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SponsorAgreement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SponsorAgreement[]>): HttpResponse<SponsorAgreement[]> {
        const jsonResponse: SponsorAgreement[] = res.body;
        const body: SponsorAgreement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SponsorAgreement.
     */
    private convertItemFromServer(sponsorAgreement: SponsorAgreement): SponsorAgreement {
        const copy: SponsorAgreement = Object.assign({}, sponsorAgreement);
        return copy;
    }

    /**
     * Convert a SponsorAgreement to a JSON which can be sent to the server.
     */
    private convert(sponsorAgreement: SponsorAgreement): SponsorAgreement {
        const copy: SponsorAgreement = Object.assign({}, sponsorAgreement);
        return copy;
    }
}
