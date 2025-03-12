const {
  registerUser,
  loginUser,
  createEvent,
  getEvents,
  setReminder,
  deleteEvent,
} = require("./src/events.js");
const assert = require("assert");

try {
  assert.strictEqual(
    registerUser("Bilal", "abcd"),
    "User registered successfully"
  );
  assert.strictEqual(loginUser("Bilal", "abcd"), "Login successful");
  assert.strictEqual(
    createEvent(
      "Bilal",
      "Dinner",
      "Family dinner",
      "2025-03-30",
      "20:00",
      "Personal",
      "19:30"
    ),
    "Event created successfully"
  );
  assert.strictEqual(
    setReminder("Bilal", "Dinner", "19:00"),
    "Reminder set successfully"
  );
  assert.strictEqual(
    deleteEvent("Bilal", "Dinner"),
    "Event deleted successfully"
  );

  const eventsByDate = getEvents("Ali", "date");
  assert.strictEqual(eventsByDate[0].name, "Meeting");
  assert.strictEqual(eventsByDate[1].name, "Doctor Appointment");
  assert.strictEqual(eventsByDate[2].name, "Birthday");

  const eventsByCategory = getEvents("Ali", "category");
  assert.strictEqual(eventsByCategory[0].category, "Appointment");
  assert.strictEqual(eventsByCategory[1].category, "Birthday");
  assert.strictEqual(eventsByCategory[2].category, "Meeting");

  const reminderEvents = getEvents("Ali", "reminder");
  assert.strictEqual(reminderEvents.length, 2);
  assert.strictEqual(reminderEvents[0].name, "Meeting");
  assert.strictEqual(reminderEvents[1].name, "Doctor Appointment");

  console.log("All tests passed successfully!");
} catch (error) {
  console.error("Test failed:", error.message);
}
