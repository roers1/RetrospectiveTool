import {inject, TestBed} from '@angular/core/testing';
import {LoginGuard} from './login.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginGuard],
            imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule.withRoutes([])]
        });
    });

    it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
        expect(guard).toBeTruthy();
    }));
});
