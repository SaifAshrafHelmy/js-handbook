import { Topic } from "@/lib/types";

export const topics: Topic[] = [
  {
    id: "variables-scoping",
    title: "Variables + Scoping",
    slug: "variables-scoping",
    description: "Understanding var, let, const, and scope chains.",
    category: "Fundamentals",
    order: 1,
    keyConcepts: ["var vs let vs const", "Hoisting", "Temporal Dead Zone", "Scope Chain"],
    content: `
## Variables: var, let, and const

JavaScript provides three ways to declare variables.

### \`var\`
- **Scope:** Function scoped.
- **Hoisting:** Hoisted to the top of its scope and initialized with \`undefined\`.
- **Re-declaration:** Allowed.

\`\`\`javascript
function example() {
  console.log(x); // undefined (hoisted)
  var x = 10;
}
\`\`\`

### \`let\`
- **Scope:** Block scoped.
- **Hoisting:** Hoisted but TDZ (Temporal Dead Zone).
- **Re-declaration:** Not allowed in same block.

### \`const\`
- **Scope:** Block scoped.
- **Re-assignment:** Not allowed.
- **Immutability:** Binding is immutable, object properties are mutable.

---

## Scoping

### Block Scope
Variables declared with \`let\` and \`const\` are confined to the block \`{}\`.

### Function Scope
Variables declared with \`var\` are confined to the function.

### Scope Lookup
JavaScript looks up the scope chain: Current -> Outer -> Global.

---

## Real-World Usage

### 1. React State & Props (Immutability)
**Why it matters:** In React, you almost always use \`const\` for defining components, hooks, and props. This signals that the reference shouldn't change, which is crucial for React's reconciliation process.

**Scenario:** Defining a component and its handlers.

\`\`\`javascript
// ✅ GOOD: Using const for component and handlers
const UserProfile = ({ user }) => {
  // 'user' prop is treated as immutable
  
  const handleUpdate = () => {
    // Logic here
  };

  return <div>{user.name}</div>;
};
\`\`\`

### 2. Loop Variables
**Why it matters:** Using \`let\` in loops creates a new binding for each iteration, which prevents common closure bugs associated with \`var\`.

**Scenario:** Creating a list of event listeners or asynchronous operations.

\`\`\`javascript
// ❌ BAD: 'var' shares the same 'i' across all timeouts
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Logs 3, 3, 3
}

// ✅ GOOD: 'let' creates a new scope per iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Logs 0, 1, 2
}
\`\`\`
`
  },
  {
    id: "types",
    title: "Types",
    slug: "types",
    description: "Primitive types, objects, and reference vs copy.",
    category: "Fundamentals",
    order: 2,
    keyConcepts: ["Primitives vs Objects", "Pass by Value vs Reference", "Mutability"],
    content: `
## Types

### Objects
Objects are collections of key-value pairs. Keys are strings (or Symbols), and values can be any type.

\`\`\`javascript
const user = {
  name: "Alice",
  age: 30
};
\`\`\`

### Reference vs. Copy
- **Primitives** (string, number, boolean, etc.) are passed by **value** (copy).
- **Objects** (including arrays and functions) are passed by **reference**.

\`\`\`javascript
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)

const obj1 = { x: 10 };
const obj2 = obj1; // Reference copy
obj2.x = 20;
console.log(obj1.x); // 20 (changed!)
\`\`\`

---

## Real-World Usage

### 1. React State Updates
**Why it matters:** React compares objects by reference (shallow comparison). If you mutate an object directly, the reference stays the same, and React won't trigger a re-render.

**Scenario:** Updating a user's profile in state.

\`\`\`javascript
const [user, setUser] = useState({ name: 'Alice', age: 25 });

// ❌ BAD: Direct mutation (No re-render)
user.age = 26;
setUser(user); 

// ✅ GOOD: Creating a new object reference
setUser(prev => ({ ...prev, age: 26 }));
\`\`\`

### 2. Prop Drilling & Memoization
**Why it matters:** Passing new object references as props can cause unnecessary re-renders in child components wrapped with \`React.memo\`.

**Scenario:** Passing a configuration object.

\`\`\`javascript
// ⚠️ CAUTION: 'style' is a new object every render
<Component style={{ color: 'red' }} />

// ✅ BETTER: Memoize the object if it's expensive
const style = useMemo(() => ({ color: 'red' }), []);
<Component style={style} />
\`\`\`
`
  },
  {
    id: "functions",
    title: "Functions",
    slug: "functions",
    description: "Arrow functions, expressions, and methods.",
    category: "Core",
    order: 3,
    keyConcepts: ["Function Declaration", "Function Expression", "Arrow Functions", "Methods"],
    content: `
## Functions

### Types of Functions

#### 1. Function Declaration (Named)
Hoisted to the top of the scope.

\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`

#### 2. Function Expression (Anonymous)
Not hoisted.

\`\`\`javascript
const add = function(a, b) {
  return a + b;
};
\`\`\`

#### 3. Arrow Functions
Concise syntax, lexical \`this\`.

\`\`\`javascript
const add = (a, b) => a + b;
\`\`\`

### Methods
Functions that are properties of an object.

\`\`\`javascript
const obj = {
  greet() {
    return "Hello";
  }
};
\`\`\`

---

## Real-World Usage

### 1. React Event Handlers & 'this'
**Why it matters:** Arrow functions don't have their own \`this\`; they inherit it from the surrounding scope. This is perfect for React class components (historically) or just for concise syntax in functional components.

**Scenario:** Handling a button click.

\`\`\`javascript
// Concise and clean
const handleClick = (id) => {
  console.log('Clicked', id);
};

return <button onClick={() => handleClick(1)}>Click</button>;
\`\`\`

### 2. Functional Programming (Currying)
**Why it matters:** Functions returning functions allow for powerful patterns like currying, often used in middleware or specialized event handlers.

**Scenario:** Creating a specialized logger or handler.

\`\`\`javascript
const createLogger = (prefix) => (message) => {
  console.log(\`[\${prefix}] \${message}\`);
};

const errorLog = createLogger('ERROR');
errorLog('Database failed'); // "[ERROR] Database failed"
\`\`\`
`
  },
  {
    id: "dom",
    title: "DOM",
    slug: "dom",
    description: "Selecting, updating, and creating elements.",
    category: "Browser",
    order: 4,
    keyConcepts: ["Selecting Elements", "Updating DOM", "Creating Elements", "Refs in React"],
    content: `
## DOM Manipulation

### Selecting Elements
\`\`\`javascript
const btn = document.getElementById('btn');
const items = document.querySelectorAll('.item');
\`\`\`

### Updating Elements
\`\`\`javascript
btn.textContent = "Clicked!";
btn.style.backgroundColor = "red";
btn.classList.add("active");
\`\`\`

### Creating Elements
\`\`\`javascript
const div = document.createElement('div');
div.textContent = "New Element";
document.body.appendChild(div);
\`\`\`

---

## Real-World Usage

### 1. React Refs (\`useRef\`)
**Why it matters:** In React, we avoid direct DOM manipulation to keep the Virtual DOM in sync. However, for things like focus management, media playback, or integrating 3rd-party libraries (like D3.js or Maps), we need direct access.

**Scenario:** Focusing an input field when a modal opens.

\`\`\`javascript
const InputModal = ({ isOpen }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Direct DOM manipulation is safe here
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return <input ref={inputRef} />;
};
\`\`\`

### 2. Portals
**Why it matters:** Sometimes you need to render a child into a different part of the DOM hierarchy (like \`document.body\`) for modals or tooltips to avoid z-index issues.

**Scenario:** Creating a global Modal.

\`\`\`javascript
import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
  return createPortal(
    <div className="modal">{children}</div>,
    document.body // Rendering outside the root app div
  );
};
\`\`\`
`
  },
  {
    id: "prototypes-this",
    title: "Prototypes + this",
    slug: "prototypes-this",
    description: "The 'this' keyword and prototypal inheritance.",
    category: "Advanced",
    order: 5,
    keyConcepts: ["this Context", "Prototypal Inheritance", "Constructor Functions", "Classes"],
    content: `
## Prototypes + \`this\`

### Understanding \`this\`
The value of \`this\` depends on *how* the function is called.

1. **Global context:** \`window\` (or \`undefined\` in strict mode).
2. **Method call:** The object calling the method.
3. **Constructor:** The new instance.
4. **Arrow function:** Lexical scope (surrounding context).

### Prototypes
JavaScript uses prototypal inheritance. Objects inherit properties from their prototype.

\`\`\`javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  console.log(this.name + ' speaks.');
};
\`\`\`

---

## Real-World Usage

### 1. Class Components (Legacy React)
**Why it matters:** Understanding \`this\` is crucial if you work with older React codebases using Class Components. You often had to manually bind methods in the constructor.

**Scenario:** Binding event handlers.

\`\`\`javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    // Fixing 'this' context
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Without binding, 'this' would be undefined here
    this.setState({ count: this.state.count + 1 });
  }
}
\`\`\`

### 2. Custom Libraries & SDKs
**Why it matters:** Many libraries (like testing frameworks or analytics SDKs) use classes and prototypes to expose their API. Understanding how to extend them or fix context issues is a key skill.

**Scenario:** Extending a base class.

\`\`\`javascript
class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
  }
}
\`\`\`
`
  },
  {
    id: "events",
    title: "Events",
    slug: "events",
    description: "Event listeners, bubbling, and dispatching.",
    category: "Browser",
    order: 6,
    keyConcepts: ["Event Listeners", "Event Bubbling", "Event Delegation", "Synthetic Events"],
    content: `
## Events

### Listening and Callbacks
\`\`\`javascript
btn.addEventListener('click', (e) => {
  console.log('Clicked!', e.target);
});
\`\`\`

### Event Bubbling
Events bubble up from the target to the root.
\`stopPropagation()\` stops this.

### Dispatching Events
\`\`\`javascript
const event = new CustomEvent('myEvent', { detail: { id: 1 } });
window.dispatchEvent(event);
\`\`\`

---

## Real-World Usage

### 1. Event Delegation
**Why it matters:** Instead of attaching listeners to 100 individual list items (memory heavy), attach one listener to the parent container and check \`e.target\`.

**Scenario:** Handling clicks on a dynamic list.

\`\`\`javascript
// Native JS Example
document.getElementById('list').addEventListener('click', (e) => {
  if (e.target.matches('li.item')) {
    console.log('Item clicked:', e.target.id);
  }
});
\`\`\`

### 2. Click Outside (Modals/Dropdowns)
**Why it matters:** A common UI pattern is closing a dropdown when the user clicks anywhere else on the page.

**Scenario:** Implementing a "Click Outside" hook.

\`\`\`javascript
useEffect(() => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeDropdown();
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [ref]);
\`\`\`
`
  },
  {
    id: "arrays",
    title: "Arrays",
    slug: "arrays",
    description: "Manipulation, HOFs, and immutability.",
    category: "Core",
    order: 7,
    keyConcepts: ["Array Methods", "Spread/Rest", "Immutability", "Higher Order Functions"],
    content: `
## Arrays

### Manipulation
- \`push\`, \`pop\`: Mutate end.
- \`shift\`, \`unshift\`: Mutate start.
- \`splice\`: Remove/add anywhere (mutates).
- \`slice\`: Copy part of array (immutable).

### Spread and Rest
\`\`\`javascript
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // Spread
const [first, ...rest] = arr; // Rest
\`\`\`

### HOFs (Map, Filter, Reduce)
See the "JavaScript Array Methods" section for details.

### Mutation vs Immutability
Always prefer immutable operations in modern JS/React.

---

## Real-World Usage

### 1. Data Transformation (Map/Filter/Reduce)
**Why it matters:** You rarely display raw data from an API. You filter it, sort it, and map it to UI components.

**Scenario:** Rendering a list of active users sorted by name.

\`\`\`javascript
const ActiveUsersList = ({ users }) => {
  const processedUsers = users
    .filter(u => u.isActive)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(u => <UserCard key={u.id} user={u} />);

  return <div>{processedUsers}</div>;
};
\`\`\`

### 2. Immutable State Updates
**Why it matters:** As mentioned in Types, React needs new references to detect changes. Array methods like \`push\` return the new length, not the array, and mutate in place.

**Scenario:** Adding an item to a shopping cart.

\`\`\`javascript
// ❌ BAD: Mutates state directly
const addToCart = (item) => {
  cart.push(item);
  setCart(cart);
};

// ✅ GOOD: Creates a new array
const addToCart = (item) => {
  setCart(prevCart => [...prevCart, item]);
};
\`\`\`
`
  },
  {
    id: "flow-control",
    title: "Flow Control",
    slug: "flow-control",
    description: "Loops, conditionals, and async/await.",
    category: "Core",
    order: 8,
    keyConcepts: ["Loops", "Conditionals", "Async/Await", "Promises"],
    content: `
## Flow Control

### Looping
- \`for\`: Standard loop.
- \`for...of\`: Iterate over iterables (arrays, strings).
- \`for...in\`: Iterate over object keys.
- \`while\`: Loop while condition is true.

### Conditionals
- \`if/else\`: Standard conditional.
- \`switch\`: Multiple cases.
- Ternary: \`condition ? true : false\`.

### Async/Await
Syntactic sugar over Promises.

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

---

## Real-World Usage

### 1. Conditional Rendering in JSX
**Why it matters:** React relies heavily on ternary operators and logical AND (\`&&\`) for showing/hiding UI elements.

**Scenario:** Showing a loading state or error message.

\`\`\`javascript
return (
  <div>
    {isLoading ? (
      <Spinner />
    ) : error ? (
      <ErrorMessage msg={error} />
    ) : (
      <DataList data={data} />
    )}
  </div>
);
\`\`\`

### 2. Sequential vs Parallel Async
**Why it matters:** Understanding how to control async flow affects performance. Awaiting in a loop is slow; \`Promise.all\` is fast.

**Scenario:** Fetching data for a dashboard.

\`\`\`javascript
// ❌ SLOW: Fetches one by one
const user = await fetchUser();
const posts = await fetchPosts();

// ✅ FAST: Fetches concurrently
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts()
]);
\`\`\`
`
  },
  {
    id: "security-accessibility",
    title: "Security & Accessibility",
    slug: "security-accessibility",
    description: "XSS prevention and accessibility best practices.",
    category: "Best Practices",
    order: 9,
    keyConcepts: ["XSS Prevention", "Sanitization", "Semantic HTML", "ARIA"],
    content: `
## Security & Accessibility

### XSS (Cross-Site Scripting)
Prevent injecting malicious scripts.
- Never use \`innerHTML\` with user input.
- Sanitize input.

### Accessibility (a11y)
- Semantic HTML (\`<button>\`, \`<nav>\`).
- ARIA attributes when needed.
- Keyboard navigation.

---

## Real-World Usage

### 1. Rendering User Content (Sanitization)
**Why it matters:** If you render Markdown or HTML from a user (e.g., a comment system), you are vulnerable to XSS.

**Scenario:** Safely rendering HTML.

\`\`\`javascript
import DOMPurify from 'dompurify';

const SafeHTML = ({ content }) => {
  const clean = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
};
\`\`\`

### 2. Accessible Forms
**Why it matters:** Screen readers rely on labels being associated with inputs.

**Scenario:** Creating a login form.

\`\`\`javascript
// ✅ GOOD: Explicit association
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-required="true" />

// ✅ GOOD: Implicit association (wrapping)
<label>
  Password
  <input type="password" />
</label>
\`\`\`
`
  },
  {
    id: "things-to-know",
    title: "Things to Know",
    slug: "things-to-know",
    description: "Modules, closures, and Ajax.",
    category: "Advanced",
    order: 10,
    keyConcepts: ["ES Modules", "Closures", "Lexical Environment", "Ajax/Fetch"],
    content: `
## Things to Know

### Modules
ES Modules (\`import\`/\`export\`) are the standard.

### Closures
A function bundled with its lexical environment.

\`\`\`javascript
function makeCounter() {
  let count = 0;
  return () => count++;
}
const counter = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1
\`\`\`

### Ajax
Asynchronous JavaScript and XML (now mostly JSON with \`fetch\`).

---

## Real-World Usage

### 1. Custom Hooks (Closures)
**Why it matters:** Custom hooks are essentially closures. They "remember" the state and side effects created during their execution, even as the component re-renders.

**Scenario:** A hook to debounce a search input.

\`\`\`javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // This timeout is closed over 'value' and 'delay'
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
\`\`\`

### 2. Tree Shaking (Modules)
**Why it matters:** Using named exports allows bundlers (like Webpack or Turbopack) to remove unused code ("tree shaking"), reducing bundle size.

**Scenario:** Importing utilities.

\`\`\`javascript
// ✅ GOOD: Only imports 'formatDate'
import { formatDate } from 'date-fns';

// ❌ BAD: Imports the entire library (if not optimized)
import _ from 'lodash';
\`\`\`
`
  },
  {
    id: "clean-code",
    title: "Clean Code",
    slug: "clean-code",
    description: "Principles for writing maintainable JavaScript.",
    category: "Best Practices",
    order: 11,
    keyConcepts: ["Meaningful Names", "Small Functions", "Pure Functions", "DRY Principle"],
    content: `
## Clean Code

### Principles
- **Meaningful Names:** \`getUser\` vs \`getData\`.
- **Small Functions:** Do one thing well.
- **Avoid Side Effects:** Pure functions are easier to test.
- **DRY (Don't Repeat Yourself):** Extract common logic.

---

## Real-World Usage

### 1. Component Composition (DRY)
**Why it matters:** Instead of passing 10 props to a "God Component", break it down. This makes code reusable and easier to test.

**Scenario:** A reusable Card component.

\`\`\`javascript
// ❌ BAD: One giant component handling everything
<Card title="X" showImage={true} imageSrc="..." footerText="..." />

// ✅ GOOD: Composable parts
<Card>
  <CardHeader>{title}</CardHeader>
  <CardImage src={src} />
  <CardFooter>{footerText}</CardFooter>
</Card>
\`\`\`

### 2. Early Returns (Readability)
**Why it matters:** Deeply nested \`if/else\` blocks are hard to read. Early returns flatten the logic.

**Scenario:** Validating a user action.

\`\`\`javascript
// ❌ BAD: Nested
const processPayment = (user) => {
  if (user) {
    if (user.hasCard) {
      if (user.balance > 0) {
        pay();
      }
    }
  }
};

// ✅ GOOD: Early returns
const processPayment = (user) => {
  if (!user) return;
  if (!user.hasCard) return;
  if (user.balance <= 0) return;

  pay();
};
\`\`\`
`
  },
  {
    id: "event-loop",
    title: "Event Loop",
    slug: "event-loop",
    description: "Understanding the JavaScript runtime, Call Stack, and Queues.",
    category: "Advanced",
    order: 12,
    keyConcepts: ["Call Stack", "Web APIs", "Callback Queue", "Microtask Queue"],
    content: `
## The Event Loop

JavaScript is single-threaded, meaning it can only do one thing at a time. The Event Loop is what allows it to perform non-blocking I/O operations (like fetching data) despite this limitation.

### Key Components

1.  **Call Stack**: Where code is executed. LIFO (Last In, First Out).
2.  **Web APIs**: Browser features (setTimeout, DOM events, fetch) that run outside the main thread.
3.  **Callback Queue (Task Queue)**: Holds callbacks from Web APIs (e.g., \`setTimeout\`).
4.  **Microtask Queue**: Holds Promises and \`queueMicrotask\`. Has higher priority than the Callback Queue.
5.  **Event Loop**: Constantly checks if the Call Stack is empty. If it is, it pushes items from the queues to the stack.

### Visualizing the Flow

\`\`\`javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');
\`\`\`

**Output:**
1.  \`Start\` (Synchronous)
2.  \`End\` (Synchronous)
3.  \`Promise\` (Microtask Queue - Higher Priority)
4.  \`Timeout\` (Callback Queue - Lower Priority)

---

## Real-World Usage

### 1. Avoiding Blocking the Main Thread
**Why it matters:** If you run a heavy computation on the main thread, the UI will freeze.

**Scenario:** Processing a large dataset.

\`\`\`javascript
// ❌ BAD: Blocks the UI
const processData = (data) => {
  data.forEach(item => heavyComputation(item));
};

// ✅ GOOD: Yielding to the event loop
const processDataAsync = async (data) => {
  for (const item of data) {
    await new Promise(resolve => setTimeout(resolve, 0)); // Yields
    heavyComputation(item);
  }
};
\`\`\`

### 2. Understanding Render Cycle
**Why it matters:** React state updates and \`useEffect\` rely on the event loop and microtasks. Understanding this helps debug race conditions and "flickering" UI.
`
  },
  {
    id: "data-structures",
    title: "Data Structures",
    slug: "data-structures",
    description: "Arrays, Maps, Sets, and basic algorithms.",
    category: "Computer Science",
    order: 13,
    keyConcepts: ["Arrays vs Sets", "Map vs Object", "Queues", "Stacks"],
    content: `
## Data Structures in JavaScript

### Built-in Structures

#### 1. Arrays
Ordered list. Great for indexed access.
- **Access:** O(1)
- **Search:** O(n)
- **Insert/Delete:** O(n) (shifting elements)

#### 2. Sets
Collection of unique values.
- **Access:** N/A (Iterate)
- **Search (has):** O(1)
- **Insert/Delete:** O(1)

\`\`\`javascript
const uniqueIds = new Set([1, 2, 2, 3]); // {1, 2, 3}
uniqueIds.has(2); // true
\`\`\`

#### 3. Maps
Key-value pairs where keys can be any type. Preserves insertion order.
- **Access/Search:** O(1)

\`\`\`javascript
const cache = new Map();
cache.set(userObj, "metadata");
\`\`\`

### Custom Structures

#### 1. Stack (LIFO)
Last In, First Out. Used for undo/redo, call stacks.
\`\`\`javascript
const stack = [];
stack.push(1); // Push
stack.pop();   // Pop
\`\`\`

#### 2. Queue (FIFO)
First In, First Out. Used for task processing.
\`\`\`javascript
const queue = [];
queue.push(1); // Enqueue
queue.shift(); // Dequeue (O(n) - slow!)
// For real queues, use a Linked List or specific implementation.
\`\`\`

---

## Real-World Usage

### 1. Optimizing Lookups (Array vs Set/Map)
**Why it matters:** Searching an array is O(n). Searching a Set/Map is O(1). For large datasets, this is a massive performance difference.

**Scenario:** Checking if a user ID is selected.

\`\`\`javascript
// ❌ SLOW (O(n))
const isSelected = selectedIds.includes(id);

// ✅ FAST (O(1))
const selectedSet = new Set(selectedIds);
const isSelected = selectedSet.has(id);
\`\`\`

### 2. Caching with Maps
**Why it matters:** Objects only allow string keys. Maps allow objects as keys, which is perfect for associating metadata with DOM nodes or objects without modifying them.

**Scenario:** Storing metadata for DOM elements.

\`\`\`javascript
const domMetadata = new WeakMap(); // WeakMap allows GC
domMetadata.set(element, { clicked: true });
\`\`\`
`
  },
  {
    id: "interview-prep",
    title: "Interview Prep",
    slug: "interview-prep",
    description: "Common questions and concepts for JS interviews.",
    category: "Career",
    order: 14,
    keyConcepts: ["Closures", "Hoisting", "Event Loop", "Promises"],
    content: `
## JavaScript Interview Guide (Questions + Strong Answers + Mini Examples)

### 1) Fundamental JavaScript Concepts

#### Closures

**Interview question:** “What is a closure? Give a real-world example.”
**Answer:** A closure is when a function “remembers” variables from its lexical scope even after that outer function has finished running. It happens because functions carry a reference to the scope where they were created.

\`\`\`js
function makeCounter() {
  let count = 0;              // captured by closure
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
\`\`\`

**Real-world use:** data privacy (encapsulation), function factories, memoization, event handlers retaining state.
**Common pitfall:** closure in loops with \`var\`:

\`\`\`js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3,3,3 (same i)
}
// fix: use let
\`\`\`

---

#### Scope

**Interview question:** “What is scope in JavaScript?”
**Answer:** Scope defines where variables are accessible. JavaScript has:

* **Global scope**
* **Function scope** (\`var\`)
* **Block scope** (\`let\`, \`const\`)
* **Lexical scope**: scope is determined by where code is written, not where it’s called.

\`\`\`js
function f() {
  if (true) {
    let x = 1;
    var y = 2;
  }
  // x is not defined here (block scoped)
  // y is defined here (function scoped)
}
\`\`\`

**Follow-up they love:** “What is hoisting?”
**Answer:** Declarations are moved to the top of their scope. \`var\` is hoisted + initialized to \`undefined\`. \`let/const\` are hoisted but in the **Temporal Dead Zone** until initialized.

---

#### Prototypes and Inheritance

**Interview question:** “What is prototypal inheritance?”
**Answer:** Objects can inherit from other objects via a prototype chain. Property lookup walks up the chain until it finds the property or hits \`null\`.

\`\`\`js
const parent = { greet() { return "hi"; } };
const child = Object.create(parent);

child.greet(); // "hi"
\`\`\`

**How \`class\` works:** JavaScript \`class\` is syntax sugar over prototypes:

\`\`\`js
class A { hello() { return "hello"; } }
const a = new A();
A.prototype.hello === a.hello; // true
\`\`\`

**Common pitfall:** confusing “own properties” vs inherited:

\`\`\`js
child.hasOwnProperty("greet"); // false
\`\`\`

---

#### \`this\` keyword

**Interview question:** “How does \`this\` work in different contexts?”
**Answer:** \`this\` is determined by **how a function is called** (except arrow functions).

Key cases:

1. **Method call:** \`obj.fn()\` → \`this = obj\`
2. **Plain function call:** \`fn()\` → \`this = undefined\` in strict mode (or global object in sloppy mode)
3. **Constructor:** \`new Fn()\` → \`this\` is the new instance
4. **Explicit binding:** \`fn.call(x)\` / \`fn.apply(x)\` / \`fn.bind(x)\` → \`this = x\`
5. **Arrow function:** no own \`this\`; it captures \`this\` from surrounding scope

\`\`\`js
const obj = {
  name: "A",
  regular() { return this.name; },
  arrow: () => this?.name
};

obj.regular(); // "A"
obj.arrow();   // usually undefined (lexical this, not obj)
\`\`\`

---

#### Event Loop

**Interview question:** “Explain the event loop.”
**Answer:** JavaScript runs on a single call stack. Async work is handled by the environment (browser/Node). When the stack is empty, queued tasks are executed. **Microtasks** (Promise callbacks) run before **macrotasks** (timers).

\`\`\`js
console.log("A");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("B");

// A, B, promise, timeout
\`\`\`

---

### 2) Asynchronous JavaScript

#### Callbacks

**Interview question:** “What is a callback?”
**Answer:** A callback is a function passed into another function to be called later (often after an async operation).

\`\`\`js
function doLater(cb) {
  setTimeout(() => cb("done"), 100);
}
doLater(console.log);
\`\`\`

**Pitfall:** “callback hell” from deeply nested callbacks; solved with Promises/async-await.

---

#### Promises

**Interview question:** “What problem do Promises solve? How do they work?”
**Answer:** Promises represent a value that may be available now, later, or never. They help structure async code and avoid nesting. States: pending → fulfilled/rejected. Use \`.then/.catch/.finally\`.

\`\`\`js
fetch("/api")
  .then(res => {
    if (!res.ok) throw new Error("HTTP error " + res.status);
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));
\`\`\`

**Important:** \`fetch\` only rejects on network errors; HTTP 404/500 still resolve unless you check \`res.ok\`.

---

#### Async/Await

**Interview question:** “How does async/await relate to Promises?”
**Answer:** \`async\` functions always return a Promise. \`await\` pauses within the async function until the Promise settles, making async code read like sync code.

\`\`\`js
async function load() {
  const res = await fetch("/api");
  if (!res.ok) throw new Error("Bad response");
  return res.json();
}

load().then(console.log).catch(console.error);
\`\`\`

**Good to mention:** use \`try/catch\` for error handling:

\`\`\`js
async function loadSafe() {
  try {
    const res = await fetch("/api");
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (e) {
    // handle/log/rethrow
    throw e;
  }
}
\`\`\`

---

### 3) ES6 and Beyond

#### Arrow Functions

**Interview question:** “How are arrow functions different from regular functions?”
**Answer:** Arrow functions:

* don’t have their own \`this\`
* don’t have their own \`arguments\`
* can’t be used as constructors (\`new\`)
* often shorter syntax

\`\`\`js
const add = (a, b) => a + b;
\`\`\`

---

#### Destructuring

**Interview question:** “Show array and object destructuring.”
**Answer:** Destructuring extracts values into variables.

\`\`\`js
const user = { id: 7, name: "Sam" };
const { id, name } = user;

const arr = [10, 20, 30];
const [first, , third] = arr;
\`\`\`

**Defaults + renaming:**

\`\`\`js
const { name: fullName = "Unknown" } = {};
\`\`\`

---

#### Spread and Rest

**Interview question:** “What’s the difference between spread and rest?”
**Answer:** Same \`...\` syntax, different meaning:

* **Spread** expands an iterable/object
* **Rest** collects remaining items

\`\`\`js
const a = [1, 2];
const b = [...a, 3]; // spread

function sum(...nums) { // rest
  return nums.reduce((s, n) => s + n, 0);
}
\`\`\`

**Pitfall:** spread is a **shallow** copy.

---

### 4) Data Structures and Algorithms (DSA)

#### Arrays, Lists, Maps, Sets

**Interview question:** “When would you use Map vs Object?”
**Answer:**

* \`Map\`: keys can be any type, preserves insertion order, reliable size, better for frequent add/remove/iterate.
* \`Object\`: good for simple records with string/symbol keys.

\`\`\`js
const m = new Map();
m.set({x:1}, "val"); // valid
\`\`\`

**Set vs Array:**

* \`Set\`: uniqueness + fast membership checks
* \`Array\`: ordered list + rich methods

\`\`\`js
const s = new Set([1,1,2]); // {1,2}
s.has(2); // true
\`\`\`

---

#### LinkedList / Queue / Deque (conceptual)

**Interview answer basics:**

* **Linked list:** nodes point to next (and maybe prev). Great for O(1) insert/remove at head if you have reference; poor cache locality; searching is O(n).
* **Queue:** FIFO (enqueue/dequeue)
* **Deque:** double-ended queue (push/pop both ends)

**Complexity you should say out loud:**

* Array random access: O(1)
* Array insert front: O(n)
* Map/Set average lookup: O(1)
* Linked list search: O(n)

---

#### Problem Solving (what interviewers want)

**They’re scoring:**

1. clarifying questions + constraints
2. correct approach + complexity
3. clean code + edge cases
4. tests / examples

**Mini-template to use aloud:**

* “Let’s restate the problem…”
* “Constraints? input size? duplicates? sorted?”
* “Brute force is … complexity …”
* “Optimized approach: …”
* “Edge cases: empty input, 1 element, negatives, etc.”

---

### 5) Web APIs and DOM Manipulation

#### DOM Manipulation

**Interview question:** “How do you select and update DOM elements?”
**Answer:** Use \`querySelector/querySelectorAll\`, update via \`textContent\`, \`classList\`, attributes, or DOM nodes.

\`\`\`js
const btn = document.querySelector("#save");
btn.textContent = "Saving...";
btn.classList.add("loading");
\`\`\`

**Event handling + delegation (big one):**

\`\`\`js
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("Clicked:", e.target.textContent);
  }
});
\`\`\`

**Why delegation:** fewer listeners, handles dynamically added children.

---

#### Fetch API

**Interview question:** “Fetch data and handle errors.”
**Answer:** Show \`async/await\`, check \`res.ok\`, handle JSON parse, and optionally cancel with \`AbortController\`.

\`\`\`js
async function getUsers() {
  const controller = new AbortController();
  try {
    const res = await fetch("/users", { signal: controller.signal });
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } finally {
    // controller.abort() if you needed cancellation
  }
}
\`\`\`

**React-ish note (if they mention useEffect):** avoid setting state after unmount; use abort or a flag.

---

### 6) Optimization and Performance

#### Memoization

**Interview question:** “What is memoization?”
**Answer:** Caching function results so repeated calls with the same inputs return instantly. Works best for **pure** functions.

\`\`\`js
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const val = fn(...args);
    cache.set(key, val);
    return val;
  };
}
\`\`\`

**Pitfalls:** memory growth, bad keys, non-pure functions, object arguments.

---

#### Rate Limiting: Debounce vs Throttle

**Interview question:** “Debounce vs throttle?”
**Answer:**

* **Debounce:** run after activity stops (search input)
* **Throttle:** run at most once per interval (scroll/resize)

\`\`\`js
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
\`\`\`

---

#### Caching (practical)

**Answer points:** cache expensive computations or network results; add TTL; invalidate on changes. Mention:

* in-memory Map cache
* HTTP caching headers (high-level)
* service worker caching (advanced)

---

#### “Set vs Array” optimization example

**Interview question:** “Why might Set be faster than Array here?”
**Answer:** membership checks:

* \`arr.includes(x)\` is O(n)
* \`set.has(x)\` is ~O(1) average

---

### 7) Interview-Specific Tips (What to *do* in the room)

* **Talk while you solve.** Silence reads like stuck. Narrate tradeoffs.
* **Ask constraints early.** Input size, time/memory limits, environment (browser/node), edge cases.
* **Write small tests.** Even 2–3 examples catches mistakes.
* **Prefer clarity over cleverness.** Readable code wins unless asked to micro-optimize.
* **Know common JS gotchas:** \`==\` vs \`===\`, truthy/falsy, \`NaN\`, floating point quirks, mutation vs immutability, shallow copy, \`this\` binding, \`fetch\` error handling.
* **If you get stuck:** state the brute force, then optimize step-by-step.

---
`
  }
];
