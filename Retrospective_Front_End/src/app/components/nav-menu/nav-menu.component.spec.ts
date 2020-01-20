import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatSnackBar,
    MatTooltipModule
} from '@angular/material';

import {NavMenuComponent} from './nav-menu.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('NavComponent', () => {
    let component: NavMenuComponent;
    let fixture: ComponentFixture<NavMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatButtonModule,
                MatIconModule, MatTooltipModule, HttpClientTestingModule, RouterModule, RouterTestingModule,
                MatDialogModule, MatExpansionModule, MatInputModule],
            declarations: [NavMenuComponent],
            providers: [MatSnackBar]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
