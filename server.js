const { app, start } = require("./src/routes/routes");

const port = process.env.PORT || 3000;
start();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
