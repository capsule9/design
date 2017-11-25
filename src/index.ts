import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {AjaxItemOptions} from './ajax-item/ajax-item.types';
import {AjaxListOptions} from './ajax-list/ajax-list.types';

import {AjaxListService} from './ajax-list/ajax-list.service';
import {AjaxItemService} from './ajax-item/ajax-item.service';

import {AjaxListActions} from './ajax-list/ajax-list.actions';
import {AjaxListEpics} from './ajax-list/ajax-list.epics';
import {AjaxItemActions} from './ajax-item/ajax-item.actions';
import {AjaxItemEpics} from './ajax-item/ajax-item.epics';
import {AJAX_ITEM_API_URI, AJAX_LIST_API_URI} from './tokens';

/* AjaxItem Module exports */
export * from './payload.types';
export * from './ajax-item/ajax-item.module';
export * from './ajax-item/ajax-item.actions';
export * from './ajax-item/ajax-item.epics';
export * from './ajax-item/ajax-item.service';
export * from './ajax-item/ajax-item.reducer';

/* AjaxList Module exports */
export * from './ajax-list/ajax-list.module';
export * from './ajax-list/ajax-list.actions';
export * from './ajax-list/ajax-list.epics';
export * from './ajax-list/ajax-list.service';
export * from './ajax-list/ajax-list.reducer';


const AJAX_MODULE_PROVIDERS = [
  AjaxListActions, AjaxListEpics, AjaxListService,
  AjaxItemActions, AjaxItemEpics, AjaxItemService
];
@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: AJAX_MODULE_PROVIDERS,
})
export class AjaxModule {
  static forRoot(options: {
    list: AjaxListOptions,
    item: AjaxItemOptions
  }): ModuleWithProviders {
    return {
      ngModule: AjaxModule,
      providers: [
        { provide: AJAX_LIST_API_URI, useValue: options.list.urls },
        { provide: AJAX_ITEM_API_URI, useValue: options.item.urls },
        ...AJAX_MODULE_PROVIDERS
      ],
    };
  }
}
