import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  let tmp = "hello";
  return res.send(tmp);
});

router.post("/", (req, res) => {
  let tmp = new req.context.models.schedule({
    DateChange: req.body.DateChange,
    employeeId: req.body.employeeId,
  });
  tmp
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

export default router;
