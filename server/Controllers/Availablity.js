const Schema = require('../Models/AuthenticationModel'); // Adjust the path as needed

async function Availability(req, res) {
  try {
    const userId = req.params.userId; // Extract userId from URL params

    if (!userId) {
      return res.status(200).json({ userNotExist: 'User ID is required' });
    }

    const { start, end, allDay } = req.body; // Extract start, end, and allDay from request body

    // Find the user by ID
    const user = await Schema.findById(userId);
    if (!user) {
      return res.status(200).json({ userNotExist: 'User not found' });
    }

    // Add the new availability slot
    if (allDay) {
      const allDayDate = new Date(allDay);
      // Strip time part from allDayDate
      allDayDate.setHours(0, 0, 0, 0);
      user.timeSlots.push({
        allDay: allDayDate
      });
    } else if (start && end) {
      const startDate = new Date(start); // Convert to Date object
      const endDate = new Date(end); // Convert to Date object

      if (endDate <= startDate) {
        return res.status(200).json({ errorDate: 'End date must be after start date' });
      }

      user.timeSlots.push({
        start: startDate,
        end: endDate
      });
    } else {
      return res.status(400).json({ error: 'Invalid input: Either provide both start and end dates or allDay' });
    }

    await user.save(); // Save changes to the database
    return res.status(200).json({ success: true, message: 'Availability updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports = { Availability };
