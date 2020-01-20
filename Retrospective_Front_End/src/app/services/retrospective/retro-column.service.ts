import {Injectable} from '@angular/core';
import {baseUrl} from '../../../helpers/url-constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RetrospectiveService} from './retrospective.service';
import {Observable} from 'rxjs';
import {RetroColumn} from '../../../models/RetroColumn';
import {RetroCard} from '../../../models/RetroCard';
import {RetroFamily} from '../../../models/RetroFamily';

@Injectable({
    providedIn: 'root'
})
export class RetroColumnService {

    private readonly baseUrlRetrospective: string = baseUrl + 'retrospectives/';

    private readonly baseUrlRetroColumn = baseUrl + 'retrocolumns/';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, private retrospectiveService: RetrospectiveService) {
    }

    getRetroColumns(): Observable<RetroColumn[]> {
        return this.http.get<RetroColumn[]>(this.baseUrlRetroColumn, this.httpOptions);
    }

    getRetroColumn(id): Observable<RetroColumn> {
        return this.http.get<RetroColumn>(this.baseUrlRetroColumn + id, this.httpOptions);
    }

    createColumn(title, retrospectiveId): Observable<RetroColumn> {
        const updatedHttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': localStorage.getItem('access_token')
            })
        };
        if (this.retrospectiveService.getCurrentRetrospective()) {
            return this.http.post<RetroColumn>(this.baseUrlRetroColumn, {
                title: title,
                retrospectiveId: retrospectiveId
            }, updatedHttpOptions);
        }
    }

    updateColumn(retroColumn: RetroColumn) {
        if (retroColumn != null) {
            retroColumn.retroCards = <RetroCard[]>retroColumn.retroItems.filter((x) => this.isRetroCard(x));
            retroColumn.retroFamilies = <RetroFamily[]>retroColumn.retroItems.filter((x) => this.isFamily(x));

            return this.http.put<RetroColumn>(this.baseUrlRetroColumn, retroColumn, this.httpOptions);
        }
    }

    removeColumn(columnId): Observable<RetroColumn> {
        const updatedHttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': localStorage.getItem('access_token')
            })
        };
        if (this.retrospectiveService.getCurrentRetrospective()) {
            return this.http.delete<RetroColumn>(this.baseUrlRetroColumn + columnId, updatedHttpOptions);
        }
    }

    isRetroCard(item) {
        return item.hasOwnProperty('upVotes');
    }

    isFamily(item) {
        return item.hasOwnProperty('retroCards');
    }
}
