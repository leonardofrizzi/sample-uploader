import { formatFileSize, formatTime } from "@/utils/formatters";

describe("formatFileSize", () => {
  it("should format bytes correctly", () => {
    expect(formatFileSize(500)).toBe("500 B");
    expect(formatFileSize(0)).toBe("0 B");
  });

  it("should format kilobytes correctly", () => {
    expect(formatFileSize(1024)).toBe("1.0 KB");
    expect(formatFileSize(1536)).toBe("1.5 KB");
    expect(formatFileSize(10240)).toBe("10.0 KB");
  });

  it("should format megabytes correctly", () => {
    expect(formatFileSize(1024 * 1024)).toBe("1.0 MB");
    expect(formatFileSize(1.5 * 1024 * 1024)).toBe("1.5 MB");
    expect(formatFileSize(10 * 1024 * 1024)).toBe("10.0 MB");
  });

  it("should handle edge cases", () => {
    expect(formatFileSize(1023)).toBe("1023 B");
    expect(formatFileSize(1024 * 1024 - 1)).toBe("1024.0 KB");
  });
});

describe("formatTime", () => {
  it("should format seconds correctly", () => {
    expect(formatTime(0)).toBe("00:00");
    expect(formatTime(5)).toBe("00:05");
    expect(formatTime(30)).toBe("00:30");
    expect(formatTime(59)).toBe("00:59");
  });

  it("should format minutes correctly", () => {
    expect(formatTime(60)).toBe("01:00");
    expect(formatTime(90)).toBe("01:30");
    expect(formatTime(125)).toBe("02:05");
  });

  it("should handle longer durations", () => {
    expect(formatTime(600)).toBe("10:00");
    expect(formatTime(3599)).toBe("59:59");
    expect(formatTime(3600)).toBe("60:00");
  });
});
