import Router from "express";

const router = Router();

router.all("*", (req, res, next) => {
  console.log(`Request made to: ${req.headers.host}${req.originalUrl} `);
  console.log(`Request made from: ${req.ip} `);
  console.log(`Request made with: ${req.method} `);
  console.log("=====================================");
  console.log(`Request Body: ${JSON.stringify(req.body)} `);
  console.log(`Request Params: ${JSON.stringify(req.params)} `);
  console.log(`Request Query: ${JSON.stringify(req.query)} `);
  console.log(`=====================================`);
  next();
});

export default router;
