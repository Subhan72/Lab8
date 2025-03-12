const events = require("../data/events.json");
const users = require("../data/users.json");

function registerUser(username, password) {
  if (users.some((user) => user.username === username)) {
    throw new Error("User already exists");
  }
  users.push({ username, password });
  return "User registered successfully";
}

function loginUser(username, password) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    throw new Error("Invalid credentials");
  }
  return "Login successful";
}

function createEvent(
  username,
  name,
  description,
  date,
  time,
  category,
  reminder
) {
  events.push({ username, name, description, date, time, category, reminder });
  return "Event created successfully";
}

function getEvents(username, filter = null) {
  let userEvents = events.filter((event) => event.username === username);
  if (filter) {
    if (filter === "date") {
      userEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (filter === "category") {
      userEvents.sort((a, b) => a.category.localeCompare(b.category));
    } else if (filter === "reminder") {
      userEvents = userEvents.filter((event) => event.reminder !== null);
    }
  }
  return userEvents;
}

function setReminder(username, eventName, reminderTime) {
  const event = events.find(
    (event) => event.username === username && event.name === eventName
  );
  if (!event) {
    throw new Error("Event not found");
  }
  event.reminder = reminderTime;
  return "Reminder set successfully";
}

function deleteEvent(username, eventName) {
  const index = events.findIndex(
    (event) => event.username === username && event.name === eventName
  );
  if (index === -1) {
    throw new Error("Event not found");
  }
  events.splice(index, 1);
  return "Event deleted successfully";
}

module.exports = {
  registerUser,
  loginUser,
  createEvent,
  getEvents,
  setReminder,
  deleteEvent,
};
