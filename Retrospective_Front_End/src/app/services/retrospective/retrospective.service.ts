import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from '../../../helpers/url-constants';
import {Retrospective} from '../../../models/Retrospective';
import {RetroColumn} from '../../../models/RetroColumn';
import {RetroCard} from '../../../models/RetroCard';
import {RetroFamily} from '../../../models/RetroFamily';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RetrospectiveService {

    private readonly baseUrlRetrospective: string = baseUrl + 'retrospectives/';

    private retrospective: Retrospective;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient, public router: Router) {
    }

    getRetrospectives() {
        const updatedHttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': localStorage.getItem('access_token')
            })
        };

        const x = this.http.get<Retrospective[]>(this.baseUrlRetrospective, updatedHttpOptions);
        console.log(x)
        return x;
    }

    createRetrospective(title, description) {
        const updatedHttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': localStorage.getItem('access_token')
            })
        };

        return this.http.post<Retrospective>(this.baseUrlRetrospective, {
            title: title,
            description: description
        }, updatedHttpOptions);
    }

    getRetrospective(id, cb) {

        this.http.get<Retrospective>(this.baseUrlRetrospective + id, this.httpOptions)
            .subscribe(
                (retrospective) => {
                    this.retrospective = retrospective;

                    // @ts-ignore
                    for (const column: RetroColumn of this.retrospective.retroColumns) {
                        column.retroItems = [];
                        // @ts-ignore
                        for (const retroCard: RetroCard of column.retroCards) {
                            column.retroItems.push(retroCard);
                        }
                        // @ts-ignore
                        for (const retroFamily: RetroFamily of column.retroFamilies) {
                            column.retroItems.push(retroFamily);
                        }
                    }
                    cb(retrospective);
                },
                (err) => {
                    console.log(err);
                    if(this.router.url !== '/dashboard') {
                        this.router.navigate(['/error']);
                    }
                }
            );
    }

    cleanRetrospective(id): Observable<Retrospective> {
        const updatedHttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': localStorage.getItem('access_token')
            })
        };
        return this.http.delete<Retrospective>(this.baseUrlRetrospective + id + '/RetroCards', updatedHttpOptions);
    }

    getCurrentRetrospective(): Retrospective {
        if (this.retrospective != null && this.retrospective !== undefined) {
            return this.retrospective;
        } else {
            return null;
        }
    }

    getCurrentRetrospectiveId(): number {
        if (this.retrospective != null && this.retrospective !== undefined) {
            return this.retrospective.id;
        } else {
            return null;
        }
    }

    deleteRetrospective(retrospective: Retrospective) {
        const updatedHttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': localStorage.getItem('access_token')
            })
        };

        return this.http.delete<Retrospective>(this.baseUrlRetrospective + retrospective.id, updatedHttpOptions);
    }

    updateRetrospective(retrospective: Retrospective) {
        const updatedHttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': localStorage.getItem('access_token')
            })
        };

        const data = {
            id: retrospective.id,
            title: retrospective.title,
            description: retrospective.description,
            retroColumns: retrospective.retroColumns,
            retroUserId: retrospective.retroUserId
        };

        console.log(data);
        if (retrospective != null) {
            return this.http.put(this.baseUrlRetrospective, data, updatedHttpOptions);
        }

    }
}
