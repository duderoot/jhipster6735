import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISponsor } from 'app/shared/model/sponsor.model';

@Component({
    selector: 'jhi-sponsor-detail',
    templateUrl: './sponsor-detail.component.html'
})
export class SponsorDetailComponent implements OnInit {
    sponsor: ISponsor;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ sponsor }) => {
            this.sponsor = sponsor.body ? sponsor.body : sponsor;
        });
    }

    previousState() {
        window.history.back();
    }
}
