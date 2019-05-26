import { Router } from "express";
const router = Router();
const passport = require("passport");

//@route POST client/addClient
//@desc add client
//@access Private
router.post(
  "/addClient",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.client
      .findOne({
        where: {
          Phone: req.body.Phone,
        },
        include: [
          {
            model: req.context.models.clientPet,
            include: [
              {
                model: req.context.models.pet,
              },
            ],
          },
        ],
      })
      .then(client => {
        if (client) {
          req.context.models.pet
            .findOne({ where: { PassportCode: req.body.PassportCode } })
            .then(pet => {
              if (pet) {
                res.status(500).send("Клиент и животное уже есть в базе");
                console.log(`
           #################################
           Клиент и животное уже есть в базе
           №№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№
          `);
              } else {
                return Promise.all([
                  req.context.models.client
                    .findOne({
                      where: {
                        Phone: req.body.Phone,
                      },
                    })
                    .then(client => {
                      if (client) {
                        return client;
                      } else {
                        return req.context.models.client.create({
                          FirstName: req.body.FirstName,
                          LastName: req.body.LastName,
                          Phone: req.body.Phone,
                          Birthday: req.body.Birthday,
                        });
                      }
                    }),
                  req.context.models.pet
                    .findOne({
                      where: { PassportCode: req.body.PassportCode },
                    })
                    .then(pet => {
                      if (pet) {
                        return pet;
                      } else {
                        return req.context.models.pet.create({
                          NamePet: req.body.NamePet,
                          KindOfPet: req.body.KindOfPet,
                          PassportCode: req.body.PassportCode,
                        });
                      }
                    }),
                ]).then(result => {
                  req.context.models.clientPet.create({
                    clientId: result[0].id,
                    petId: result[1].id,
                  });
                });
              }
            });
        } else {
          return Promise.all([
            req.context.models.client
              .findOne({
                where: {
                  Phone: req.body.Phone,
                },
              })
              .then(client => {
                if (client) {
                  return client;
                } else {
                  return req.context.models.client.create({
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    Phone: req.body.Phone,
                    Birthday: req.body.Birthday,
                  });
                }
              }),
            req.context.models.pet
              .findOne({
                where: { PassportCode: req.body.PassportCode },
              })
              .then(pet => {
                if (pet) {
                  return pet;
                } else {
                  return req.context.models.pet.create({
                    NamePet: req.body.NamePet,
                    KindOfPet: req.body.KindOfPet,
                    PassportCode: req.body.PassportCode,
                  });
                }
              }),
          ]).then(result => {
            req.context.models.clientPet.create({
              clientId: result[0].id,
              petId: result[1].id,
            });
          });
        }
      });
  }
);

//@route GET client/allClients
//@desc get clients
//@access Private
router.get(
  "/allClients",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    req.context.models.client
      .findAll({
        include: [
          {
            model: req.context.models.clientPet,
            include: [{ model: req.context.models.pet }],
          },
        ],
      })
      .then(projects => {
        const forSend = [];
        const sendData = projects.map((item, i) => {
          let currentPet = item.client_pets.map(item2 => {
            return forSend.push({
              id: item.id,
              FirstName: item.FirstName,
              LastName: item.LastName,
              Phone: item.Phone,
              Birthday: item.Birthday,
              NamePet: item2.pet.NamePet,
              PassportCode: item2.pet.PassportCode,
              KindOfPet: item2.pet.KindOfPet,
            });
          });
          return currentPet;
        });
        return res.send(forSend);
      });
  }
);

//@route DELETE client/allClients/:id
//@desc Return allClients and delete one
//@access Private
router.delete(
  "/allClients/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.client
      .destroy({ where: { id: req.params.id } })
      .then(client => {
        console.log(`Клетка удалена? 1 means yes, 0 means no: ${client}`);
        return req.context.models.client
          .findAll({
            include: [
              {
                model: req.context.models.clientPet,
                include: [{ model: req.context.models.pet }],
              },
            ],
          })
          .then(projects => {
            const forSend = [];
            const sendData = projects.map((item, i) => {
              let currentPet = item.client_pets.map(item2 => {
                return forSend.push({
                  id: item.id,
                  FirstName: item.FirstName,
                  LastName: item.LastName,
                  Phone: item.Phone,
                  Birthday: item.Birthday,
                  NamePet: item2.pet.NamePet,
                  PassportCode: item2.pet.PassportCode,
                  KindOfPet: item2.pet.KindOfPet,
                });
              });
              return currentPet;
            });
            return res.send(forSend);
          });
      });
  }
);

//@route UPDATE client/allClients/:id
//@desc Return allSchedules and update one
//@access Private
router.put(
  "/allClients/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.client
      .findOne({
        where: { id: req.params.id },
      })
      .then(client => {
        client
          .update({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
          })
          .then(() => {
            return req.context.models.client
              .findAll({
                include: [
                  {
                    model: req.context.models.clientPet,
                    include: [{ model: req.context.models.pet }],
                  },
                ],
              })
              .then(projects => {
                const forSend = [];
                const sendData = projects.map((item, i) => {
                  let currentPet = item.client_pets.map(item2 => {
                    return forSend.push({
                      id: item.id,
                      FirstName: item.FirstName,
                      LastName: item.LastName,
                      Phone: item.Phone,
                      Birthday: item.Birthday,
                      NamePet: item2.pet.NamePet,
                      PassportCode: item2.pet.PassportCode,
                      KindOfPet: item2.pet.KindOfPet,
                    });
                  });
                  return currentPet;
                });
                return res.send(forSend);
              });
          });
      });
  }
);

export default router;
