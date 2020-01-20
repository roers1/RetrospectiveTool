import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatProgressBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {ErrorComponent} from './components/error/error.component';
import {RecoveryComponent} from './components/recovery/recovery.component';

import {CreateBoardDialogComponent} from './components/board-create-dialog/board-create-dialog.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {EditTextDialogComponent} from './components/edit-text-dialog/edit-text-dialog.component';
import {LoginDialogComponent} from './components/login-dialog/login-dialog.component';

import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {RetroBoardComponent} from './components/retro-board/retro-board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {CardItemComponent} from './components/card-item/card-item.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RetroItemComponent} from './components/dashboard/retro-item/retro-item.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        RegisterComponent,
        ErrorComponent,
        CardItemComponent,
        RecoveryComponent,
        CreateBoardDialogComponent,
        ConfirmationDialogComponent,
        EditTextDialogComponent,
        LoginDialogComponent,
        RetroBoardComponent,
        DashboardComponent,
        RetroItemComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTooltipModule,
        MatIconModule,
        MatFormFieldModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatSliderModule,
        MatMenuModule,
        MatDialogModule,
        DragDropModule,
        MatProgressBarModule,
        MatGridListModule,
        RouterModule.forRoot([
            {path: '', component: HomeComponent, pathMatch: 'full'},
            {path: 'register', component: RegisterComponent},
            {path: 'board/:id', component: RetroBoardComponent},
            {path: 'error', component: ErrorComponent},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'updatepassword/:token', component: RecoveryComponent}
        ]),
        BrowserAnimationsModule,
        MatExpansionModule,
    ],
    entryComponents: [
        CreateBoardDialogComponent,
        ConfirmationDialogComponent,
        EditTextDialogComponent,
        LoginDialogComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
