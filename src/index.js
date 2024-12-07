const express = require ('express');
const app = express();

const routes = require('./routes');
const port = 12345;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server rodando na porta: ${port}`);
});