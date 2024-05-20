// const jwt = require('jsonwebtoken');

// const authentication = (auth) => (req, res, next) => {
//     let gettoken = req.headers.authorization;
//     if (!gettoken) {
//       return res.json({
//         status: false,
//         message: "Token missing",
//       });
//     }

//   let token = req.headers.authorization.split(' ')[1];
//   console.log("token",token)
//   let decode;

//   try {
//     decode = jwt.verify(token,'skey')
// } catch (error) {
//     console.log(error);
// }
// if (!auth.includes(decode.role)) {
//     console.log('matching role ' + decode.role);
// }

//   next();
// };

// module.exports = { authentication };
var jwt = require('jsonwebtoken');

const authorize = (authority) => (req, res, next) => {
  console.log("authority", authority);
  console.log("req.headers", req.headers);
  const authorize = req.headers.authorization
  console.log("req.headers.authorization", req.headers.authorization);
  if (!authorize) {
    return res.status(401).json({ status: false, data: [], messsage: "Token not found.....!!!" })
  }
  const token = authorize.split(' ')[authorize.split(' ')?.length - 1]
  let decoded;
  try {
    decoded = jwt.verify(token, 'raj');

  } catch (error) {
    return res.status(500).json({ status: false, data: [], messsage: error.message })
  }
  if (!authority.includes(decoded?.role)) {
    return res.status(401).json({ status: false, data: [], messsage: "Unauthorized" })
  }
  console.log("decoded==============", decoded);
  req.body = { ...req.body, email: decoded?.email }
  next();

}

module.exports = authorize

