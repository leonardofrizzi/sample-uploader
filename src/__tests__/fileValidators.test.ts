import {
  FileSizeValidator,
  FileTypeValidator,
  FileNameValidator,
  CompositeFileValidator,
  createDefaultValidator,
} from "@/validators/fileValidators";

const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File([""], name, { type });
  Object.defineProperty(file, "size", { value: size });
  return file;
};

describe("FileSizeValidator", () => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const validator = new FileSizeValidator(maxSize);

  it("should accept files under the size limit", () => {
    const file = createMockFile("test.pdf", 5 * 1024 * 1024, "application/pdf");
    const result = validator.validate(file);
    expect(result.isValid).toBe(true);
  });

  it("should reject files over the size limit", () => {
    const file = createMockFile("large.pdf", 15 * 1024 * 1024, "application/pdf");
    const result = validator.validate(file);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain("exceeds maximum size");
  });

  it("should accept files exactly at the size limit", () => {
    const file = createMockFile("exact.pdf", maxSize, "application/pdf");
    const result = validator.validate(file);
    expect(result.isValid).toBe(true);
  });
});

describe("FileTypeValidator", () => {
  const allowedTypes = ["pdf", "jpg", "png"];
  const validator = new FileTypeValidator(allowedTypes);

  it("should accept allowed file types", () => {
    const file = createMockFile("document.pdf", 1024, "application/pdf");
    const result = validator.validate(file);
    expect(result.isValid).toBe(true);
  });

  it("should reject disallowed file types", () => {
    const file = createMockFile("script.exe", 1024, "application/x-msdownload");
    const result = validator.validate(file);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain("invalid type");
  });

  it("should be case insensitive", () => {
    const file = createMockFile("image.JPG", 1024, "image/jpeg");
    const result = validator.validate(file);
    expect(result.isValid).toBe(true);
  });
});

describe("FileNameValidator", () => {
  const validator = new FileNameValidator();

  it("should accept valid file names", () => {
    const file = createMockFile("my-document_v2.pdf", 1024, "application/pdf");
    const result = validator.validate(file);
    expect(result.isValid).toBe(true);
  });

  it("should reject file names with invalid characters", () => {
    const invalidChars = ["<", ">", ":", '"', "/", "\\", "|", "?", "*"];

    invalidChars.forEach((char) => {
      const file = createMockFile(`invalid${char}name.pdf`, 1024, "application/pdf");
      const result = validator.validate(file);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain("invalid characters");
    });
  });
});

describe("CompositeFileValidator", () => {
  it("should run all validators and return first error", () => {
    const validator = new CompositeFileValidator()
      .addValidator(new FileSizeValidator(1024))
      .addValidator(new FileTypeValidator(["pdf"]));

    const largeFile = createMockFile("large.pdf", 2048, "application/pdf");
    const result = validator.validate(largeFile);

    expect(result.isValid).toBe(false);
    expect(result.error).toContain("exceeds maximum size");
  });

  it("should pass when all validators pass", () => {
    const validator = new CompositeFileValidator()
      .addValidator(new FileSizeValidator(10 * 1024 * 1024))
      .addValidator(new FileTypeValidator(["pdf"]))
      .addValidator(new FileNameValidator());

    const validFile = createMockFile("document.pdf", 1024, "application/pdf");
    const result = validator.validate(validFile);

    expect(result.isValid).toBe(true);
  });
});

describe("createDefaultValidator", () => {
  const validator = createDefaultValidator();

  it("should accept valid files", () => {
    const file = createMockFile("document.pdf", 1024, "application/pdf");
    const result = validator.validate(file);
    expect(result.isValid).toBe(true);
  });

  it("should reject files larger than 50MB", () => {
    const file = createMockFile("huge.pdf", 60 * 1024 * 1024, "application/pdf");
    const result = validator.validate(file);
    expect(result.isValid).toBe(false);
  });

  it("should reject invalid file types", () => {
    const file = createMockFile("malware.exe", 1024, "application/x-msdownload");
    const result = validator.validate(file);
    expect(result.isValid).toBe(false);
  });
});
