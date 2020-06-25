import VueSelector from 'testcafe-vue-selectors';

fixture `TODO list test`
    .page('http://localhost:1337');

test('Add new task', async t => {
    const todoTextInput = VueSelector('todo-input');
    const todoItem = VueSelector('todo-list todo-item');

    await t
        .typeText(todoTextInput, 'My Item')
        .pressKey('enter')
        .expect(todoItem.count).eql(3);
});
