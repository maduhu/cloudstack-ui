import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BaseTemplateModel } from '../shared/base-template.model';
import { Template } from '../shared';


@Component({
  selector: 'cs-template-list',
  templateUrl: 'template-list.component.html',
  styleUrls: ['template-list.component.scss']
})
export class TemplateListComponent {
  @Input() public radio = false;
  @Input() public templateList: Array<BaseTemplateModel>;
  @Input() public query: string;
  @Input() public selectedTemplate: BaseTemplateModel;
  @Input() public dialogMode: boolean;
  @Output() public deleteTemplate = new EventEmitter();
  @Output() public selectedTemplateChange = new EventEmitter();

  public selectTemplate(template: BaseTemplateModel): void {
    this.selectedTemplate = template;
    this.selectedTemplateChange.emit(this.selectedTemplate);
  }

  public removeTemplate(template: Template): void {
    this.deleteTemplate.next(template);
  }
}
