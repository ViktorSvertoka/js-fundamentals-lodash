import {
  addUser,
  getActiveUsers,
  getSortedUsersByAge,
  getUserById,
  getUserNames,
  removeUserById,
  updateUser,
} from "./index.js";

const users = [
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 30, active: false },
  { id: 3, name: "Charlie", age: 35, active: true },
  { id: 4, name: "David", age: 40, active: false },
];

describe("getActiveUsers", () => {
  test("getActiveUsers does not change the initial array", () => {
    getActiveUsers(users);
    expect(users).toEqual([
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 2, name: "Bob", age: 30, active: false },
      { id: 3, name: "Charlie", age: 35, active: true },
      { id: 4, name: "David", age: 40, active: false },
    ]);
  });
  test("getActiveUsers return only active users", () => {
    expect(getActiveUsers(users).length).toBe(2);
    expect(getActiveUsers(users)[0]).toEqual({
      id: 1,
      name: "Alice",
      age: 25,
      active: true,
    });
    expect(getActiveUsers(users)[1]).toEqual({
      id: 3,
      name: "Charlie",
      age: 35,
      active: true,
    });
  });
  test("getActiveUsers works correctly with empty array", () => {
    expect(getActiveUsers([]).length).toBe(0);
  });
  test("getActiveUsers returns an empty array when all users are inactive", () => {
    expect(
      getActiveUsers([
        { id: 1, name: "Alice", age: 25, active: false },
        { id: 2, name: "Bob", age: 30, active: false },
        { id: 3, name: "Charlie", age: 35, active: false },
        { id: 4, name: "David", age: 40, active: false },
      ]).length
    ).toBe(0);
  });
});

describe("getSortedUsersByAge", () => {
  test("getSortedUsersByAge does not change the initial array", () => {
    getSortedUsersByAge(users);
    expect(users).toEqual([
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 2, name: "Bob", age: 30, active: false },
      { id: 3, name: "Charlie", age: 35, active: true },
      { id: 4, name: "David", age: 40, active: false },
    ]);
  });
  test("getSortedUsersByAge returns users sorted by age in ascending order", () => {
    expect(getSortedUsersByAge(users)).toEqual([
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 2, name: "Bob", age: 30, active: false },
      { id: 3, name: "Charlie", age: 35, active: true },
      { id: 4, name: "David", age: 40, active: false },
    ]);
  });

  test("getSortedUsersByAge works correctly with an empty array", () => {
    expect(getSortedUsersByAge([])).toEqual([]);
  });

  test("getSortedUsersByAge returns a single user array unchanged", () => {
    expect(
      getSortedUsersByAge([{ id: 5, name: "Eve", age: 28, active: true }])
    ).toEqual([{ id: 5, name: "Eve", age: 28, active: true }]);
  });

  test("getSortedUsersByAge works correctly with unsorted users", () => {
    const unsortedUsers = [
      { id: 3, name: "Charlie", age: 35, active: true },
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 4, name: "David", age: 40, active: false },
      { id: 2, name: "Bob", age: 30, active: false },
    ];
    expect(getSortedUsersByAge(unsortedUsers)).toEqual([
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 2, name: "Bob", age: 30, active: false },
      { id: 3, name: "Charlie", age: 35, active: true },
      { id: 4, name: "David", age: 40, active: false },
    ]);
  });

  test("getSortedUsersByAge works correctly with users having the same age", () => {
    const sameAgeUsers = [
      { id: 1, name: "Alice", age: 30, active: true },
      { id: 2, name: "Bob", age: 30, active: false },
      { id: 3, name: "Charlie", age: 30, active: true },
    ];
    expect(getSortedUsersByAge(sameAgeUsers)).toEqual([
      { id: 1, name: "Alice", age: 30, active: true },
      { id: 2, name: "Bob", age: 30, active: false },
      { id: 3, name: "Charlie", age: 30, active: true },
    ]);
  });
});

describe("getUserNames", () => {
  test("getUserNames returns an array of user names", () => {
    expect(getUserNames(users)).toEqual(["Alice", "Bob", "Charlie", "David"]);
  });

  test("getUserNames works correctly with an empty array", () => {
    expect(getUserNames([])).toEqual([]);
  });

  test("getUserNames works with a single user", () => {
    expect(
      getUserNames([{ id: 5, name: "Eve", age: 28, active: true }])
    ).toEqual(["Eve"]);
  });

  test("getUserNames works with users having duplicate names", () => {
    const duplicateNamesUsers = [
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 2, name: "Alice", age: 30, active: false },
      { id: 3, name: "Bob", age: 35, active: true },
    ];
    expect(getUserNames(duplicateNamesUsers)).toEqual([
      "Alice",
      "Alice",
      "Bob",
    ]);
  });

  test("getUserNames handles users without the 'name' property gracefully", () => {
    const usersWithMissingNames = [
      { id: 1, age: 25, active: true },
      { id: 2, name: "Bob", age: 30, active: false },
      { id: 3, name: "Charlie", age: 35, active: true },
    ];
    expect(getUserNames(usersWithMissingNames)).toEqual([
      undefined,
      "Bob",
      "Charlie",
    ]);
  });
});

describe("getUserById", () => {
  test("getUserById returns the correct user by ID", () => {
    expect(getUserById(users, 2)).toEqual({
      id: 2,
      name: "Bob",
      age: 30,
      active: false,
    });
    expect(getUserById(users, 4)).toEqual({
      id: 4,
      name: "David",
      age: 40,
      active: false,
    });
  });

  test("getUserById returns null if user is not found", () => {
    expect(getUserById(users, 99)).toBeNull();
  });

  test("getUserById works correctly with an empty array", () => {
    expect(getUserById([], 1)).toBeNull();
  });

  test("getUserById handles users with duplicate IDs", () => {
    const duplicateUsers = [
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 1, name: "Another Alice", age: 30, active: false },
    ];
    expect(getUserById(duplicateUsers, 1)).toEqual({
      id: 1,
      name: "Alice",
      age: 25,
      active: true,
    });
  });

  test("getUserById handles non-numeric IDs", () => {
    const mixedUsers = [
      { id: "a1", name: "Alice", age: 25, active: true },
      { id: "b2", name: "Bob", age: 30, active: false },
    ];
    expect(getUserById(mixedUsers, "b2")).toEqual({
      id: "b2",
      name: "Bob",
      age: 30,
      active: false,
    });
    expect(getUserById(mixedUsers, "x9")).toBeNull();
  });

  test("getUserById returns null when ID is undefined", () => {
    expect(getUserById(users, undefined)).toBeNull();
  });

  test("getUserById returns null when ID is null", () => {
    expect(getUserById(users, null)).toBeNull();
  });
});

const initialUsers = [
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 30, active: false },
];

describe("addUser", () => {
  test("addUser should add a new user to the array", () => {
    const newUser = { id: 3, name: "Charlie", age: 35, active: true };
    const updatedUsers = addUser(initialUsers, newUser);

    expect(updatedUsers).toContainEqual(newUser);
    expect(updatedUsers.length).toBe(3);
  });

  test("addUser should not modify the original array", () => {
    const newUser = { id: 3, name: "Charlie", age: 35, active: true };
    const updatedUsers = addUser(initialUsers, newUser);
    expect(initialUsers.length).toBe(2);
    expect(updatedUsers.length).toBe(3);
  });

  test("addUser should handle adding multiple users", () => {
    const newUsers = [
      { id: 3, name: "Charlie", age: 35, active: true },
      { id: 4, name: "David", age: 40, active: false },
    ];
    const updatedUsers = addUser(initialUsers, newUsers);

    expect(updatedUsers.length).toBe(4);
    expect(updatedUsers).toContainEqual(newUsers[0]);
    expect(updatedUsers).toContainEqual(newUsers[1]);
  });

  test("addUser should return a new array when empty array is passed", () => {
    const newUser = { id: 1, name: "Alice", age: 25, active: true };
    const updatedUsers = addUser([], newUser);

    expect(updatedUsers).toEqual([newUser]);
  });

  test("addUser should handle empty newUser input", () => {
    const updatedUsers = addUser(initialUsers, null);

    expect(updatedUsers.length).toBe(3);
    expect(updatedUsers).toContain(null);
  });

  test("addUser should handle undefined newUser input", () => {
    const updatedUsers = addUser(initialUsers, undefined);

    expect(updatedUsers.length).toBe(3);
    expect(updatedUsers).toContain(undefined);
  });
});

describe("removeUserById", () => {
  let users;

  beforeEach(() => {
    users = [
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 2, name: "Bob", age: 30, active: false },
      { id: 3, name: "Charlie", age: 35, active: true },
      { id: 4, name: "David", age: 40, active: false },
    ];
  });

  test("removeUserById should remove the user with the specified ID", () => {
    const updatedUsers = removeUserById(users, 2);
    expect(updatedUsers).toEqual([
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 3, name: "Charlie", age: 35, active: true },
      { id: 4, name: "David", age: 40, active: false },
    ]);
  });

  test("removeUserById should not modify the array if the ID does not exist", () => {
    const updatedUsers = removeUserById(users, 99);
    expect(updatedUsers).toEqual(users);
  });

  test("removeUserById should return an empty array if the only user is removed", () => {
    const singleUser = [{ id: 1, name: "Alice", age: 25, active: true }];
    const updatedUsers = removeUserById(singleUser, 1);
    expect(updatedUsers).toEqual([]);
  });

  test("removeUserById should handle an empty users array", () => {
    const updatedUsers = removeUserById([], 1);
    expect(updatedUsers).toEqual([]);
  });

  test("removeUserById should remove only the first occurrence of duplicate IDs", () => {
    const duplicateUsers = [
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 1, name: "Another Alice", age: 30, active: false },
      { id: 2, name: "Bob", age: 30, active: false },
    ];
    const updatedUsers = removeUserById(duplicateUsers, 1);
    expect(updatedUsers).toEqual([
      { id: 2, name: "Bob", age: 30, active: false },
    ]);
  });

  test("removeUserById should not remove users if ID is null or undefined", () => {
    expect(removeUserById(users, null)).toEqual(users);
    expect(removeUserById(users, undefined)).toEqual(users);
  });

  test("removeUserById should remove multiple users with the same ID", () => {
    const duplicateUsers = [
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 2, name: "Bob", age: 30, active: false },
      { id: 2, name: "Another Bob", age: 35, active: true },
    ];
    const updatedUsers = removeUserById(duplicateUsers, 2);
    expect(updatedUsers).toEqual([
      { id: 1, name: "Alice", age: 25, active: true },
    ]);
  });
});

describe("updateUser", () => {
  let users;

  beforeEach(() => {
    users = [
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 2, name: "Bob", age: 30, active: false },
      { id: 3, name: "Charlie", age: 35, active: true },
    ];
  });

  test("updateUser should update the user with the given ID", () => {
    const updatedUser = { id: 2, name: "Bobby", age: 31, active: true };
    const updatedUsers = updateUser(users, updatedUser);

    expect(updatedUsers).toEqual([
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 2, name: "Bobby", age: 31, active: true },
      { id: 3, name: "Charlie", age: 35, active: true },
    ]);
  });

  test("updateUser should not modify the array if the user ID is not found", () => {
    const updatedUser = { id: 99, name: "Eve", age: 40, active: false };
    const updatedUsers = updateUser(users, updatedUser);

    expect(updatedUsers).toEqual(users);
  });

  test("updateUser should return an empty array when the input is an empty array", () => {
    const updatedUsers = updateUser([], {
      id: 1,
      name: "Alice",
      age: 26,
      active: true,
    });
    expect(updatedUsers).toEqual([]);
  });

  test("updateUser should handle partial updates correctly", () => {
    const updatedUser = { id: 1, age: 26 };
    const updatedUsers = updateUser(users, updatedUser);

    expect(updatedUsers).toEqual([
      { id: 1, name: "Alice", age: 26, active: true },
      { id: 2, name: "Bob", age: 30, active: false },
      { id: 3, name: "Charlie", age: 35, active: true },
    ]);
  });

  test("updateUser should handle updating active status", () => {
    const updatedUser = { id: 3, active: false };
    const updatedUsers = updateUser(users, updatedUser);

    expect(updatedUsers).toEqual([
      { id: 1, name: "Alice", age: 25, active: true },
      { id: 2, name: "Bob", age: 30, active: false },
      { id: 3, name: "Charlie", age: 35, active: false },
    ]);
  });

  test("updateUser should return null if the input array is null", () => {
    expect(
      updateUser(null, { id: 1, name: "Alice", age: 26, active: true })
    ).toBeNull();
  });

  test("updateUser should return users array unchanged if updatedUser is null", () => {
    const updatedUsers = updateUser(users, null);
    expect(updatedUsers).toEqual(users);
  });

  test("updateUser should not update anything if updatedUser has no ID", () => {
    const updatedUser = { name: "Anonymous", age: 50 };
    const updatedUsers = updateUser(users, updatedUser);

    expect(updatedUsers).toEqual(users);
  });

  test("updateUser should handle undefined users gracefully", () => {
    expect(updateUser(undefined, { id: 1, name: "Alice" })).toBeNull();
  });
});
