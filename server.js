import app from "./src/App.js";
import config from "./src/config/index.js";
import colors from "colors";
import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log(`Connected to MongoDB database Successfully`.bgBlack.magenta);
    // handle error while express communicates with database
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });
    const PORT = config.PORT;

    app.listen(PORT, () => {
      console.log(`App is ap and running on PORT: ${PORT}`.bgBlack.blue);
    });
  } catch (error) {
    console.log(`Error is connecting with Database ${error}`.bgRed.white);
  }
})();
