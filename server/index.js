const path = require("path");
const cors = require("cors");
const express = require("express");
const router = require("express-promise-router")();
const application = express();
const port = process.env.PORT || 8080;

application.set("etag", "strong");

application.use(express.static(path.join(__dirname, "build")));

application.get("/app*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

application.use(express.urlencoded({ extended: true }));
application.use(express.json());
application.use(express.json({ type: "application/vnd.api+json" }));
application.use(cors());

router.get("/api", (req, res) => {
  res.status(200).send({ code: 200, message: "API rodando!" });
});

router.get("/api/fibonacci", (req, res) => {
  const start = performance.now();
  const n = req.query.number;

  if (!n || parseInt(n, 10) <= 0) {
    res
      .status(400)
      .send({ code: 400, message: "Número deve ser maior que zero!" });
  } else {
    let a = 0;
    let b = 1;
    let c;
    for (let i = 2; i <= parseInt(n, 10); i++) {
      c = a + b;
      a = b;
      b = c;
    }
    const end = performance.now();
    res
      .status(200)
      .send({ code: 200, message: `O resultado é ${b}`, time: end - start });
  }
});

router.get("/api/factorial", (req, res) => {
  const start = performance.now();
  const n = req.query.number;

  if (!n || parseInt(n, 10) <= 0) {
    res
      .status(400)
      .send({ code: 400, message: "Número deve ser maior que zero!" });
  } else if (parseInt(n, 10) === 1) {
    res.status(200).send({ code: 200, message: `O resultado é 1` });
  } else {
    function factorial(num) {
      let answer = 1;
      if (num === 0 || num === 1) {
        return answer;
      } else if (num > 1) {
        for (let i = num; i >= 1; i--) {
          answer = answer * i;
        }
        return answer;
      }
    }
    const result = factorial(n);
    const end = performance.now();
    res
      .status(200)
      .send({
        code: 200,
        message: `O resultado é ${result}`,
        time: end - start,
      });
  }
});

application.use(router);

application.listen(port, () => {
  console.log("Aplicação executando na porta", port);
});
