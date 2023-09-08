import auth from '../../auth/auth.js';
import db from '../../database/_db.js';

export default async function login(req, res, next) {
  try {
    const [username, plainTextPassword] = await auth.decodeBase64Header(req);


    if (username != 'error') {
      const records = await db.loadRecords("users")
      const currentUser = await db.search(records,{username:username})
      
      if (!Object.is(currentUser,null) && (auth.verifyPassword(plainTextPassword, currentUser.password))) {

        auth.createToken(currentUser, (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie('token', token,{sameSite:"strict",httpOnly:true});
          res.status(200).json({
            status: 200,
            statusText: 'OK',
            message: 'Retrieving a single user',
            data: currentUser
          });
        });
      }else {
        res.status(404).json({
          status: 404,
          statusText: 'NOT_FOUND',
          error: {
            message: 'Please verify your credentials',
          },
        });
      }
    } else {
      
      res.status(404).json({
        status: 404,
        statusText: 'NOT_FOUND',
        error: {
          message: 'Please verify your credentials',
        },
      });
    }
  } catch (error) {
    next(error);
  }
}
