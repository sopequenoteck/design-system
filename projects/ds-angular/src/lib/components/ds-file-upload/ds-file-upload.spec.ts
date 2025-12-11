import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsFileUpload, UploadFile } from './ds-file-upload';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DsFileUpload', () => {
  let component: DsFileUpload;
  let fixture: ComponentFixture<DsFileUpload>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsFileUpload],
    }).compileComponents();

    fixture = TestBed.createComponent(DsFileUpload);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render dropzone with default text', () => {
      const label = compiled.querySelector('.ds-file-upload__label');
      expect(label?.textContent?.trim()).toBe('Choisir un fichier');
    });

    it('should render custom label', () => {
      fixture.componentRef.setInput('label', 'Télécharger une image');
      fixture.detectChanges();
      const label = compiled.querySelector('.ds-file-upload__label');
      expect(label?.textContent?.trim()).toBe('Télécharger une image');
    });

    it('should show drag help text when not disabled', () => {
      const help = compiled.querySelector('.ds-file-upload__help');
      expect(help?.textContent?.trim()).toBe('ou glisser-déposer ici');
    });

    it('should not show drag help text when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const help = compiled.querySelector('.ds-file-upload__help');
      expect(help).toBeNull();
    });

    it('should show limit message when max files reached', () => {
      fixture.componentRef.setInput('maxFiles', 2);
      component.files.set([
        { file: new File([], 'file1.txt'), progress: 100 },
        { file: new File([], 'file2.txt'), progress: 100 },
      ]);
      fixture.detectChanges();
      const limit = compiled.querySelector('.ds-file-upload__limit');
      expect(limit?.textContent).toContain('Limite atteinte (2 fichiers)');
    });

    it('should show accepted types hint', () => {
      fixture.componentRef.setInput('accept', 'image/*,.pdf');
      fixture.detectChanges();
      const hint = compiled.querySelector('.ds-file-upload__hint');
      expect(hint?.textContent).toContain('Types acceptés : image/*,.pdf');
    });

    it('should show max size hint', () => {
      fixture.componentRef.setInput('maxFileSize', 5242880); // 5 MB
      fixture.detectChanges();
      const hints = compiled.querySelectorAll('.ds-file-upload__hint');
      const sizeHint = Array.from(hints).find((h) =>
        h.textContent?.includes('Taille max')
      );
      expect(sizeHint?.textContent).toContain('5.0 MB');
    });
  });

  describe('Sizes', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      const container = compiled.querySelector('.ds-file-upload');
      expect(container?.classList.contains('ds-file-upload--sm')).toBe(true);
    });

    it('should apply md size class by default', () => {
      const container = compiled.querySelector('.ds-file-upload');
      expect(container?.classList.contains('ds-file-upload--md')).toBe(true);
    });

    it('should apply lg size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      const container = compiled.querySelector('.ds-file-upload');
      expect(container?.classList.contains('ds-file-upload--lg')).toBe(true);
    });
  });

  describe('States', () => {
    it('should apply disabled class', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const container = compiled.querySelector('.ds-file-upload');
      expect(container?.classList.contains('ds-file-upload--disabled')).toBe(
        true
      );
    });

    it('should apply error class when error message exists', () => {
      component.errorMessage.set('Fichier trop volumineux');
      fixture.detectChanges();
      const container = compiled.querySelector('.ds-file-upload');
      expect(container?.classList.contains('ds-file-upload--error')).toBe(
        true
      );
    });

    it('should apply dragging class', () => {
      component.isDragging.set(true);
      fixture.detectChanges();
      const dropzone = compiled.querySelector('.ds-file-upload__dropzone');
      expect(
        dropzone?.classList.contains('ds-file-upload__dropzone--active')
      ).toBe(true);
    });
  });

  describe('File selection', () => {
    it('should open file selector on click', () => {
      const fileInput = component.fileInput()?.nativeElement;
      spyOn(fileInput!, 'click');
      component.openFileSelector();
      expect(fileInput!.click).toHaveBeenCalled();
    });

    it('should not open file selector when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const fileInput = component.fileInput()?.nativeElement;
      spyOn(fileInput!, 'click');
      component.openFileSelector();
      expect(fileInput!.click).not.toHaveBeenCalled();
    });

    it('should not open file selector when max files reached', () => {
      fixture.componentRef.setInput('maxFiles', 1);
      component.files.set([
        { file: new File([], 'file1.txt'), progress: 100 },
      ]);
      fixture.detectChanges();
      const fileInput = component.fileInput()?.nativeElement;
      spyOn(fileInput!, 'click');
      component.openFileSelector();
      expect(fileInput!.click).not.toHaveBeenCalled();
    });

    it('should handle file selection', () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      const event = {
        target: {
          files: [file],
          value: '',
        },
      } as any;

      component.onFileSelect(event);
      fixture.detectChanges();
      expect(component.fileCount()).toBe(1);
    });

    it('should reset input value after selection', () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      const mockInput = { files: [file], value: 'test.txt' };
      const event = { target: mockInput } as any;

      component.onFileSelect(event);
      expect(mockInput.value).toBe('');
    });
  });

  describe('Drag and Drop', () => {
    let dropzone: DebugElement;
    let mockEvent: any;

    beforeEach(() => {
      dropzone = fixture.debugElement.query(
        By.css('.ds-file-upload__dropzone')
      );
      mockEvent = {
        preventDefault: jasmine.createSpy('preventDefault'),
        stopPropagation: jasmine.createSpy('stopPropagation'),
      };
    });

    it('should set isDragging on drag enter', () => {
      component.onDragEnter(mockEvent);
      expect(component.isDragging()).toBe(true);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should not set isDragging when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      component.onDragEnter(mockEvent);
      expect(component.isDragging()).toBe(false);
    });

    it('should prevent default on drag over', () => {
      component.onDragOver(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should unset isDragging on drag leave', () => {
      component.isDragging.set(true);
      const leaveEvent = {
        ...mockEvent,
        currentTarget: document.createElement('div'),
        relatedTarget: null,
      };
      component.onDragLeave(leaveEvent);
      expect(component.isDragging()).toBe(false);
    });

    it('should handle file drop', () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      const dropEvent = {
        ...mockEvent,
        dataTransfer: { files: [file] },
      };

      component.onDrop(dropEvent);
      fixture.detectChanges();
      expect(component.isDragging()).toBe(false);
      expect(component.fileCount()).toBe(1);
    });

    it('should not handle drop when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      const dropEvent = {
        ...mockEvent,
        dataTransfer: { files: [file] },
      };

      component.onDrop(dropEvent);
      fixture.detectChanges();
      expect(component.fileCount()).toBe(0);
    });
  });

  describe('File validation', () => {
    it('should reject file exceeding max size', () => {
      fixture.componentRef.setInput('maxFileSize', 1024); // 1 KB
      const file = new File(['x'.repeat(2048)], 'large.txt', {
        type: 'text/plain',
      });

      component['handleFiles']([file]);
      fixture.detectChanges();
      expect(component.fileCount()).toBe(0);
      expect(component.errorMessage()).toContain('trop volumineux');
    });

    it('should reject file with invalid type', () => {
      fixture.componentRef.setInput('accept', 'image/*');
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });

      component['handleFiles']([file]);
      fixture.detectChanges();
      expect(component.fileCount()).toBe(0);
      expect(component.errorMessage()).toContain('non accepté');
    });

    it('should accept file with valid image type', () => {
      fixture.componentRef.setInput('accept', 'image/*');
      const file = new File(['content'], 'test.png', { type: 'image/png' });

      component['handleFiles']([file]);
      fixture.detectChanges();
      expect(component.fileCount()).toBe(1);
    });

    it('should accept file with extension match', () => {
      fixture.componentRef.setInput('accept', '.pdf,.docx');
      const file = new File(['content'], 'test.pdf', {
        type: 'application/pdf',
      });

      component['handleFiles']([file]);
      fixture.detectChanges();
      expect(component.fileCount()).toBe(1);
    });

    it('should enforce max files limit', () => {
      fixture.componentRef.setInput('maxFiles', 2);
      const files = [
        new File(['1'], 'file1.txt', { type: 'text/plain' }),
        new File(['2'], 'file2.txt', { type: 'text/plain' }),
        new File(['3'], 'file3.txt', { type: 'text/plain' }),
      ];

      component['handleFiles'](files);
      fixture.detectChanges();
      expect(component.fileCount()).toBe(2);
    });
  });

  describe('Multiple files', () => {
    it('should handle multiple files when enabled', () => {
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('maxFiles', 5);
      const files = [
        new File(['1'], 'file1.txt', { type: 'text/plain' }),
        new File(['2'], 'file2.txt', { type: 'text/plain' }),
      ];

      component['handleFiles'](files);
      fixture.detectChanges();
      expect(component.fileCount()).toBe(2);
    });

    it('should replace file in single mode', () => {
      fixture.componentRef.setInput('multiple', false);
      const file1 = new File(['1'], 'file1.txt', { type: 'text/plain' });
      const file2 = new File(['2'], 'file2.txt', { type: 'text/plain' });

      component['handleFiles']([file1]);
      fixture.detectChanges();
      expect(component.fileCount()).toBe(1);

      component['handleFiles']([file2]);
      fixture.detectChanges();
      expect(component.fileCount()).toBe(1);
      expect(component.files()[0].file.name).toBe('file2.txt');
    });
  });

  describe('File removal', () => {
    it('should remove file from list', () => {
      const uploadFile: UploadFile = {
        file: new File(['content'], 'test.txt', { type: 'text/plain' }),
        progress: 100,
      };
      component.files.set([uploadFile]);
      fixture.detectChanges();

      component.removeFile(uploadFile);
      fixture.detectChanges();
      expect(component.fileCount()).toBe(0);
    });

    it('should emit fileRemoved event', () => {
      const uploadFile: UploadFile = {
        file: new File(['content'], 'test.txt', { type: 'text/plain' }),
        progress: 100,
      };
      component.files.set([uploadFile]);

      let removedFile: File | undefined;
      component.fileRemoved.subscribe((file) => (removedFile = file));

      component.removeFile(uploadFile);
      expect(removedFile).toBe(uploadFile.file);
    });

    it('should clear error message on file removal', () => {
      const uploadFile: UploadFile = {
        file: new File(['content'], 'test.txt', { type: 'text/plain' }),
        progress: 100,
      };
      component.files.set([uploadFile]);
      component.errorMessage.set('Test error');

      component.removeFile(uploadFile);
      expect(component.errorMessage()).toBe('');
    });
  });

  describe('File display', () => {
    it('should display file list when files exist', () => {
      component.files.set([
        { file: new File(['1'], 'file1.txt'), progress: 100 },
      ]);
      fixture.detectChanges();

      const filesList = compiled.querySelector('.ds-file-upload__files');
      expect(filesList).toBeTruthy();
    });

    it('should display file name', () => {
      component.files.set([
        { file: new File(['1'], 'test-file.txt'), progress: 100 },
      ]);
      fixture.detectChanges();

      const fileName = compiled.querySelector('.ds-file-upload__file-name');
      expect(fileName?.textContent?.trim()).toBe('test-file.txt');
    });

    it('should display file size', () => {
      const file = new File(['x'.repeat(1024)], 'test.txt'); // 1 KB
      component.files.set([{ file, progress: 100 }]);
      fixture.detectChanges();

      const fileSize = compiled.querySelector('.ds-file-upload__file-size');
      expect(fileSize?.textContent).toContain('KB');
    });

    it('should show progress bar when upload in progress', () => {
      component.files.set([
        { file: new File(['1'], 'test.txt'), progress: 50 },
      ]);
      fixture.detectChanges();

      const progressBar = compiled.querySelector('ds-progress-bar');
      expect(progressBar).toBeTruthy();
    });

    it('should not show progress bar when upload complete', () => {
      component.files.set([
        { file: new File(['1'], 'test.txt'), progress: 100 },
      ]);
      fixture.detectChanges();

      const progressBar = compiled.querySelector('ds-progress-bar');
      expect(progressBar).toBeNull();
    });
  });

  describe('Preview', () => {
    it('should show preview for images when enabled', () => {
      fixture.componentRef.setInput('showPreview', true);
      component.files.set([
        {
          file: new File(['content'], 'test.png', { type: 'image/png' }),
          progress: 100,
          preview: 'data:image/png;base64,test',
        },
      ]);
      fixture.detectChanges();

      const preview = compiled.querySelector('.ds-file-upload__preview');
      expect(preview).toBeTruthy();
    });

    it('should show file icon when preview disabled', () => {
      fixture.componentRef.setInput('showPreview', false);
      component.files.set([
        { file: new File(['1'], 'test.txt'), progress: 100 },
      ]);
      fixture.detectChanges();

      const icon = compiled.querySelector('.ds-file-upload__file-icon');
      expect(icon).toBeTruthy();
    });

    it('should show file icon for non-image files', () => {
      fixture.componentRef.setInput('showPreview', true);
      component.files.set([
        { file: new File(['1'], 'test.txt', { type: 'text/plain' }), progress: 100 },
      ]);
      fixture.detectChanges();

      const icon = compiled.querySelector('.ds-file-upload__file-icon');
      expect(icon).toBeTruthy();
    });
  });

  describe('Utility methods', () => {
    it('should return correct icon for image file', () => {
      const file = new File(['content'], 'test.png', { type: 'image/png' });
      const icon = component.getFileIcon(file);
      expect(icon).toBe(component['faFileImage']);
    });

    it('should return correct icon for PDF file', () => {
      const file = new File(['content'], 'test.pdf', {
        type: 'application/pdf',
      });
      const icon = component.getFileIcon(file);
      expect(icon).toBe(component['faFilePdf']);
    });

    it('should return correct icon for Word file', () => {
      const file = new File(['content'], 'test.docx', {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const icon = component.getFileIcon(file);
      expect(icon).toBe(component['faFileWord']);
    });

    it('should return default icon for unknown file type', () => {
      const file = new File(['content'], 'test.unknown', {
        type: 'application/unknown',
      });
      const icon = component.getFileIcon(file);
      expect(icon).toBe(component['faFile']);
    });

    it('should format file size in MB', () => {
      const size = 5242880; // 5 MB
      expect(component.formatFileSize(size)).toBe('5.0 MB');
    });

    it('should format file size in KB', () => {
      const size = 2048; // 2 KB
      expect(component.formatFileSize(size)).toBe('2 KB');
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      const files = [new File(['content'], 'test.txt', { type: 'text/plain' })];
      component.writeValue(files);
      expect(component.fileCount()).toBe(1);
    });

    it('should clear files on null value', () => {
      component.files.set([
        { file: new File(['1'], 'test.txt'), progress: 100 },
      ]);
      component.writeValue(null);
      expect(component.fileCount()).toBe(0);
    });

    it('should register onChange callback', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);
      component['onChange'](null);
      expect(fn).toHaveBeenCalledWith(null);
    });

    it('should register onTouched callback', () => {
      const fn = jasmine.createSpy('onTouched');
      component.registerOnTouched(fn);
      component['onTouched']();
      expect(fn).toHaveBeenCalled();
    });

    it('should emit filesChange on file selection', () => {
      let emittedFiles: File[] | undefined;
      component.filesChange.subscribe((files) => (emittedFiles = files));

      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      component['handleFiles']([file]);
      fixture.detectChanges();

      expect(emittedFiles?.length).toBe(1);
      expect(emittedFiles?.[0].name).toBe('test.txt');
    });

    it('should call onChange with file list', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);

      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      component['handleFiles']([file]);
      fixture.detectChanges();

      expect(fn).toHaveBeenCalled();
      const callArg = fn.calls.mostRecent().args[0];
      expect(callArg.length).toBe(1);
    });

    it('should call onChange with null when no files', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);

      const uploadFile: UploadFile = {
        file: new File(['content'], 'test.txt'),
        progress: 100,
      };
      component.files.set([uploadFile]);
      component.removeFile(uploadFile);

      expect(fn).toHaveBeenCalledWith(null);
    });
  });

  describe('Computed properties', () => {
    it('should compute container classes', () => {
      const classes = component.containerClasses();
      expect(classes).toContain('ds-file-upload');
      expect(classes).toContain('ds-file-upload--md');
    });

    it('should include dragging class when dragging', () => {
      component.isDragging.set(true);
      const classes = component.containerClasses();
      expect(classes).toContain('ds-file-upload--dragging');
    });

    it('should include disabled class when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const classes = component.containerClasses();
      expect(classes).toContain('ds-file-upload--disabled');
    });

    it('should compute file count', () => {
      component.files.set([
        { file: new File(['1'], 'file1.txt'), progress: 100 },
        { file: new File(['2'], 'file2.txt'), progress: 100 },
      ]);
      expect(component.fileCount()).toBe(2);
    });

    it('should compute isMaxFilesReached', () => {
      fixture.componentRef.setInput('maxFiles', 2);
      component.files.set([
        { file: new File(['1'], 'file1.txt'), progress: 100 },
        { file: new File(['2'], 'file2.txt'), progress: 100 },
      ]);
      expect(component.isMaxFilesReached()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have role button on dropzone', () => {
      const dropzone = compiled.querySelector('.ds-file-upload__dropzone');
      expect(dropzone?.getAttribute('role')).toBe('button');
    });

    it('should have aria-label on dropzone', () => {
      fixture.componentRef.setInput('label', 'Upload files');
      fixture.detectChanges();
      const dropzone = compiled.querySelector('.ds-file-upload__dropzone');
      expect(dropzone?.getAttribute('aria-label')).toBe('Upload files');
    });

    it('should have tabindex when not disabled', () => {
      const dropzone = compiled.querySelector('.ds-file-upload__dropzone');
      expect(dropzone?.getAttribute('tabindex')).toBe('0');
    });

    it('should not have tabindex when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const dropzone = compiled.querySelector('.ds-file-upload__dropzone');
      expect(dropzone?.hasAttribute('tabindex')).toBe(false);
    });

    it('should have aria-label on remove button', () => {
      component.files.set([
        { file: new File(['1'], 'test.txt'), progress: 100 },
      ]);
      fixture.detectChanges();
      const removeBtn = compiled.querySelector('.ds-file-upload__remove');
      expect(removeBtn?.getAttribute('aria-label')).toBe('Supprimer test.txt');
    });

    it('should have role alert on error message', () => {
      component.errorMessage.set('Test error');
      fixture.detectChanges();
      const error = compiled.querySelector('.ds-file-upload__error');
      expect(error?.getAttribute('role')).toBe('alert');
    });
  });
});
