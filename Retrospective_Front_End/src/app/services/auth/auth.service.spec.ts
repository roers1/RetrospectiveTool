import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

import {AuthService} from './auth.service';

describe('AuthService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])]
        })
    );

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
});
