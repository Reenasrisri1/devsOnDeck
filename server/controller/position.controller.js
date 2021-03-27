const Position = require('../model/position.model');
const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

const sleep = require('util').promisify(setTimeout);

module.exports = {
  getAllAvailableMatchDevs: (req, res) => {
 
    Position.findById(req.params.id)
      .then((position) => {
        User.find({
          isOrg: { $ne: true },
          $or: [
            { language: { $in: position.skills } },
            { framework: { $in: position.skills } },
          ],
        })
          .then((allDevs) => {
            const uniquePositionSkills = [...new Set(position.skills)];
            console.log(allDevs);
            let allAvailableDevs = [];
            for (let i = 0; i < allDevs.length; i++) {
              let allAvailableDevsObj = {};
              let devskills = [];
              devskills.push(...allDevs[i].language);
              devskills.push(...allDevs[i].framework);
              let uniqueDevSkills = [...new Set(devskills)];
              const matchedSkill = uniquePositionSkills.filter((element) => uniqueDevSkills.includes(element));
              const matchCount = matchedSkill.length;
              const totalCount = uniquePositionSkills.length;
              const percentMatch = Math.round((100 * matchCount) / totalCount);
              if (percentMatch > 0) {
                allAvailableDevsObj.name = `${allDevs[i].firstName} ${allDevs[i].lastName}`;
                allAvailableDevsObj.bio = allDevs[i].bio;
                allAvailableDevsObj.skills = matchedSkill;
                allAvailableDevsObj.percentMatch = percentMatch;
                allAvailableDevs.push(allAvailableDevsObj);
              }// end if
            }//end for
            res.json(allAvailableDevs);
          })
          .catch((err) => {
            console.log(`error in findAllDevs:${err}`);
            res.json(err);
          });
      })
      .catch((err) => {
        console.log(`error in find positioon:${err}`);
        res.json(err);
      });
  },
  getAllAvailableDevs2: async (req, res) => {
    try {
      const allDevs = await User.find({ isOrg: { $ne: true } });
      console.log('allDevs');
      console.log(allDevs);
      const position = await Position.findById(req.params.id);
      console.log('position');
      console.log(position);
      const uniquePositionSkills = [...new Set(position.skills)];
      let allAvailableDevs = [];
      for (let i = 0; i < allDevs.length; i++) {
        let devskills = [];
        let allAvailableDevsObj = {};
        devskills.push(...allDevs[i].language);
        devskills.push(...allDevs[i].framework);
        let uniqueDevSkills = [...new Set(devskills)];
        const matchedSkill = uniquePositionSkills.filter((element) =>
          uniqueDevSkills.includes(element)
        );
        const matchCount = matchedSkill.length;
        const totalCount = uniquePositionSkills.length;
        const percentMatch = Math.round((100 * matchCount) / totalCount);
        if (percentMatch > 0) {
          allAvailableDevsObj.name = `${allDevs[i].firstName} ${allDevs[i].lastName}`;
          allAvailableDevsObj.bio = allDevs[i].bio;
          allAvailableDevsObj.skills = matchedSkill;
          allAvailableDevsObj.percentMatch = percentMatch;
          allAvailableDevs.push(allAvailableDevsObj);
        }
      }//end for 
      res.json(allAvailableDevs);
    } catch (err) {
      console.log(`error:${err}`);
      res.json(err);
    }
  },
  getAllPosition: (req, res) => {
    Position.find()
      .sort({ type: 'descending' })
      .then((allPositions) => {
        console.log(allPositions);
        res.json(allPositions);
      })
      .catch((err) => {
        console.log(`error in getAll:${err}`);
        res.json(err);
      });
  },

  createPosition: (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
    if (
      decodedJWT.payload.isOrg === true &&
      decodedJWT.payload._id === req.body.org_id
    ) {
      console.log(req.body);
      Position.create(req.body)
        .then((newPosition) => {
          console.log(newPosition);
          res.json(newPosition);
        })
        .catch((err) => {
          console.log(`error in create:${err}`);
          res.json(err);
        });
    } else {
      res.json({ msg: 'You must be an organisation to create a position' });
    }
  },

  getOne: (req, res) => {
    console.log(req.params.id);
    Position.findById(req.params.id)
      .then((onePosition) => {
        console.log(`onePosition: ${onePosition}`);
        res.json(onePosition);
      })
      .catch((err) => {
        console.log(`error in getOne:${err}`);
        res.json(err);
      });
  },

  update: (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    Position.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((udatedPosition) => {
        console.log(udatedPosition);
        res.json(udatedPosition);
      })
      .catch((err) => {
        console.log(`error in update:${err}`);
        res.json(err);
      });
  },

  delete: (req, res) => {
    console.log(req.params.id);
    Position.findByIdAndRemove(req.params.id)
      .then((removedPosition) => {
        console.log(removedPosition);
        res.json(removedPosition);
      })
      .catch((err) => {
        console.log(`error in delete:${err}`);
        res.json(err);
      });
  },
};