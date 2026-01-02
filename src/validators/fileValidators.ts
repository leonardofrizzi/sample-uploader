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

type ValidatorPreset = "default" | "images" | "documents" | "strict";

interface ValidatorConfig {
  maxSizeInBytes: number;
  allowedTypes: string[];
}

const VALIDATOR_PRESETS: Record<ValidatorPreset, ValidatorConfig> = {
  default: {
    maxSizeInBytes: 50 * 1024 * 1024, // 50MB
    allowedTypes: ["pdf", "doc", "docx", "txt", "jpg", "jpeg", "png", "gif", "zip"],
  },
  images: {
    maxSizeInBytes: 10 * 1024 * 1024, // 10MB
    allowedTypes: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
  },
  documents: {
    maxSizeInBytes: 25 * 1024 * 1024, // 25MB
    allowedTypes: ["pdf", "doc", "docx", "txt", "xls", "xlsx"],
  },
  strict: {
    maxSizeInBytes: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["pdf", "txt"],
  },
};

export class ValidatorFactory {
  static create(preset: ValidatorPreset = "default"): CompositeFileValidator {
    const config = VALIDATOR_PRESETS[preset];
    return new CompositeFileValidator()
      .addValidator(new FileSizeValidator(config.maxSizeInBytes))
      .addValidator(new FileTypeValidator(config.allowedTypes))
      .addValidator(new FileNameValidator());
  }

  static createCustom(config: ValidatorConfig): CompositeFileValidator {
    return new CompositeFileValidator()
      .addValidator(new FileSizeValidator(config.maxSizeInBytes))
      .addValidator(new FileTypeValidator(config.allowedTypes))
      .addValidator(new FileNameValidator());
  }
}

export function createDefaultValidator(): CompositeFileValidator {
  return ValidatorFactory.create("default");
}
