import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBar,
    MatTooltipModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RegisterComponent} from './register.component';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatButtonModule,
                MatIconModule, MatFormFieldModule, MatTooltipModule,
                HttpClientTestingModule, RouterModule, RouterTestingModule, MatDialogModule,
                MatInputModule, MatExpansionModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
            declarations: [RegisterComponent],
            providers: [MatSnackBar]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
