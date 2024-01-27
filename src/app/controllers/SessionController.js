import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        throw new Error('Make sure your password or email are correct');
      }

      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw new Error('Make sure your password or email are correct');
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Make sure your password or email are correct' });
      }

      // if (!(await user.checkPassword(password))) {
      //   throw new Error('Make sure your password or email are correct');
      // }

      return res.json({
        id: user.id,
        email,
        name: user.name,
        admin: user.admin,
        token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
  }
}

export default new SessionController();

// import * as Yup from 'yup';
// import jwt from 'jsonwebtoken';
// import authConfig from '../../config/auth';
// import User from '../models/User';

// class SessionController {
//   async store(req, res) {
//     try {
//       const schema = Yup.object().shape({
//         email: Yup.string().email().required(),
//         password: Yup.string().required(),
//       });

//       if (!(await schema.isValid(req.body))) {
//         throw new Error('Make sure your password or email are correct');
//       }

//       const { email, password } = req.body;

//       const user = await User.findOne({
//         where: { email },
//       });

//       if (!user) {
//         throw new Error('Make sure your password or email are correct');
//       }

//       if (!(await user.checkPassword(password))) {
//         return res.status(401).json({ error: 'Make sure your password or email are correct' });
//       }

//       // if (!(await user.checkPassword(password))) {
//       //   throw new Error('Make sure your password or email are correct');
//       // }

//       return res.json({
//         id: user.id,
//         email,
//         name: user.name,
//         admin: user.admin,
//         token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
//           expiresIn: authConfig.expiresIn,
//         }),
//       });
//     } catch (err) {
//       return res.status(401).json({ error: err.message });
//     }
//   }
// }

// export default new SessionController();
