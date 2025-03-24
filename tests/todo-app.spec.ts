import { expect, test } from './fixtures/base';
import { DEFAULT_TODO_ITEMS } from './pages/todo-page'

test.describe('Todo Items Tests', () => {
  test('should be able to get default todo items', async ({ todoPage }) => {
    const completedTodoName = "Write my first post";
    const todoItemsCount = await todoPage.getTodoItemsCount();
    const todoItemNames = await todoPage.getTodoItemsNames();

    await expect(todoItemsCount).toEqual(3);
    await expect(todoItemNames).toEqual(DEFAULT_TODO_ITEMS);

    // Check that "Write my first post" todo item should be completed
    const completedTodoStyle = await todoPage.getCompletedTodoStyle(completedTodoName);
    const completedTodoCheckBox = await todoPage.getCheckBoxByTodoItemText(completedTodoName);
    await expect(completedTodoStyle).toEqual("line-through");
    await expect(completedTodoCheckBox).toBeChecked();
  });

  test('should be able to add / complete / delete todo items', async ({ todoPage }) => {
    const todoCleanHouse = "Clean house";
    const todoBuyGroceries = "Buy groceries";

    await todoPage.addTodoItems(todoCleanHouse, todoBuyGroceries);

    // Check that "Clean house" and "Buy groceries" should be added to the list fo todos
    const todoItemsCount = await todoPage.getTodoItemsCount();
    const todoItemNames = await todoPage.getTodoItemsNames();
    await expect(todoItemsCount).toEqual(5);
    await expect(todoItemNames).toEqual([...DEFAULT_TODO_ITEMS, ...[todoCleanHouse, todoBuyGroceries]]);

    await todoPage.checkTodoItemAsCompleted(todoBuyGroceries);

    // Check that "Buy groceries" todo item should be completed
    const completedTodoBuyGroceriesStyle = await todoPage.getCompletedTodoStyle(todoBuyGroceries);
    const completedTodoBuyGroceriesCheckBox = await todoPage.getCheckBoxByTodoItemText(todoBuyGroceries);
    await expect(completedTodoBuyGroceriesStyle).toEqual("line-through");
    await expect(completedTodoBuyGroceriesCheckBox).toBeChecked();

    await todoPage.removeTodoItemsByText(todoCleanHouse, todoBuyGroceries);

    // Check that "Clean house" and "Buy groceries" shoule be removed from the list fo todos
    const todoItemsCountUpdate = await todoPage.getTodoItemsCount();
    const todoItemNamesUpdate  = await todoPage.getTodoItemsNames();
    await expect(todoItemsCountUpdate).toEqual(3);
    await expect(todoItemNamesUpdate).not.toContain([todoCleanHouse,todoBuyGroceries]);
  });

  // test('preserve data after refresh page', async ({ page }) => {

  // });

  // test('validation checks aka negative scenarios', async ({ page }) => {

  // });
});
