import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DsAvatar } from './ds-avatar';

describe('DsAvatar', () => {
  let component: DsAvatar;
  let fixture: ComponentFixture<DsAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsAvatar],
    }).compileComponents();

    fixture = TestBed.createComponent(DsAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // === CRÉATION ===

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // === VALEURS PAR DÉFAUT ===

  it('should have default shape circle', () => {
    expect(component.shape()).toBe('circle');
  });

  it('should have default size md', () => {
    expect(component.size()).toBe('md');
  });

  it('should have autoColor false by default', () => {
    expect(component.autoColor()).toBe(false);
  });

  it('should not show image by default', () => {
    expect(component.showImage()).toBe(false);
  });

  // === AFFICHAGE IMAGE ===

  it('should show image when src is provided', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.jpg');
    fixture.detectChanges();

    expect(component.showImage()).toBe(true);
    const img = fixture.debugElement.query(By.css('.ds-avatar__image'));
    expect(img).toBeTruthy();
  });

  it('should hide image on error', () => {
    fixture.componentRef.setInput('src', 'https://example.com/invalid.jpg');
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('.ds-avatar__image'));
    img.triggerEventHandler('error', {});
    fixture.detectChanges();

    expect(component.showImage()).toBe(false);
  });

  it('should show initials when image fails to load', () => {
    fixture.componentRef.setInput('src', 'https://example.com/invalid.jpg');
    fixture.componentRef.setInput('name', 'John Doe');
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('.ds-avatar__image'));
    img.triggerEventHandler('error', {});
    fixture.detectChanges();

    const initials = fixture.debugElement.query(By.css('.ds-avatar__initials'));
    expect(initials).toBeTruthy();
    expect(initials.nativeElement.textContent.trim()).toBe('JD');
  });

  it('should set correct alt attribute on image', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.jpg');
    fixture.componentRef.setInput('alt', 'Profile picture');
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('.ds-avatar__image'));
    expect(img.nativeElement.alt).toBe('Profile picture');
  });

  it('should reset image error on successful load', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.jpg');
    fixture.detectChanges();

    // Simuler erreur puis succès
    component.onImageError();
    expect(component.showImage()).toBe(false);

    component.onImageLoad();
    expect(component.showImage()).toBe(true);
  });

  // === INITIALES ===

  it('should display provided initials', () => {
    fixture.componentRef.setInput('initials', 'AB');
    fixture.detectChanges();

    expect(component.displayInitials()).toBe('AB');
  });

  it('should generate initials from single name', () => {
    fixture.componentRef.setInput('name', 'Alice');
    fixture.detectChanges();

    expect(component.displayInitials()).toBe('AL');
  });

  it('should generate initials from full name (first + last)', () => {
    fixture.componentRef.setInput('name', 'John Doe');
    fixture.detectChanges();

    expect(component.displayInitials()).toBe('JD');
  });

  it('should generate initials from multiple names (first + last)', () => {
    fixture.componentRef.setInput('name', 'Jean Pierre Dupont');
    fixture.detectChanges();

    expect(component.displayInitials()).toBe('JD');
  });

  it('should limit initials to 2 characters', () => {
    fixture.componentRef.setInput('initials', 'ABCD');
    fixture.detectChanges();

    expect(component.displayInitials()).toBe('AB');
  });

  it('should uppercase initials', () => {
    fixture.componentRef.setInput('initials', 'ab');
    fixture.detectChanges();

    expect(component.displayInitials()).toBe('AB');
  });

  it('should prioritize initials input over name', () => {
    fixture.componentRef.setInput('name', 'John Doe');
    fixture.componentRef.setInput('initials', 'XY');
    fixture.detectChanges();

    expect(component.displayInitials()).toBe('XY');
  });

  it('should return empty string when no name or initials', () => {
    expect(component.displayInitials()).toBe('');
  });

  // === FORMES ===

  it('should apply circle shape class', () => {
    fixture.componentRef.setInput('shape', 'circle');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.classList.contains('ds-avatar--circle')).toBeTrue();
  });

  it('should apply rounded shape class', () => {
    fixture.componentRef.setInput('shape', 'rounded');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.classList.contains('ds-avatar--rounded')).toBeTrue();
  });

  it('should apply square shape class', () => {
    fixture.componentRef.setInput('shape', 'square');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.classList.contains('ds-avatar--square')).toBeTrue();
  });

  // === TAILLES ===

  it('should apply sm size class', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.classList.contains('ds-avatar--sm')).toBeTrue();
  });

  it('should apply md size class', () => {
    fixture.componentRef.setInput('size', 'md');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.classList.contains('ds-avatar--md')).toBeTrue();
  });

  it('should apply lg size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.classList.contains('ds-avatar--lg')).toBeTrue();
  });

  it('should apply xl size class', () => {
    fixture.componentRef.setInput('size', 'xl');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.classList.contains('ds-avatar--xl')).toBeTrue();
  });

  // === COULEUR AUTO-GÉNÉRÉE ===

  it('should not generate background color when autoColor is false', () => {
    fixture.componentRef.setInput('initials', 'AB');
    fixture.componentRef.setInput('autoColor', false);
    fixture.detectChanges();

    expect(component.generatedBgColor()).toBeNull();
  });

  it('should generate background color from initials when autoColor is true', () => {
    fixture.componentRef.setInput('initials', 'AB');
    fixture.componentRef.setInput('autoColor', true);
    fixture.detectChanges();

    const color = component.generatedBgColor();
    expect(color).toBeTruthy();
    expect(color).toMatch(/^hsl\(\d+, 65%, 45%\)$/);
  });

  it('should generate consistent color for same initials', () => {
    fixture.componentRef.setInput('initials', 'XY');
    fixture.componentRef.setInput('autoColor', true);
    fixture.detectChanges();

    const color1 = component.generatedBgColor();

    // Recréer le composant avec les mêmes initiales
    const fixture2 = TestBed.createComponent(DsAvatar);
    fixture2.componentRef.setInput('initials', 'XY');
    fixture2.componentRef.setInput('autoColor', true);
    fixture2.detectChanges();

    const color2 = fixture2.componentInstance.generatedBgColor();
    expect(color1).toBe(color2);
  });

  it('should return null for auto color when no initials', () => {
    fixture.componentRef.setInput('autoColor', true);
    fixture.detectChanges();

    expect(component.generatedBgColor()).toBeNull();
  });

  // === ACCESSIBILITÉ ===

  it('should have role img when showing initials', () => {
    fixture.componentRef.setInput('name', 'John Doe');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.getAttribute('role')).toBe('img');
  });

  it('should have aria-label from alt', () => {
    fixture.componentRef.setInput('alt', 'Custom alt text');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.getAttribute('aria-label')).toBe('Custom alt text');
  });

  it('should have aria-label from name when alt is empty', () => {
    fixture.componentRef.setInput('name', 'John Doe');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.getAttribute('aria-label')).toBe('Avatar de John Doe');
  });

  it('should have default aria-label when no alt or name', () => {
    expect(component.ariaLabel()).toBe('Avatar');
  });

  it('should not have role img when showing image', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.jpg');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.getAttribute('role')).toBeNull();
  });

  it('should not have aria-label on container when showing image', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.jpg');
    fixture.componentRef.setInput('alt', 'Profile');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.getAttribute('aria-label')).toBeNull();
  });

  // === CLASSES CSS ===

  it('should apply initials class when not showing image', () => {
    fixture.componentRef.setInput('name', 'John');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.classList.contains('ds-avatar--initials')).toBeTrue();
  });

  it('should apply has-image class when showing image', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.jpg');
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.classList.contains('ds-avatar--has-image')).toBeTrue();
  });

  it('should apply generated background color to style', () => {
    fixture.componentRef.setInput('initials', 'AB');
    fixture.componentRef.setInput('autoColor', true);
    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css('.ds-avatar'));
    expect(avatar.nativeElement.style.backgroundColor).toBeTruthy();
  });
});
