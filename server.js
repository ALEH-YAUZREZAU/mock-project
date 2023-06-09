const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Загрузите ключ и сертификат
const sslOptions = {
  key: fs.readFileSync("./ssl/localhost-key.pem"),
  cert: fs.readFileSync("./ssl/localhost.pem"),
};

app.prepare().then(() => {
  createServer(sslOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on https://localhost:3000");
  });
});
