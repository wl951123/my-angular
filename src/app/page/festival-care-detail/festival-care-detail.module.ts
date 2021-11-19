import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FestivalCareDetailComponent } from './festival-care-detail';

import { ComponentsModule } from '../../components/components.module';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { TipsComponent } from './tips/tips.component';
import { TextEditComponent } from './text-edit/text-edit.component';
import { Html2canvasComponent } from './html2canvas/html2canvas.component';
import { ManagerCardComponent } from './manager-card/manager-card.component';
import { PosterModelComponent } from './poster-model/poster-model.component';
import { LoadingComponent } from './loading/loading.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: FestivalCareDetailComponent,
  },
];
@NgModule({
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    FestivalCareDetailComponent,
    HeaderComponent,
    ContainerComponent,
    TipsComponent,
    TextEditComponent,
    Html2canvasComponent,
    ManagerCardComponent,
    PosterModelComponent,
    LoadingComponent,
    FooterComponent,
  ],
})
export class FestivalCareDetailModule {}
