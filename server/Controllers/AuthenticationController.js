const Schema = require("../Models/AuthenticationModel.js");



async function SigUp(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const isUserExist = await Schema.findOne({ email: email });

    if (isUserExist) { 
      // Return an error if the user already exists
      return res.status(200).json({ AlreadyExist: "Account already exists" });
    }

    // Validate the request body
    if (!name || !email || !password) {
      // Return an error if any of the fields are empty
      return res.status(200).json({ EnterAllDetails: "Please fill all the fields" });
    }

    // Create a new user
    const data = new Schema({
      name,
      email,
      password,
    });

    // Save the user and return the created user
    const d = await data.save();
    return res.json(d);
  } catch (error) {
    // Log any errors
    console.log(error);
  }
}


async function Login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user has filled all the fields
    if (!email || !password) {
      return res.status(200).json({ EnterAllDetails: "Please fill all the fields" });
    }

    // Check if the user exists
    const isUserExist = await Schema.findOne({ email: email });
    if (!isUserExist) {
      return res.status(200).json({ NotExist: "User does not exist" });
    }

    // Check if the passwords match
    if (password !== isUserExist.password) {
      return res.status(200).json({ Incorrect: "Incorrect password" });
    }

    // Return the user data if the login is successful
    return res.json(isUserExist);
  } catch (error) { 
    // Log any errors
    console.log(error);
  }
}



module.exports = {
  SigUp,
  Login
};
