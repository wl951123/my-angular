import { NgModule } from '@angular/core';
// 用到内置指令如*ngIf,*ngFor的地方需要导出CommonModule
import { CommonModule } from '@angular/common';
import { FestivalCarePreviewComponent } from './festival-care-preview';
import { ComponentsModule } from '../../components/components.module';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FestivalCarePreviewComponent,
  },
];
@NgModule({
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [FestivalCarePreviewComponent],
})
export class FestivalCarePreviewModule {}
