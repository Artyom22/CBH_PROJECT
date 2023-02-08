# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The original version has a lot of `if/else` statements, some of which are nested. It is hard to understand what is happening in the code with these because I would need to keep the conditions in mind when reading the code. So my goal was to reduce the `if/else` statements. First, I tried to use early exits, so I would not need to keep the condition that exited in mind when reading the rest of the code, and it is easier to understand the cases when we return from the function. Second I tried to break the original function into multiple small functions to isolate the logic for different blocks. This allows me to reuse some code and keep the `DRY` principle. Each function is easy to understand alone, and in the original function, we have less code. When we reach the parts where we use the new functions, their names describe at a high level what they do, making the code more understandable.