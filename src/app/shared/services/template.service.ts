import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Template } from '../models';

import { BackendResource } from '../decorators/backend-resource.decorator';

import { BaseBackendService } from './base-backend.service';
import { NotificationService } from '../notification.service';

@Injectable()
@BackendResource({
  entity: 'Template',
  entityModel: Template
})
export class TemplateService extends BaseBackendService<Template> {
  constructor(http: Http, notification: NotificationService) {
    super(http, notification);
  }

  public get(id: string): Promise<Template> {
    const templatefilter = 'featured';
    return new Promise((resolve, reject) => {
      this.getList({templatefilter, id})
        .then(
          data => {
            resolve(data[0]);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  public getList(params: { templatefilter: string, [propName: string]: any }): Promise<Array<Template>> {
    return super.getList(params);
  }
}
