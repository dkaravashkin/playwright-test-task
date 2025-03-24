import { expect, test } from './fixtures/base';
import { DEFAULT_TODO_ITEMS } from './pages/todo-page'

test.describe('Todo Items Tests', () => {
  test('should be able to get default todo items', async ({ todoPage }) => {
    const completedTodoName = "Write my first post";
    const todoItemsCount = await todoPage.getTodoItemsCount();
    const todoItemNames = await todoPage.getTodoItemsNames();
    const completedTodoStyle = await todoPage.getCompletedTodoStyle(completedTodoName);
    const completedTodoCheckBox = await todoPage.getCheckBoxByTodoItemText(completedTodoName);
    
    await expect(todoItemsCount).toEqual(3);
    await expect(todoItemNames).toEqual(DEFAULT_TODO_ITEMS);
    
    // Check that "Write my first post" todo item should be completed
    await expect(completedTodoStyle).toEqual("line-through");
    await expect(completedTodoCheckBox).toBeChecked();
  });

  test('should be able to add and delete todo items', async ({ todoPage }) => {
  });

  // test('should be able to check / uncheck all items', async ({ todoPage }) => {
  // });

  // test('should append new items to the bottom of the list', async ({ page }) => {

  // });
});
