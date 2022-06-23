# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. Updated `package.json` to include `crypto` as dependency since it was missing. It is required in the `dpk.js` file.

2. Added `"main": "index.js",` in package.json , to denote main file of the source code, since it was blank.

3. Moved TRIVIAL_PARTITION_KEY,MAX_PARTITION_KEY_LENGTH outside of deterministicPartitionKey since these variables are global constants in `dpk.js`.

4. Created two new consts - HASH_ALGORITHM, ENCODING in `dpk.js`. This will help in following DRY principle.

5. Updated the exports syntax to be more readable and converted fat arrow function to readable standard js function in `dpk.js`.

6. Added comments in `dpk.js`  to make the function more understandable.