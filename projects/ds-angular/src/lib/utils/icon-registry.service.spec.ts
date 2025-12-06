import { TestBed } from '@angular/core/testing';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconRegistryService } from './icon-registry.service';
import { faCheck, faTimes, faExclamation } from '@fortawesome/free-solid-svg-icons';

describe('IconRegistryService', () => {
  let service: IconRegistryService;
  let library: jasmine.SpyObj<FaIconLibrary>;

  beforeEach(() => {
    const librarySpy = jasmine.createSpyObj('FaIconLibrary', ['addIcons']);

    TestBed.configureTestingModule({
      providers: [
        IconRegistryService,
        { provide: FaIconLibrary, useValue: librarySpy }
      ]
    });

    service = TestBed.inject(IconRegistryService);
    library = TestBed.inject(FaIconLibrary) as jasmine.SpyObj<FaIconLibrary>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerIcons', () => {
    it('should register icons in the library', () => {
      service.registerIcons([faCheck, faTimes]);

      expect(library.addIcons).toHaveBeenCalledTimes(2);
      expect(library.addIcons).toHaveBeenCalledWith(faCheck);
      expect(library.addIcons).toHaveBeenCalledWith(faTimes);
    });

    it('should not register the same icon twice', () => {
      service.registerIcons([faCheck]);
      service.registerIcons([faCheck]);

      expect(library.addIcons).toHaveBeenCalledTimes(1);
    });

    it('should return the service for chaining', () => {
      const result = service.registerIcons([faCheck]);
      expect(result).toBe(service);
    });

    it('should track registered icons', () => {
      service.registerIcons([faCheck, faTimes]);

      expect(service.isIconRegistered('fas-check')).toBe(true);
      // FontAwesome 6 renamed 'times' to 'xmark'
      expect(service.isIconRegistered('fas-xmark')).toBe(true);
      expect(service.isIconRegistered('fas-unknown')).toBe(false);
    });
  });

  describe('registerIconGroup', () => {
    it('should register a group of icons', () => {
      service.registerIconGroup('validation', [faCheck, faTimes, faExclamation]);

      expect(library.addIcons).toHaveBeenCalledTimes(3);
      expect(service.getIconGroup('validation')).toEqual([faCheck, faTimes, faExclamation]);
    });

    it('should return the service for chaining', () => {
      const result = service.registerIconGroup('validation', [faCheck]);
      expect(result).toBe(service);
    });

    it('should track icon groups', () => {
      service.registerIconGroup('validation', [faCheck, faTimes]);
      service.registerIconGroup('alerts', [faExclamation]);

      const groups = service.getIconGroups();
      expect(groups).toContain('validation');
      expect(groups).toContain('alerts');
      expect(groups.length).toBe(2);
    });
  });

  describe('isIconRegistered', () => {
    it('should return false for unregistered icon', () => {
      expect(service.isIconRegistered('fas-check')).toBe(false);
    });

    it('should return true for registered icon', () => {
      service.registerIcons([faCheck]);
      expect(service.isIconRegistered('fas-check')).toBe(true);
    });
  });

  describe('getRegisteredIcons', () => {
    it('should return empty array initially', () => {
      expect(service.getRegisteredIcons()).toEqual([]);
    });

    it('should return all registered icon names', () => {
      service.registerIcons([faCheck, faTimes]);

      const icons = service.getRegisteredIcons();
      expect(icons).toContain('fas-check');
      // FontAwesome 6 renamed 'times' to 'xmark'
      expect(icons).toContain('fas-xmark');
      expect(icons.length).toBe(2);
    });
  });

  describe('getIconGroup', () => {
    it('should return undefined for non-existent group', () => {
      expect(service.getIconGroup('unknown')).toBeUndefined();
    });

    it('should return icons for existing group', () => {
      service.registerIconGroup('validation', [faCheck, faTimes]);

      const group = service.getIconGroup('validation');
      expect(group).toEqual([faCheck, faTimes]);
    });
  });

  describe('getIconGroups', () => {
    it('should return empty array initially', () => {
      expect(service.getIconGroups()).toEqual([]);
    });

    it('should return all group names', () => {
      service.registerIconGroup('validation', [faCheck]);
      service.registerIconGroup('alerts', [faExclamation]);

      const groups = service.getIconGroups();
      expect(groups).toContain('validation');
      expect(groups).toContain('alerts');
      expect(groups.length).toBe(2);
    });
  });
});
