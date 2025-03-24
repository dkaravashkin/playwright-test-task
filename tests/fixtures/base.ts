import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todo-page';

type MyFixtures = {
    todoPage: TodoPage;
};

export const test = base.extend<MyFixtures>({
    todoPage: async ({ page }, use) => {
        // Pre-conditions
        const todoPage = new TodoPage(page);
        await todoPage.goto();

        await use(todoPage);

        // Post-conditions
        // await todoPage.removeAllToDoItemsExceptDefault();
    }
});
export { expect } from '@playwright/test';