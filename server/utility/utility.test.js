const { sortNames } = require("../utility/utility");

test("sort", () => {
  const users = [
    {
      id: 1,
      name: "Robert",
      email: "rob23@gmail.com",
      password: "1234567",
      role: "admin",
    },
    {
      id: 2,
      name: "Alex",
      email: "lucyb56@gmail.com",
      password: "1234567",
      role: "employee",
    },
  ];

  const sortedUsers = [
    {
      id: 2,
      name: "Alex",
      email: "lucyb56@gmail.com",
      password: "1234567",
      role: "employee",
    },
    {
      id: 1,
      name: "Robert",
      email: "rob23@gmail.com",
      password: "1234567",
      role: "admin",
    },
  ];

  expect(users.sort(sortNames)).toStrictEqual(sortedUsers);
});
