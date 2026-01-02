export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FileValidator {
  validate(file: File): ValidationResult;
}

export class FileSizeValidator implements FileValidator {
  constructor(private maxSizeInBytes: number) {}

  validate(file: File): ValidationResult {
    if (file.size > this.maxSizeInBytes) {
      const maxSizeMB = (this.maxSizeInBytes / (1024 * 1024)).toFixed(1);
      return {
        isValid: false,
        error: `File "${file.name}" exceeds maximum size of ${maxSizeMB}MB`,
      };
    }
    return { isValid: true };
  }
}

export class FileTypeValidator implements FileValidator {
  constructor(private allowedTypes: string[]) {}

  validate(file: File): ValidationResult {
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    const isAllowed = this.allowedTypes.some(
      (type) => type.toLowerCase() === fileExtension || file.type.includes(type)
    );

    if (!isAllowed) {
      return {
        isValid: false,
        error: `File "${file.name}" has invalid type. Allowed: ${this.allowedTypes.join(", ")}`,
      };
    }
    return { isValid: true };
  }
}

export class FileNameValidator implements FileValidator {
  validate(file: File): ValidationResult {
    const invalidChars = /[<>:"/\\|?*]/;
    if (invalidChars.test(file.name)) {
      return {
        isValid: false,
        error: `File "${file.name}" contains invalid characters`,
      };
    }
    return { isValid: true };
  }
}

export class CompositeFileValidator implements FileValidator {
  private validators: FileValidator[] = [];

  addValidator(validator: FileValidator): this {
    this.validators.push(validator);
    return this;
  }

  validate(file: File): ValidationResult {
    for (const validator of this.validators) {
      const result = validator.validate(file);
      if (!result.isValid) {
        return result;
      }
    }
    return { isValid: true };
  }
}

const ALLOWED_FILE_TYPES = ["pdf", "doc", "docx", "txt", "jpg", "jpeg", "png", "gif", "zip"];

export function createDefaultValidator(): CompositeFileValidator {
  return new CompositeFileValidator()
    .addValidator(new FileSizeValidator(50 * 1024 * 1024)) // 50MB
    .addValidator(new FileTypeValidator(ALLOWED_FILE_TYPES))
    .addValidator(new FileNameValidator());
}
