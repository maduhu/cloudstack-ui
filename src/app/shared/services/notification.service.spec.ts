import { MdlDialogModule, MdlDialogOutletModule, MdlSnackbaModule } from '@angular-mdl/core';
import { Component } from '@angular/core';

import { async, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../../testutils/mocks/mock-translate.service.spec';
import { NotificationService } from './notification.service';


@Component({
  selector: 'cs-test-view',
  template: '<div></div><dialog-outlet></dialog-outlet>',
  providers: [NotificationService]
})
class MdlTestViewComponent {}

describe('Service: Notification service', () => {
  let ns: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MdlTestViewComponent],
      imports: [
        MdlDialogModule,
        MdlDialogOutletModule,
        MdlSnackbaModule.forRoot(),
      ],
      providers: [
        NotificationService,
        { provide: TranslateService, useClass: MockTranslateService }
      ]
    });
  }));

  beforeEach(async(inject([NotificationService], (service: NotificationService) => {
      ns = service;
    }))
  );

  it('notification appears onscreen and disappears after ~3seconds', fakeAsync(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    let notification = ns.message('test');

    fixture.detectChanges();
    notification.subscribe((mdlSnackbarComponent) => {
      // snackbar appeared'
      expect(mdlSnackbarComponent.isActive()).toBe(true);
      expect(fixture.nativeElement.querySelectorAll('.mdl-snackbar').length).toBe(1);
      expect(fixture.nativeElement.querySelectorAll('.mdl-snackbar')[0].textContent).toContain('test');

      tick(3500);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('.mdl-snackbar').length).toBe(0);
      expect(mdlSnackbarComponent.isActive()).toBe(false);

    });
    tick(1000); // wait for subscribe
  }));

  it('warning appears onscreen and disappears after ~3seconds', fakeAsync(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let warning = ns.warning('test', {
      handler: () => {},
      text: 'test'
    });

    fixture.detectChanges();
    warning.subscribe((mdlSnackbarComponent) => {
      // snackbar appeared
      expect(mdlSnackbarComponent.isActive()).toBe(true);
      expect(fixture.nativeElement.querySelectorAll('.mdl-snackbar').length).toBe(1);
      expect(fixture.nativeElement.querySelectorAll('.mdl-snackbar')[0].textContent).toContain('test');

      tick(3500);
      fixture.detectChanges();
      expect(mdlSnackbarComponent.isActive()).toBe(false);
    });
    tick(1000); // wait for subscribe
  }));

  it('warning disappears immediately after action', async(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = ns.warning('test', {
      handler: () => {},
      text: 'test'
    });

    fixture.detectChanges();
    p.subscribe( (mdlSnackbarComponent) => {
      // snackbar appeared, proceed
      expect(mdlSnackbarComponent.isActive()).toBe(true);
      fixture.nativeElement.querySelectorAll('button')[0].click();
      expect(mdlSnackbarComponent.isActive()).toBe(false);
    });
  }));

  it('warning action handler is called on action button click', fakeAsync(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let test = { a: 0 };

    let f = function(): void {
      this.a = 1;
    };

    let warning = ns.error('test', {
      handler: f.bind(test),
      text: 'test'
    });

    fixture.detectChanges();

    warning.subscribe((MdlSnackbarComponent) => {
      // snackbar appeared
      MdlSnackbarComponent.onClick.call(MdlSnackbarComponent);
      expect(MdlSnackbarComponent.isActive()).toBe(false);

      tick(1000);
      fixture.detectChanges();
      expect(test.a).toBe(1);
    });
    tick(1000); // wait for subscribe
  }));

  it('error appears onscreen and doesn\'t disappear until clicked', fakeAsync(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let err = ns.error('test', {
      handler: () => {},
      text: 'test'
    });

    fixture.detectChanges();
    err.subscribe((mdlSnackbarComponent) => {
      // snackbar appeared
      expect(mdlSnackbarComponent.isActive()).toBe(true);

      tick(3500);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('.mdl-snackbar').length).toBe(1);
    });
    tick(1000); // wait for subscribe
  }));
});

