import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageComponent } from './components/message/message.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerService } from './services/server.service';
import { UtilService } from './services/util.service';
import { ErrorService } from './services/error.service';
import { MessageService } from './services/message.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        MessageComponent,
    ],
    providers: [
        MessageService,
        ErrorService,
        UtilService,
        ServerService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    entryComponents: [],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        MessageComponent,
    ],
})
export class SharedModule { }