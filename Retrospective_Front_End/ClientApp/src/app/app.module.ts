import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';

import { CreateBoardDialogComponent } from './components/boardcreate-dialog/boardcreatedialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

import { StylesComponent } from './components/styles/styles.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { RetroBoardComponent } from './components/retro-board/retro-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    StylesComponent,
    CreateBoardDialogComponent,
    ConfirmationDialogComponent,
    RetroBoardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatMenuModule,
    MatDialogModule,
    DragDropModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'styles', component: StylesComponent },
      { path: 'board/:id', component: RetroBoardComponent }
    ]),
    BrowserAnimationsModule
  ],
  entryComponents: [
    CreateBoardDialogComponent,
    ConfirmationDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
