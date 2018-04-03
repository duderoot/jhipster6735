import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Sponsor } from './sponsor.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Sponsor>;

@Injectable()
export class SponsorService {

    private resourceUrl =  SERVER_API_URL + 'api/sponsors';

    constructor(private http: HttpClient) { }

    create(sponsor: Sponsor): Observable<EntityResponseType> {
        const copy = this.convert(sponsor);
        return this.http.post<Sponsor>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sponsor: Sponsor): Observable<EntityResponseType> {
        const copy = this.convert(sponsor);
        return this.http.put<Sponsor>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Sponsor>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Sponsor[]>> {
        const options = createRequestOption(req);
        return this.http.get<Sponsor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Sponsor[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Sponsor = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Sponsor[]>): HttpResponse<Sponsor[]> {
        const jsonResponse: Sponsor[] = res.body;
        const body: Sponsor[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Sponsor.
     */
    private convertItemFromServer(sponsor: Sponsor): Sponsor {
        const copy: Sponsor = Object.assign({}, sponsor);
        return copy;
    }

    /**
     * Convert a Sponsor to a JSON which can be sent to the server.
     */
    private convert(sponsor: Sponsor): Sponsor {
        const copy: Sponsor = Object.assign({}, sponsor);
        return copy;
    }
}
