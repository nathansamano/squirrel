/* Edited by Nathan Samano
 * CMP237
 * Squirrelness
 * 1/30/15
 */

// Code to universalize interpreter
if (typeof(process) == "object") {
  var print = function(args) {
	console.log(args);
	}
  var write = function(args) {
	process.stdout.write(args);
	}
} else {
  console = new Object();
  console.log = function(args) {
    print(args);
	}
  process = new Object();
  process.stdout = new Object();
  process.stdout.write = function(args) {
    write(args);
    }
  }

// File inclusion doesn't work with node :-(
load('journal.js');

function hasEvent(event, entry) {
  return entry.events.indexOf(event) != -1;
}

function tableFor(event, journal) {
  var table = [0, 0, 0, 0];
  for (var i = 0; i < journal.length; i++) {
    var entry = journal[i], index = 0;
    if (hasEvent(event, entry)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

print("\n[No event/No squirrel, Event/No squirrel, No event/Squirrel, Event/Squirrel]\n");
print("touched tree\n" + tableFor("touched tree", JOURNAL));
print(phi(tableFor("touched tree",JOURNAL)));

/* 1/30/15 Assignement */
print("\nbrushed teeth\n" + tableFor("brushed teeth", JOURNAL));
print(phi(tableFor("brushed teeth", JOURNAL)));
print("\nweekend\n" + tableFor("weekend", JOURNAL));
print(phi(tableFor("weekend", JOURNAL)) + "\n");
