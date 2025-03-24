import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

type MyFixtures = {
    todoPage: TodoPage;
};

export const test = base.extend<MyFixtures>({
    todoPage: async ({ page }, use) => {
        // Pre-conditions aka setup
        const todoPage = new TodoPage(page);
        await todoPage.goto();

        await use(todoPage);

        // Post-conditions aka cleanup
        await todoPage.removeAllTodoItemsExceptDefault();
    }
});
export { expect } from '@playwright/test';