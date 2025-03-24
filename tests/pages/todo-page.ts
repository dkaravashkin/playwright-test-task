import { type Locator, type Page } from '@playwright/test';
import { getTextDecorationLine } from '../utils/locators';

export const DEFAULT_TODO_ITEMS = [
  'Write my first post',
  'Upload the post to the blog',
  'Publish the post at Facebook'
] as const;

export class TodoPage {
  readonly page: Page;
  private readonly inputBox: Locator;
  private readonly addBtn: Locator;
  private readonly removeBtn: Locator;
  private readonly checkBoxes: Locator;
  private readonly todoItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputBox = this.page.getByTestId('new-item-input');
    this.addBtn = this.page.getByTestId('add-item-button');
    this.checkBoxes = this.page.getByTestId('item-checkbox');
    this.todoItems = this.page.getByTestId('todo-item');
    this.removeBtn = this.page.getByTestId('remove-item-button');
  }

  async goto() {
    await this.page.goto("http://localhost:4173");
  }

  async addTodoItem(item: string) {
    await this.inputBox.click();
    await this.inputBox.fill(item);
    await this.addBtn.click();
  }

  async addTodoItems(...items: string[]) {
    for (const item of items) {
      await this.addTodoItem(item);
    }
  }

  async checkTodoItemAsCompleted(text: string) {
    const checkbox = await this.getCheckBoxByTodoItemText(text);
    await checkbox.click();
  }

  async removeTodoItemByText(text: string) {
    await this.removeBtn.nth(await this.getRowIdxByTodoItemText(text)).click();
  }

  async removeTodoItemsByText(...texts: string[]) {
    for (const text of texts) {
      await this.removeBtn.nth(await this.getRowIdxByTodoItemText(text)).click();
    }
  }

  async getTodoItemByText(text: string): Promise<Locator> {
    return await this.todoItems.filter({ hasText: text })
  }

  async getTodoItemsCount(): Promise<number> {
    return await this.todoItems.count();
  }

  async getTodoItemsNames(): Promise<string[]> {
    return await this.todoItems.allTextContents();
  }

  async getCheckBoxByTodoItemText(text: string): Promise<Locator> {
    return this.checkBoxes.nth(await this.getRowIdxByTodoItemText(text));
  }

  async getCompletedTodoStyle(text: string): Promise<string> {
    return await getTextDecorationLine(await this.getTodoItemByText(text));
  }

  async removeAllTodoItemsExceptDefault() {
    while ((await this.todoItems.count()) > 0) {
      DEFAULT_TODO_ITEMS[0];
      await this.todoItems.first().hover();
      await this.todoItems.getByLabel('Delete').first().click();
    }
  }

  private async getRowIdxByTodoItemText(text: string): Promise<number> {
    return await this.todoItems.evaluateAll((elements, text) => {
      return elements.findIndex(el => el.textContent?.includes(text));
    }, text);
  }
}
