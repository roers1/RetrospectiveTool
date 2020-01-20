import {TestBed} from '@angular/core/testing';

import {RetroFamilyService} from './retro-family.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('RetroFamilyService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule]
    }));

    it('should be created', () => {
        const service: RetroFamilyService = TestBed.get(RetroFamilyService);
        expect(service).toBeTruthy();
    });
});
