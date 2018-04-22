import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISponsor } from 'app/shared/model/sponsor.model';

export type EntityResponseType = HttpResponse<ISponsor>;
export type EntityArrayResponseType = HttpResponse<ISponsor[]>;

@Injectable()
export class SponsorService {
    private resourceUrl = SERVER_API_URL + 'api/sponsors';

    constructor(private http: HttpClient) {}

    create(sponsor: ISponsor): Observable<EntityResponseType> {
        const copy = this.convert(sponsor);
        return this.http
            .post<ISponsor>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sponsor: ISponsor): Observable<EntityResponseType> {
        const copy = this.convert(sponsor);
        return this.http
            .put<ISponsor>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISponsor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISponsor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ISponsor = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: ISponsor[] = res.body;
        const body: ISponsor[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Sponsor.
     */
    private convertItemFromServer(sponsor: ISponsor): ISponsor {
        const copy: ISponsor = Object.assign({}, sponsor, {});
        return copy;
    }

    /**
     * Convert a Sponsor to a JSON which can be sent to the server.
     */
    private convert(sponsor: ISponsor): ISponsor {
        const copy: ISponsor = Object.assign({}, sponsor, {});
        return copy;
    }
}
