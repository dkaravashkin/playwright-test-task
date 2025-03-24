<script>
    let newItem = '';
	
    let todoList = [{text: 'Write my first post', status: true},
                    {text: 'Upload the post to the blog', status: false},
                    {text: 'Publish the post at Facebook', status: false}];
	
	function addToList() {
		todoList = [...todoList, {text: newItem, status: false}];
		newItem = '';
	}
	
	function removeFromList(index) {
		todoList.splice(index, 1)
		todoList = todoList;
    }
</script>

<input data-testid="new-item-input" bind:value={newItem} type="text" placeholder="new todo item..">
<button data-testid="add-item-button" on:click={addToList}>Add</button>

<br/>
{#each todoList as item, index}
	<input data-testid="item-checkbox" bind:checked={item.status} type="checkbox">
	<span data-testid="todo-item" class:checked={item.status}>{item.text}</span>
	<span data-testid="remove-item-button" on:click={() => removeFromList(index)}>❌</span>
	<br/>
{/each} 


<style> 
	.checked {
        text-decoration: line-through;
    }
</style> 