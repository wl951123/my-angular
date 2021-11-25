import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'festivalCareDetail',
    loadChildren: () =>
      import('./page/festival-care-detail/festival-care-detail.module').then(
        (mod) => mod.FestivalCareDetailModule
      ),
  },
  {
    path: 'festivalCarePreview',
    loadChildren: () =>
      import('./page/festival-care-preview/festival-care-preview.module').then(
        (mod) => mod.FestivalCarePreviewModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
