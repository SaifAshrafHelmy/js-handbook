import { HOF } from "@/lib/types";

export const hofs: HOF[] = [
  {
    id: "map",
    name: "map",
    description: "Creates a new array by applying a function to every element.",
    example: "[1, 2, 3].map(x => x * 2); // [2, 4, 6]",
    usage: "Rendering lists in React.",
    richExample: `
// React Component: Rendering a list of products
const ProductList = ({ products }) => {
  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <div key={product.id} className="card">
          <h3>{product.name}</h3>
          <p>\${product.price}</p>
        </div>
      ))}
    </div>
  );
};
`,
    practice: {
      question: "Given an array of temperatures in Celsius [0, 10, 20, 30], create a new array converting them to Fahrenheit using the formula (C * 9/5) + 32.",
      answer: `
const celsius = [0, 10, 20, 30];
const fahrenheit = celsius.map(c => (c * 9/5) + 32);
console.log(fahrenheit); // [32, 50, 68, 86]
`
    }
  },
  {
    id: "filter",
    name: "filter",
    description: "Creates a new array with all elements that pass the test.",
    example: "[1, 2, 3, 4].filter(x => x % 2 === 0); // [2, 4]",
    usage: "Deleting an item from a list in State.",
    richExample: `
// React Hook: Filtering active todos
const useActiveTodos = (todos) => {
  return useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);
};

// State Update: Removing an item
const deleteTodo = (id) => {
  setTodos(prev => prev.filter(todo => todo.id !== id));
};
`,
    practice: {
      question: "Given an array of words ['apple', 'banana', 'kiwi', 'strawberry'], create a new array containing only words with more than 5 characters.",
      answer: `
const words = ['apple', 'banana', 'kiwi', 'strawberry'];
const longWords = words.filter(word => word.length > 5);
console.log(longWords); // ['banana', 'strawberry']
`
    }
  },
  {
    id: "reduce",
    name: "reduce",
    description: "Executes a reducer function on each element, resulting in a single output value.",
    example: "[1, 2, 3].reduce((acc, curr) => acc + curr, 0); // 6",
    usage: "Calculating totals in a shopping cart.",
    richExample: `
// Calculating Cart Total
const cart = [
  { name: 'Apple', price: 1.2, qty: 2 },
  { name: 'Banana', price: 0.8, qty: 5 }
];

const total = cart.reduce((acc, item) => {
  return acc + (item.price * item.qty);
}, 0);

console.log(total); // 6.4
`,
    practice: {
      question: "Given an array of numbers [10, 20, 30, 40], calculate the average value using reduce.",
      answer: `
const nums = [10, 20, 30, 40];
const average = nums.reduce((acc, curr) => acc + curr, 0) / nums.length;
console.log(average); // 25
`
    }
  },
  {
    id: "forEach",
    name: "forEach",
    description: "Executes a provided function once for each array element.",
    example: "[1, 2, 3].forEach(x => console.log(x));",
    usage: "Logging or side effects (avoid for data transformation).",
    richExample: `
// Analytics Tracking
const trackImpressions = (items) => {
  items.forEach(item => {
    analytics.logEvent('view_item', { id: item.id });
  });
};
`,
    practice: {
      question: "Iterate over an array of names ['Alice', 'Bob'] and log 'Hello, [name]!' for each.",
      answer: `
const names = ['Alice', 'Bob'];
names.forEach(name => console.log(\`Hello, \${name}!\`));
`
    }
  },
  {
    id: "find",
    name: "find",
    description: "Returns the value of the first element that satisfies the testing function.",
    example: "[1, 2, 3].find(x => x > 1); // 2",
    usage: "Finding a specific user by ID.",
    richExample: `
// Finding a user in a list
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const user = users.find(u => u.id === 2);
console.log(user.name); // 'Bob'
`,
    practice: {
      question: "Find the first number in the array [5, 12, 8, 130, 44] that is greater than 10.",
      answer: `
const numbers = [5, 12, 8, 130, 44];
const found = numbers.find(element => element > 10);
console.log(found); // 12
`
    }
  },
  {
    id: "findIndex",
    name: "findIndex",
    description: "Returns the index of the first element that satisfies the testing function.",
    example: "[1, 2, 3].findIndex(x => x > 1); // 1",
    usage: "Finding index to splice/remove an item.",
    richExample: `
// Updating an item in a list (Mutable approach)
const updateItem = (id, newData) => {
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...newData };
  }
};
`,
    practice: {
      question: "Find the index of 'blue' in the array ['red', 'green', 'blue', 'yellow'].",
      answer: `
const colors = ['red', 'green', 'blue', 'yellow'];
const index = colors.findIndex(color => color === 'blue');
console.log(index); // 2
`
    }
  },
  {
    id: "some",
    name: "some",
    description: "Tests whether at least one element in the array passes the test.",
    example: "[1, 2, 3].some(x => x > 2); // true",
    usage: "Checking if any item in a cart is out of stock.",
    richExample: `
// Form Validation
const hasErrors = fields.some(field => field.error);

if (hasErrors) {
  disableSubmitButton();
}
`,
    practice: {
      question: "Check if the array [1, 3, 5, 7] contains any even numbers.",
      answer: `
const nums = [1, 3, 5, 7];
const hasEven = nums.some(n => n % 2 === 0);
console.log(hasEven); // false
`
    }
  },
  {
    id: "every",
    name: "every",
    description: "Tests whether all elements in the array pass the test.",
    example: "[1, 2, 3].every(x => x > 0); // true",
    usage: "Validating if all form fields are filled.",
    richExample: `
// Check if all steps are completed
const steps = [
  { id: 1, completed: true },
  { id: 2, completed: true }
];

const isFinished = steps.every(step => step.completed);
`,
    practice: {
      question: "Check if all numbers in the array [10, 20, 30] are greater than 5.",
      answer: `
const nums = [10, 20, 30];
const allGreaterThan5 = nums.every(n => n > 5);
console.log(allGreaterThan5); // true
`
    }
  },
  {
    id: "sort",
    name: "sort",
    description: "Sorts the elements of an array in place and returns the reference to the same array.",
    example: "[3, 1, 2].sort((a, b) => a - b); // [1, 2, 3]",
    usage: "Sorting a table of data.",
    richExample: `
// Sorting users by name
const users = [
  { name: 'Charlie' },
  { name: 'Alice' },
  { name: 'Bob' }
];

// ⚠️ Mutates original array!
users.sort((a, b) => a.name.localeCompare(b.name));
`,
    practice: {
      question: "Sort the array of numbers [40, 100, 1, 5, 25] in ascending order.",
      answer: `
const points = [40, 100, 1, 5, 25];
points.sort((a, b) => a - b);
console.log(points); // [1, 5, 25, 40, 100]
`
    }
  },
  {
    id: "includes",
    name: "includes",
    description: "Determines whether an array includes a certain value.",
    example: "[1, 2, 3].includes(2); // true",
    usage: "Checking permissions or roles.",
    richExample: `
// Role-based access control
const userRoles = ['editor', 'viewer'];
const canEdit = userRoles.includes('admin') || userRoles.includes('editor');
`,
    practice: {
      question: "Check if the array ['cat', 'dog', 'bat'] includes the value 'dog'.",
      answer: `
const pets = ['cat', 'dog', 'bat'];
const hasDog = pets.includes('dog');
console.log(hasDog); // true
`
    }
  },
  {
    id: "slice",
    name: "slice",
    description: "Returns a shallow copy of a portion of an array.",
    example: "[1, 2, 3].slice(0, 2); // [1, 2]",
    usage: "Pagination (getting a subset of items).",
    richExample: `
// Pagination logic
const getPage = (items, pageNumber, pageSize) => {
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;
  return items.slice(start, end);
};
`,
    practice: {
      question: "Extract the last two elements from the array ['a', 'b', 'c', 'd', 'e'].",
      answer: `
const letters = ['a', 'b', 'c', 'd', 'e'];
const lastTwo = letters.slice(-2);
console.log(lastTwo); // ['d', 'e']
`
    }
  },
  {
    id: "splice",
    name: "splice",
    description: "Changes the contents of an array by removing or replacing existing elements.",
    example: "const arr = [1, 2, 3]; arr.splice(1, 1); // arr is [1, 3]",
    usage: "Removing items from a mutable array (careful in React).",
    richExample: `
// Removing an item (Mutable)
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb'); // Inserts at index 1
console.log(months); // ["Jan", "Feb", "March", "April", "June"]
`,
    practice: {
      question: "Remove 'orange' from the array ['apple', 'orange', 'banana'] and replace it with 'grape'.",
      answer: `
const fruits = ['apple', 'orange', 'banana'];
fruits.splice(1, 1, 'grape');
console.log(fruits); // ['apple', 'grape', 'banana']
`
    }
  },
  {
    id: "concat",
    name: "concat",
    description: "Merges two or more arrays.",
    example: "[1].concat([2]); // [1, 2]",
    usage: "Merging lists (though spread ... is preferred).",
    richExample: `
// Merging historical data with new data
const oldLogs = [1, 2, 3];
const newLogs = [4, 5];
const allLogs = oldLogs.concat(newLogs);
`,
    practice: {
      question: "Merge array [1, 2] and array [3, 4] into a single array.",
      answer: `
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = arr1.concat(arr2);
console.log(merged); // [1, 2, 3, 4]
`
    }
  },
  {
    id: "flat",
    name: "flat",
    description: "Creates a new array with all sub-array elements concatenated recursively.",
    example: "[1, [2, 3]].flat(); // [1, 2, 3]",
    usage: "Flattening nested data structures.",
    richExample: `
// Flattening nested categories
const categories = [
  ['Electronics', 'Gadgets'],
  ['Clothing', 'Shoes']
];

const allTags = categories.flat();
// ['Electronics', 'Gadgets', 'Clothing', 'Shoes']
`,
    practice: {
      question: "Flatten the array [1, [2, [3, [4]]]] to a depth of 2.",
      answer: `
const arr = [1, [2, [3, [4]]]];
const flattened = arr.flat(2);
console.log(flattened); // [1, 2, 3, [4]]
`
    }
  },
  {
    id: "flatMap",
    name: "flatMap",
    description: "Maps each element using a mapping function, then flattens the result.",
    example: "[1, 2].flatMap(x => [x, x * 2]); // [1, 2, 2, 4]",
    usage: "Processing and flattening data in one step.",
    richExample: `
// Extracting all tags from posts
const posts = [
  { id: 1, tags: ['react', 'js'] },
  { id: 2, tags: ['css'] }
];

const allTags = posts.flatMap(post => post.tags);
// ['react', 'js', 'css']
`,
    practice: {
      question: "Given sentences ['Hello world', 'Goodbye'], split them into individual words in a single flat array.",
      answer: `
const sentences = ['Hello world', 'Goodbye'];
const words = sentences.flatMap(s => s.split(' '));
console.log(words); // ['Hello', 'world', 'Goodbye']
`
    }
  },
  {
    id: "join",
    name: "join",
    description: "Joins all elements of an array into a string.",
    example: "['a', 'b'].join('-'); // 'a-b'",
    usage: "Creating CSV strings or URL paths.",
    richExample: `
// Creating a CSS class string
const classes = ['btn', 'btn-primary', 'active'];
const className = classes.join(' '); // "btn btn-primary active"
`,
    practice: {
      question: "Join the array ['2023', '12', '31'] with hyphens to create a date string.",
      answer: `
const parts = ['2023', '12', '31'];
const date = parts.join('-');
console.log(date); // "2023-12-31"
`
    }
  },
  {
    id: "reverse",
    name: "reverse",
    description: "Reverses an array in place.",
    example: "[1, 2].reverse(); // [2, 1]",
    usage: "Showing latest items first (copy first!).",
    richExample: `
// Displaying chat messages (newest at bottom, but data might be reversed)
const messages = ['Hello', 'How are you?'];
// ⚠️ Mutates! Use toReversed() or [...messages].reverse()
const reversed = [...messages].reverse();
`,
    practice: {
      question: "Reverse the array ['a', 'b', 'c'] without mutating the original array.",
      answer: `
const arr = ['a', 'b', 'c'];
const reversed = [...arr].reverse();
console.log(reversed); // ['c', 'b', 'a']
console.log(arr); // ['a', 'b', 'c']
`
    }
  },
  {
    id: "indexOf",
    name: "indexOf",
    description: "Returns the first index at which a given element can be found.",
    example: "[1, 2, 3].indexOf(2); // 1",
    usage: "Checking existence (legacy, use includes or findIndex).",
    richExample: `
// Finding index of a simple value
const colors = ['red', 'blue', 'green'];
const blueIndex = colors.indexOf('blue'); // 1
`,
    practice: {
      question: "Find the index of the first occurrence of 5 in [1, 5, 10, 5].",
      answer: `
const nums = [1, 5, 10, 5];
const index = nums.indexOf(5);
console.log(index); // 1
`
    }
  },
  {
    id: "lastIndexOf",
    name: "lastIndexOf",
    description: "Returns the last index at which a given element can be found.",
    example: "[1, 2, 1].lastIndexOf(1); // 2",
    usage: "Finding last occurrence.",
    richExample: `
// Finding the last occurrence of a value
const numbers = [2, 5, 9, 2];
const lastIndex = numbers.lastIndexOf(2); // 3
`,
    practice: {
      question: "Find the index of the last occurrence of 'a' in ['a', 'b', 'a', 'c'].",
      answer: `
const chars = ['a', 'b', 'a', 'c'];
const index = chars.lastIndexOf('a');
console.log(index); // 2
`
    }
  },
  {
    id: "from",
    name: "Array.from",
    description: "Creates a new, shallow-copied Array instance from an array-like or iterable object.",
    example: "Array.from('foo'); // ['f', 'o', 'o']",
    usage: "Converting NodeList to Array.",
    richExample: `
// Generating a sequence of numbers
const range = (start, end) => 
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const nums = range(1, 5); // [1, 2, 3, 4, 5]
`,
    practice: {
      question: "Create an array of numbers from 0 to 4 using Array.from and an object with a length property.",
      answer: `
const arr = Array.from({ length: 5 }, (v, i) => i);
console.log(arr); // [0, 1, 2, 3, 4]
`
    }
  },
  {
    id: "isArray",
    name: "Array.isArray",
    description: "Determines whether the passed value is an Array.",
    example: "Array.isArray([]); // true",
    usage: "Validating props or API responses.",
    richExample: `
// Robust API response handling
const processData = (data) => {
  if (!Array.isArray(data)) {
    console.error('Expected array, got:', typeof data);
    return;
  }
  // Safe to use map/filter
  data.map(item => console.log(item));
};
`,
    practice: {
      question: "Check if the variable x = { length: 0 } is an array.",
      answer: `
const x = { length: 0 };
console.log(Array.isArray(x)); // false
`
    }
  },
  {
    id: "of",
    name: "Array.of",
    description: "Creates a new Array instance from a variable number of arguments.",
    example: "Array.of(1, 2, 3); // [1, 2, 3]",
    usage: "Creating arrays from arguments.",
    richExample: `
// Creating an array from arguments
const arr = Array.of(1, 2, 3); // [1, 2, 3]
// Difference from new Array(3) which creates empty slots
`,
    practice: {
      question: "Create an array containing the number 7 using Array.of.",
      answer: `
const arr = Array.of(7);
console.log(arr); // [7]
`
    }
  },
  {
    id: "fill",
    name: "fill",
    description: "Changes all elements in an array to a static value.",
    example: "new Array(3).fill(0); // [0, 0, 0]",
    usage: "Initializing arrays with default values.",
    richExample: `
// Initializing a grid for a game
const grid = new Array(3).fill(null).map(() => new Array(3).fill(0));
`,
    practice: {
      question: "Create an array of length 5 filled with the string 'hello'.",
      answer: `
const arr = new Array(5).fill('hello');
console.log(arr); // ['hello', 'hello', 'hello', 'hello', 'hello']
`
    }
  },
  {
    id: "keys",
    name: "keys",
    description: "Returns a new Array Iterator object that contains the keys for each index.",
    example: "[...['a', 'b'].keys()]; // [0, 1]",
    usage: "Iterating over indices.",
    richExample: `
// Iterating over keys
const arr = ['a', 'b', 'c'];
for (const key of arr.keys()) {
  console.log(key); // 0, 1, 2
}
`,
    practice: {
      question: "Log all indices of the array ['x', 'y', 'z'] using keys().",
      answer: `
const arr = ['x', 'y', 'z'];
for (const index of arr.keys()) {
  console.log(index);
}
// Output: 0, 1, 2
`
    }
  },
  {
    id: "values",
    name: "values",
    description: "Returns a new Array Iterator object that contains the values for each index.",
    example: "[...['a', 'b'].values()]; // ['a', 'b']",
    usage: "Iterating over values.",
    richExample: `
// Iterating over values
const arr = ['a', 'b', 'c'];
for (const value of arr.values()) {
  console.log(value); // 'a', 'b', 'c'
}
`,
    practice: {
      question: "Create an array of values from ['a', 'b'] using values() and spread syntax.",
      answer: `
const arr = ['a', 'b'];
const values = [...arr.values()];
console.log(values); // ['a', 'b']
`
    }
  },
  {
    id: "entries",
    name: "entries",
    description: "Returns a new Array Iterator object that contains the key/value pairs.",
    example: "[...['a', 'b'].entries()]; // [[0, 'a'], [1, 'b']]",
    usage: "Iterating with index and value.",
    richExample: `
// Iterating with index
const arr = ['a', 'b', 'c'];
for (const [index, element] of arr.entries()) {
  console.log(index, element);
}
`,
    practice: {
      question: "Iterate over ['apple', 'banana'] and log the index and value.",
      answer: `
const fruits = ['apple', 'banana'];
for (const [index, fruit] of fruits.entries()) {
  console.log(\`\${index}: \${fruit}\`);
}
// Output:
// 0: apple
// 1: banana
`
    }
  },
  {
    id: "copyWithin",
    name: "copyWithin",
    description: "Shallow copies part of an array to another location in the same array.",
    example: "[1, 2, 3, 4, 5].copyWithin(0, 3); // [4, 5, 3, 4, 5]",
    usage: "Efficient data shifting (rare).",
    richExample: `
// Shifting data in a typed array (performance critical)
const buffer = new Int32Array([1, 2, 3, 4, 5]);
buffer.copyWithin(0, 2);
// [3, 4, 5, 4, 5]
`,
    practice: {
      question: "Copy the first two elements of [1, 2, 3, 4, 5] to the end of the array (starting at index 3).",
      answer: `
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(3, 0, 2);
console.log(arr); // [1, 2, 3, 1, 2]
`
    }
  },
  {
    id: "reduceRight",
    name: "reduceRight",
    description: "Applies a function against an accumulator and each value of the array (from right-to-left).",
    example: "[[0, 1], [2, 3]].reduceRight((acc, curr) => acc.concat(curr)); // [2, 3, 0, 1]",
    usage: "Processing data in reverse order.",
    richExample: `
// Composing functions (Right to Left)
const add5 = x => x + 5;
const double = x => x * 2;
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const add5ThenDouble = compose(double, add5);
console.log(add5ThenDouble(10)); // (10 + 5) * 2 = 30
`,
    practice: {
      question: "Concatenate the characters ['a', 'b', 'c'] in reverse order using reduceRight.",
      answer: `
const chars = ['a', 'b', 'c'];
const reversed = chars.reduceRight((acc, char) => acc + char, '');
console.log(reversed); // "cba"
`
    }
  },
  {
    id: "toString",
    name: "toString",
    description: "Returns a string representing the specified array and its elements.",
    example: "[1, 2, 'a'].toString(); // '1,2,a'",
    usage: "Simple serialization.",
    richExample: `
// Quick debugging output
const arr = [1, 2, 3];
console.log(arr.toString()); // "1,2,3"
`,
    practice: {
      question: "Convert the array [1, 2, 3] to a string.",
      answer: `
const arr = [1, 2, 3];
console.log(arr.toString()); // "1,2,3"
`
    }
  },
  {
    id: "toLocaleString",
    name: "toLocaleString",
    description: "Returns a localized string representing the elements of the array.",
    example: "[1, new Date()].toLocaleString();",
    usage: "Displaying localized data.",
    richExample: `
// Formatting currency list
const prices = [1000, 2000, 3000];
console.log(prices.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
// "$1,000.00,$2,000.00,$3,000.00"
`,
    practice: {
      question: "Format the array [1000, 2000] as currency strings for 'de-DE' (Euro).",
      answer: `
const prices = [1000, 2000];
console.log(prices.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }));
// "1.000,00 €, 2.000,00 €"
`
    }
  },
  {
    id: "at",
    name: "at",
    description: "Takes an integer value and returns the item at that index (supports negative).",
    example: "[1, 2, 3].at(-1); // 3",
    usage: "Getting last element easily.",
    richExample: `
// Getting the last item without knowing length
const items = ['a', 'b', 'c', 'd'];
const lastItem = items.at(-1); // 'd'
`,
    practice: {
      question: "Get the second to last element of the array [10, 20, 30, 40] using .at().",
      answer: `
const nums = [10, 20, 30, 40];
console.log(nums.at(-2)); // 30
`
    }
  },
  {
    id: "toSorted",
    name: "toSorted",
    description: "Copying version of sort(). Returns a new sorted array.",
    example: "[3, 1].toSorted(); // [1, 3]",
    usage: "Sorting without mutating state.",
    richExample: `
// Safe sorting in React
const List = ({ items }) => {
  // Doesn't mutate props!
  const sortedItems = items.toSorted((a, b) => a - b);
  return <ul>{sortedItems.map(i => <li key={i}>{i}</li>)}</ul>;
};
`,
    practice: {
      question: "Sort the array [3, 1, 2] without mutating the original array.",
      answer: `
const arr = [3, 1, 2];
const sorted = arr.toSorted();
console.log(sorted); // [1, 2, 3]
console.log(arr); // [3, 1, 2]
`
    }
  },
  {
    id: "toReversed",
    name: "toReversed",
    description: "Copying version of reverse(). Returns a new reversed array.",
    example: "[1, 2].toReversed(); // [2, 1]",
    usage: "Reversing without mutating state.",
    richExample: `
// Safe reversing
const history = [1, 2, 3];
const recentFirst = history.toReversed(); // [3, 2, 1]
console.log(history); // [1, 2, 3] (Unchanged)
`,
    practice: {
      question: "Reverse the array [1, 2, 3] without mutating the original array using toReversed().",
      answer: `
const arr = [1, 2, 3];
const reversed = arr.toReversed();
console.log(reversed); // [3, 2, 1]
console.log(arr); // [1, 2, 3]
`
    }
  }
];
