import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISponsorAgreement } from 'app/shared/model/sponsor-agreement.model';

export type EntityResponseType = HttpResponse<ISponsorAgreement>;
export type EntityArrayResponseType = HttpResponse<ISponsorAgreement[]>;

@Injectable()
export class SponsorAgreementService {
    private resourceUrl = SERVER_API_URL + 'api/sponsor-agreements';

    constructor(private http: HttpClient) {}

    create(sponsorAgreement: ISponsorAgreement): Observable<EntityResponseType> {
        const copy = this.convert(sponsorAgreement);
        return this.http
            .post<ISponsorAgreement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sponsorAgreement: ISponsorAgreement): Observable<EntityResponseType> {
        const copy = this.convert(sponsorAgreement);
        return this.http
            .put<ISponsorAgreement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISponsorAgreement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISponsorAgreement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ISponsorAgreement = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: ISponsorAgreement[] = res.body;
        const body: ISponsorAgreement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to SponsorAgreement.
     */
    private convertItemFromServer(sponsorAgreement: ISponsorAgreement): ISponsorAgreement {
        const copy: ISponsorAgreement = Object.assign({}, sponsorAgreement, {});
        return copy;
    }

    /**
     * Convert a SponsorAgreement to a JSON which can be sent to the server.
     */
    private convert(sponsorAgreement: ISponsorAgreement): ISponsorAgreement {
        const copy: ISponsorAgreement = Object.assign({}, sponsorAgreement, {});
        return copy;
    }
}
