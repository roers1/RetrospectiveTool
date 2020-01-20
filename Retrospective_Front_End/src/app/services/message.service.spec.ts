import {TestBed} from '@angular/core/testing';

import {MessageService} from './message.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MessageService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [DragDropModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule]
    }));

    it('should be created', () => {
        const service: MessageService = TestBed.get(MessageService);
        expect(service).toBeTruthy();
    });
});
