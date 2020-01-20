import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBar,
    MatTooltipModule
} from '@angular/material';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ErrorComponent} from '../error/error.component';

import {RecoveryComponent} from './recovery.component';

describe('RecoveryComponent', () => {
    let component: RecoveryComponent;
    let fixture: ComponentFixture<RecoveryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DragDropModule, FormsModule, ReactiveFormsModule, MatButtonModule,
                MatIconModule, BrowserDynamicTestingModule, MatMenuModule, MatFormFieldModule, MatTooltipModule,
                HttpClientTestingModule, RouterModule, RouterTestingModule.withRoutes([{
                    path: 'error',
                    component: ErrorComponent
                }]), MatDialogModule, BrowserAnimationsModule,
                MatInputModule, MatExpansionModule],
            declarations: [RecoveryComponent, ErrorComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [MatSnackBar]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecoveryComponent);
        component = fixture.componentInstance;
        component.token = 'ad.'
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
