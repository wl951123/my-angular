import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// import { FestivalCareDetailModule } from './page/festival-care-detail/festival-care-detail.module';
// import { FestivalCarePreviewModule } from './page/festival-care-preview/festival-care-preview.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // FestivalCareDetailModule,
    // FestivalCarePreviewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
