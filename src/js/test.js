var Immutable = require('immutable');
var immstruct = require('immstruct');
var diff = require('immutablediff');

var historyLimit = 10;
var structure = immstruct.withHistory('app', historyLimit, {
	'todos': []
});

structure.on('change', function (newStructure, oldStructure, keyPath) {
  console.log('New structure:', keyPath, newStructure);

  // e.g. with usage with React
  // React.render(App({ cursor: structure.cursor() }), document.body);
});

var cursor = structure.cursor(['todos']);

var newCursor = cursor.push(Immutable.fromJS({'id': 1, 'name': 'Do thing'}));

console.log(cursor, cursor.deref());

console.log(newCursor, newCursor.deref());

var diff_list = diff(cursor.deref(), newCursor.deref());
console.log(diff_list);

var anotherCursor = newCursor.update(
	newCursor.findIndex(function(item) {
		return item.get('id') === 1;
	}),
	function(item) {
		return item.set('name', 'Do more things');
	}
);

console.log(anotherCursor, anotherCursor.deref());

var next_diff_list = diff(newCursor.deref(), anotherCursor.deref());
console.log(next_diff_list);

structure.undo();
console.log(structure.cursor('todos').deref());

structure.redo();
console.log(structure.cursor('todos').deref());
