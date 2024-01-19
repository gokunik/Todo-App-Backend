import "dotenv/config";
import { connectDatabase } from "./DB/index.js";
import { app } from "./app.js";
import { GlobalErrorCaputre } from "./Middleware/index.js";

const port = process.env.PORT;

app.use(GlobalErrorCaputre);

// TODO - also implment logs for any error that take places
app.on("error", (error) => {
  console.log("unhanled error: ", error);
  process.exit(1);
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log("Server listing on port: ", port);
    });
  })
  .catch((error) => {
    console.log("Error occurred while starting the app: ", error.message);
  });
