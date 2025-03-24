import type { Locator } from "@playwright/test";

export async function getTextDecorationLine(locator: Locator): Promise<string> {
    return await locator.evaluate(el => {
        return window.getComputedStyle(el).textDecorationLine
      });
  }