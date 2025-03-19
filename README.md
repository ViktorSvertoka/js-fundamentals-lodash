# lodash

## Task Description:

You are developing a user management system for a web application. You need to write functions that will perform specific operations on a list of users. Use the **Lodash** library to implement these functions. Write all your code in [index.mjs](./index.mjs) and do not delete any exported function.

## Conditions:

You have an array of users. Each user is an object with the following properties:

- id (unique identifier of the user)
- name (name of the user)
- age (age of the user)
- active (status of the user's activity)

```js
let users = [
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 30, active: false },
  { id: 3, name: "Charlie", age: 35, active: true },
  { id: 4, name: "David", age: 40, active: false },
];
```

## Implement the following functions:

`getActiveUsers(users)`: Returns an array of active users.
`getSortedUsersByAge(users)`: Returns an array of users sorted by age in ascending order.
`getUserNames(users)`: Returns an array of all users' names.
`getUserById(users, id)`: Returns the user object by the given id. If the user is not found, returns `null`.
`addUser(users, newUser)`: Adds a new user to the array of users. Returns the updated array of users.
`removeUserById(users, id)`: Removes the user by the given id. Returns the updated array of users.

## Additional Task:

Add a function `updateUser(users, updatedUser)` that updates the information of a user by their id. If the user is not found, the array of users remains unchanged.

## For tests:

Run `npm i` and `npm test`.
