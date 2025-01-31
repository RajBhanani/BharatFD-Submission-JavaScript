import { app } from "./app.js";
import connectDB from "./db/db.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`⚙️  Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error, couldn't start the server", error);
  });
