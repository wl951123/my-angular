import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FestivalCareDetailModule } from './page/festival-care-detail/festival-care-detail.module';
import { FestivalCarePreviewModule } from './page/festival-care-preview/festival-care-preview.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FestivalCareDetailModule,
    FestivalCarePreviewModule,
    NgZorroAntdMobileModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
