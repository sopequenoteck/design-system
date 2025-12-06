import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DsContainer, ContainerMaxWidth, ContainerGutter } from './ds-container';

@Component({
  template: `
    <ds-container
      [maxWidth]="maxWidth"
      [center]="center"
      [gutter]="gutter"
      [paddingY]="paddingY"
      [customClass]="customClass">
      <p>Test content</p>
    </ds-container>
  `,
  standalone: true,
  imports: [DsContainer],
})
class TestHostComponent {
  maxWidth: ContainerMaxWidth = 'lg';
  center = true;
  gutter: ContainerGutter = 'md';
  paddingY: ContainerGutter = 'none';
  customClass = '';
}

describe('DsContainer', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content via ng-content', () => {
    const content = fixture.debugElement.query(By.css('p'));
    expect(content.nativeElement.textContent).toBe('Test content');
  });

  describe('maxWidth', () => {
    it('should apply fluid class when maxWidth is fluid', () => {
      component.maxWidth = 'fluid';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--fluid')).toBe(true);
    });

    it('should apply sm class when maxWidth is sm', () => {
      component.maxWidth = 'sm';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--sm')).toBe(true);
    });

    it('should apply md class when maxWidth is md', () => {
      component.maxWidth = 'md';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--md')).toBe(true);
    });

    it('should apply lg class by default', () => {
      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--lg')).toBe(true);
    });

    it('should apply xl class when maxWidth is xl', () => {
      component.maxWidth = 'xl';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--xl')).toBe(true);
    });

    it('should apply 2xl class when maxWidth is 2xl', () => {
      component.maxWidth = '2xl';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--2xl')).toBe(true);
    });
  });

  describe('center', () => {
    it('should apply center class when center is true', () => {
      component.center = true;
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--center')).toBe(true);
    });

    it('should not apply center class when center is false', () => {
      component.center = false;
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--center')).toBe(false);
    });
  });

  describe('gutter', () => {
    it('should apply gutter-none class', () => {
      component.gutter = 'none';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--gutter-none')).toBe(true);
    });

    it('should apply gutter-sm class', () => {
      component.gutter = 'sm';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--gutter-sm')).toBe(true);
    });

    it('should apply gutter-md class by default', () => {
      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--gutter-md')).toBe(true);
    });

    it('should apply gutter-lg class', () => {
      component.gutter = 'lg';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--gutter-lg')).toBe(true);
    });
  });

  describe('paddingY', () => {
    it('should apply padding-y-none class by default', () => {
      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--padding-y-none')).toBe(true);
    });

    it('should apply padding-y-sm class', () => {
      component.paddingY = 'sm';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--padding-y-sm')).toBe(true);
    });

    it('should apply padding-y-md class', () => {
      component.paddingY = 'md';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--padding-y-md')).toBe(true);
    });

    it('should apply padding-y-lg class', () => {
      component.paddingY = 'lg';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container--padding-y-lg')).toBe(true);
    });
  });

  describe('customClass', () => {
    it('should apply custom class when provided', () => {
      component.customClass = 'my-custom-class';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('my-custom-class')).toBe(true);
    });

    it('should not add empty custom class', () => {
      component.customClass = '';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      const classList = Array.from(container.nativeElement.classList) as string[];
      expect(classList.every(c => c.length > 0)).toBe(true);
    });
  });

  describe('containerStyle', () => {
    it('should set --container-max-width CSS variable for fluid', () => {
      component.maxWidth = 'fluid';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.style.getPropertyValue('--container-max-width')).toBe('100%');
    });

    it('should set --container-max-width CSS variable for sm', () => {
      component.maxWidth = 'sm';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.style.getPropertyValue('--container-max-width')).toBe('540px');
    });

    it('should set --container-max-width CSS variable for lg', () => {
      component.maxWidth = 'lg';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.style.getPropertyValue('--container-max-width')).toBe('960px');
    });
  });

  describe('combined classes', () => {
    it('should apply multiple classes correctly', () => {
      component.maxWidth = 'xl';
      component.center = true;
      component.gutter = 'lg';
      component.paddingY = 'md';
      component.customClass = 'extra-class';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-container'));
      expect(container.nativeElement.classList.contains('ds-container')).toBe(true);
      expect(container.nativeElement.classList.contains('ds-container--xl')).toBe(true);
      expect(container.nativeElement.classList.contains('ds-container--center')).toBe(true);
      expect(container.nativeElement.classList.contains('ds-container--gutter-lg')).toBe(true);
      expect(container.nativeElement.classList.contains('ds-container--padding-y-md')).toBe(true);
      expect(container.nativeElement.classList.contains('extra-class')).toBe(true);
    });
  });
});

describe('DsContainer standalone', () => {
  let component: DsContainer;
  let fixture: ComponentFixture<DsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(DsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create standalone', () => {
    expect(component).toBeTruthy();
  });

  it('should have default maxWidth of lg', () => {
    expect(component.maxWidth()).toBe('lg');
  });

  it('should have default center of true', () => {
    expect(component.center()).toBe(true);
  });

  it('should have default gutter of md', () => {
    expect(component.gutter()).toBe('md');
  });

  it('should have default paddingY of none', () => {
    expect(component.paddingY()).toBe('none');
  });

  it('should have empty customClass by default', () => {
    expect(component.customClass()).toBe('');
  });
});
