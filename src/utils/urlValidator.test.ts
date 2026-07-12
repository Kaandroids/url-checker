import { expect, test, describe } from "vitest";
import { isValidUrl } from "./urlValidator.js";

describe("isValidUrl validation checks", () => {
    test("should return ok: true for a valid URL", () => {
        const result = isValidUrl("https://google.com");
        expect(result.ok).toBe(true);
    });

    test("should return ok: false for a plain text string", () => {
        const result = isValidUrl('hello world');
        expect(result.ok).toBe(false);
    });

    test("should handle URLs with whitespaces correctly", () => {
        const result = isValidUrl("    https://apple.com    ");
        expect(result.ok).toBe(true);
    });
});