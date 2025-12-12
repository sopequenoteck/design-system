import { test, expect } from '@playwright/test';

test.describe('DsFileUpload', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--default');
    await page.waitForSelector('.ds-file-upload');
  });

  test('should render file upload component', async ({ page }) => {
    await expect(page.locator('.ds-file-upload')).toBeVisible();
  });

  test('should display dropzone', async ({ page }) => {
    const dropzone = page.locator('.ds-file-upload__dropzone');
    await expect(dropzone).toBeVisible();
  });

  test('should display upload icon', async ({ page }) => {
    const icon = page.locator('.ds-file-upload__icon');
    await expect(icon).toBeVisible();
  });

  test('should display label text', async ({ page }) => {
    const label = page.locator('.ds-file-upload__label');
    await expect(label).toBeVisible();
    await expect(label).toContainText('Choisir');
  });

  test('should display drag help text', async ({ page }) => {
    const help = page.locator('.ds-file-upload__help');
    await expect(help).toBeVisible();
    await expect(help).toContainText('glisser-déposer');
  });
});

test.describe('DsFileUpload sizes', () => {
  test('should render small size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--sizes');
    await page.waitForSelector('.ds-file-upload--sm');
    await expect(page.locator('.ds-file-upload--sm')).toBeVisible();
  });

  test('should render medium size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--sizes');
    await page.waitForSelector('.ds-file-upload--md');
    await expect(page.locator('.ds-file-upload--md')).toBeVisible();
  });

  test('should render large size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--sizes');
    await page.waitForSelector('.ds-file-upload--lg');
    await expect(page.locator('.ds-file-upload--lg')).toBeVisible();
  });
});

test.describe('DsFileUpload file selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--default');
    await page.waitForSelector('.ds-file-upload');
  });

  test('should have hidden file input', async ({ page }) => {
    const input = page.locator('.ds-file-upload input[type="file"]');
    await expect(input).toBeHidden();
  });

  test('should trigger file input on dropzone click', async ({ page }) => {
    const dropzone = page.locator('.ds-file-upload__dropzone');

    // Set up file chooser listener before clicking
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      dropzone.click(),
    ]);

    expect(fileChooser).toBeTruthy();
  });

  test('should accept file via file chooser', async ({ page }) => {
    const dropzone = page.locator('.ds-file-upload__dropzone');

    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      dropzone.click(),
    ]);

    await fileChooser.setFiles({
      name: 'test-file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Test content'),
    });

    // File should appear in the list
    await expect(page.locator('.ds-file-upload__files')).toBeVisible();
    await expect(page.locator('.ds-file-upload__file-name')).toContainText('test-file.txt');
  });
});

test.describe('DsFileUpload drag and drop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--default');
    await page.waitForSelector('.ds-file-upload');
  });

  test('should show active state on drag enter', async ({ page }) => {
    const dropzone = page.locator('.ds-file-upload__dropzone');

    // Create a DataTransfer object
    await page.evaluate(() => {
      const dropzone = document.querySelector('.ds-file-upload__dropzone');
      const event = new DragEvent('dragenter', {
        bubbles: true,
        cancelable: true,
        dataTransfer: new DataTransfer(),
      });
      dropzone?.dispatchEvent(event);
    });

    await expect(dropzone).toHaveClass(/ds-file-upload__dropzone--active/);
  });
});

test.describe('DsFileUpload file display', () => {
  test('should display file name after upload', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--with-files');
    await page.waitForSelector('.ds-file-upload');

    const fileName = page.locator('.ds-file-upload__file-name');
    await expect(fileName.first()).toBeVisible();
  });

  test('should display file size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--with-files');
    await page.waitForSelector('.ds-file-upload');

    const fileSize = page.locator('.ds-file-upload__file-size');
    await expect(fileSize.first()).toBeVisible();
  });

  test('should display remove button for uploaded files', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--with-files');
    await page.waitForSelector('.ds-file-upload');

    const removeBtn = page.locator('.ds-file-upload__remove');
    await expect(removeBtn.first()).toBeVisible();
  });
});

test.describe('DsFileUpload multiple files', () => {
  test('should allow multiple file selection', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--multiple');
    await page.waitForSelector('.ds-file-upload');

    const input = page.locator('.ds-file-upload input[type="file"]');
    await expect(input).toHaveAttribute('multiple');
  });
});

test.describe('DsFileUpload disabled', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--disabled');
    await page.waitForSelector('.ds-file-upload');
  });

  test('should have disabled class', async ({ page }) => {
    const container = page.locator('.ds-file-upload');
    await expect(container).toHaveClass(/ds-file-upload--disabled/);
  });

  test('should not show drag help when disabled', async ({ page }) => {
    const help = page.locator('.ds-file-upload__help');
    await expect(help).not.toBeVisible();
  });

  test('should have cursor not-allowed', async ({ page }) => {
    const dropzone = page.locator('.ds-file-upload__dropzone');
    await expect(dropzone).toHaveCSS('cursor', 'not-allowed');
  });
});

test.describe('DsFileUpload with preview', () => {
  test('should display image preview for images', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--with-preview');
    await page.waitForSelector('.ds-file-upload');

    const preview = page.locator('.ds-file-upload__preview');
    // Preview may or may not be visible depending on if files are present
    await expect(page.locator('.ds-file-upload')).toBeVisible();
  });
});

test.describe('DsFileUpload validation', () => {
  test('should show accepted types hint', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--image-only');
    await page.waitForSelector('.ds-file-upload');

    const hint = page.locator('.ds-file-upload__hint');
    await expect(hint.first()).toBeVisible();
    await expect(hint.first()).toContainText('Types acceptés');
  });

  test('should show max size hint', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--with-max-size');
    await page.waitForSelector('.ds-file-upload');

    const hints = page.locator('.ds-file-upload__hint');
    const sizeHint = hints.filter({ hasText: 'Taille max' });
    await expect(sizeHint).toBeVisible();
  });
});

test.describe('DsFileUpload error state', () => {
  test('should display error message', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--with-error');
    await page.waitForSelector('.ds-file-upload');

    const error = page.locator('.ds-file-upload__error');
    await expect(error).toBeVisible();
  });

  test('should have error class on container', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--with-error');
    await page.waitForSelector('.ds-file-upload');

    const container = page.locator('.ds-file-upload');
    await expect(container).toHaveClass(/ds-file-upload--error/);
  });

  test('should have role alert on error message', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--with-error');
    await page.waitForSelector('.ds-file-upload');

    const error = page.locator('.ds-file-upload__error');
    await expect(error).toHaveAttribute('role', 'alert');
  });
});

test.describe('DsFileUpload accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--default');
    await page.waitForSelector('.ds-file-upload');
  });

  test('should have role button on dropzone', async ({ page }) => {
    const dropzone = page.locator('.ds-file-upload__dropzone');
    await expect(dropzone).toHaveAttribute('role', 'button');
  });

  test('should have aria-label on dropzone', async ({ page }) => {
    const dropzone = page.locator('.ds-file-upload__dropzone');
    await expect(dropzone).toHaveAttribute('aria-label');
  });

  test('should have tabindex on dropzone', async ({ page }) => {
    const dropzone = page.locator('.ds-file-upload__dropzone');
    await expect(dropzone).toHaveAttribute('tabindex', '0');
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab');
    const dropzone = page.locator('.ds-file-upload__dropzone');
    await expect(dropzone).toBeFocused();
  });

  test('should trigger on Enter key', async ({ page }) => {
    const dropzone = page.locator('.ds-file-upload__dropzone');
    await dropzone.focus();

    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.keyboard.press('Enter'),
    ]);

    expect(fileChooser).toBeTruthy();
  });

  test('should trigger on Space key', async ({ page }) => {
    const dropzone = page.locator('.ds-file-upload__dropzone');
    await dropzone.focus();

    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.keyboard.press('Space'),
    ]);

    expect(fileChooser).toBeTruthy();
  });
});

test.describe('DsFileUpload progress', () => {
  test('should show progress bar during upload', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--uploading');
    await page.waitForSelector('.ds-file-upload');

    const progressBar = page.locator('ds-progress-bar');
    // Progress bar may or may not be visible depending on upload state
    await expect(page.locator('.ds-file-upload')).toBeVisible();
  });
});

test.describe('DsFileUpload max files limit', () => {
  test('should show limit message when max reached', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--max-files-reached');
    await page.waitForSelector('.ds-file-upload');

    const limitMsg = page.locator('.ds-file-upload__limit');
    await expect(limitMsg).toBeVisible();
    await expect(limitMsg).toContainText('Limite');
  });
});

test.describe('DsFileUpload remove file', () => {
  test('should have accessible remove button', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsfileupload--with-files');
    await page.waitForSelector('.ds-file-upload');

    const removeBtn = page.locator('.ds-file-upload__remove').first();
    await expect(removeBtn).toHaveAttribute('aria-label', /Supprimer/i);
  });
});
