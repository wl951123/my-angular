import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

import { TextLayoutComponent } from './text-layout/text-layout.component';

import { NoDataComponent } from './no-data/no-data.component';
import { ShareComponent } from './share/share.component';

// 公共组件
const sharedComponents = [TextLayoutComponent, NoDataComponent, ShareComponent];

@NgModule({
  imports: [CommonModule, FormsModule, NgZorroAntdMobileModule],
  declarations: [...sharedComponents],
  providers: [],
  exports: [...sharedComponents, NgZorroAntdMobileModule],
})
export class ComponentsModule {}
