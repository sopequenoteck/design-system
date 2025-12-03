import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsToastContainerComponent } from './ds-toast-container.component';
import { DsToastService } from './ds-toast.service';

describe('DsToastContainerComponent', () => {
  let component: DsToastContainerComponent;
  let fixture: ComponentFixture<DsToastContainerComponent>;
  let toastService: DsToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsToastContainerComponent],
      providers: [DsToastService],
    }).compileComponents();

    fixture = TestBed.createComponent(DsToastContainerComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(DsToastService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should group toasts by position', () => {
    toastService.show({ message: 'Toast 1', position: 'top-right', duration: 0 });
    toastService.show({ message: 'Toast 2', position: 'top-left', duration: 0 });
    toastService.show({ message: 'Toast 3', position: 'top-right', duration: 0 });
    fixture.detectChanges();

    const grouped = component['groupedToasts']();

    expect(grouped['top-right'].length).toBe(2);
    expect(grouped['top-left'].length).toBe(1);
    expect(grouped['bottom-right'].length).toBe(0);
    expect(grouped['bottom-left'].length).toBe(0);
  });

  it('should respect maxStack limit per position', () => {
    toastService.show({ message: 'Toast 1', position: 'top-right', duration: 0, maxStack: 2 });
    toastService.show({ message: 'Toast 2', position: 'top-right', duration: 0, maxStack: 2 });
    toastService.show({ message: 'Toast 3', position: 'top-right', duration: 0, maxStack: 2 });
    fixture.detectChanges();

    const grouped = component['groupedToasts']();

    expect(grouped['top-right'].length).toBe(2);
    expect(grouped['top-right'][0].message).toBe('Toast 2');
    expect(grouped['top-right'][1].message).toBe('Toast 3');
  });

  it('should dismiss toast when calling dismiss method', () => {
    const id = toastService.show({ message: 'Dismissable toast', duration: 0 });
    fixture.detectChanges();

    expect(toastService.toasts().length).toBe(1);

    component.dismiss(id);
    fixture.detectChanges();

    expect(toastService.toasts().length).toBe(0);
  });

  it('should trigger action when calling handleAction method', () => {
    const actionSpy = jasmine.createSpy('action');
    const id = toastService.show({
      message: 'Action toast',
      actionLabel: 'Undo',
      onAction: actionSpy,
      duration: 0,
    });
    fixture.detectChanges();

    const toast = toastService.toasts().find(t => t.id === id);
    expect(toast).toBeTruthy();

    component.handleAction(toast!);
    fixture.detectChanges();

    expect(actionSpy).toHaveBeenCalled();
    expect(toastService.toasts().length).toBe(0);
  });
});
