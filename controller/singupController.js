const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const singup = require('../modal/singupSchema')
// const singupto = async (req, res) => {
//     try {
//         const finduser = await singup.findOne({ email: req.body.email })

//         if (finduser) {
//             return res.status(200).json({ status: false, data: finduser, message: "User already signed up" });
//         }


//         // if (!req.body || !req.body.email || !req.body.password) {
//         //     return res.status(400).json({ status: false, data: [], message: "Invalid signup data" });
//         // }


//         const users = await singup.find({});
//         let role = users.length === 0 ? "admin" : "user";

//         const userId = !users.length ? 'A1' : `A${Number(users[users.length - 1].userId.split('A')[1]) + 1}`;

//         let referId = (Math.floor(100000 + Math.random() * 900000))
//         // console.log(users.length);
//         const saltRounds = 10;
//         const hashpassword = await bcrypt.hash(req.body.password, saltRounds).then(function (hash) {

//             return hash

//         });
//         // console.log("hashpassword==============", hashpassword);
//         const data = await singup.create({ ...req.body, role, password: hashpassword, referId: referId, userId: userId });


//         return res.status(200).json({ status: true, data: data, message: "Signup successful" });
//     } catch (error) {

//         return res.status(500).json({ status: false, data: [], message: "Internal server error" });
//     }
// }
// const singupto = async (req, res) => {
//     try {
//         const finduser = await singup.findOne({ email: req.body.email });

//         if (finduser) {
//             return res.status(200).json({ status: false, data: finduser, message: "User already signed up" });
//         }

//         const users = await singup.find({});
//         let role = users.length === 0 ? "admin" : "user";
//         const userId = !users.length ? 'A1' : `A${Number(users[users.length - 1].userId.split('A')[1]) + 1}`;

//         // Generate unique referral ID using recursion
//         const generateReferralId = () => {
//             const referId = (Math.floor(100000 + Math.random() * 900000)).toString();
//             return users.some(user => user.referId === referId) ? generateReferralId() : referId;
//         };

//         const referId = generateReferralId();

//         const saltRounds = 10;
//         const hashpassword = await bcrypt.hash(req.body.password, saltRounds);

//         let userData = { ...req.body, role, password: hashpassword, referId, userId };

//         // If referPersonId is provided, find the user with that ID and add it to userData
//         if (req.body.referPersonId) {
//             const referPerson = await singup.findOne({ userId: req.body.referPersonId });
//             if (referPerson) {
//                 userData.referPersonId = req.body.referPersonId;
//             } else {
//                 return res.status(400).json({ status: false, data: [], message: "Invalid refer person ID" });
//             }
//         }

//         const data = await singup.create(userData);

//         return res.status(200).json({ status: true, data: data, message: "Signup successful" });
//     } catch (error) {
//         return res.status(500).json({ status: false, data: [], message: "Internal server error" });
//     }
// };
// const singupto = async (req, res) => {
//     try {
//         const finduser = await singup.findOne({ email: req.body.email });

//         if (finduser) {
//             return res.status(200).json({ status: false, data: finduser, message: "User already signed up" });
//         }

//         const users = await singup.find({});
//         let role = users.length === 0 ? "admin" : "user";

//         const userId = !users.length ? 'A1' : `A${Number(users[users.length - 1].userId.split('A')[1]) + 1}`;


//         if (!users.length) {
//             // Generate a new referral ID for the first user
//             newReferId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
//         } else {
//             // Check if the provided Referrer Id exists in the database
//             const referrPersonId = await singup.findOne({ referId: req.body.referrerId });
//             if (!referrPersonId) {
//                 return res.status(400).json({ status: false, message: "Invalid Referrer Id" });
//             }
//             referrerUserId = referrPersonId.userId;
//         }
//         const saltRounds = 10;
//         const hashpassword = await bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
//             return hash;
//         });
//         console.log("users.length====================", users.length);
//         let data;
//         if (!users.length) {
//             data = await singup.create({
//                 ...req.body,
//                 role,
//                 password: hashpassword,
//                 referId: newReferId,
//                 userId,
//                 referrPersonId: referrerUserId
//             });
//         } else {
//             data = await singup.create({
//                 ...req.body,
//                 role,
//                 password: hashpassword,
//                 referId: newReferId,
//                 userId
//             });
//         }
//         return res.status(200).json({ status: true, data: data, message: "Signup successful" });
//     } catch (error) {
//         return res.status(500).json({ status: false, data: [], message: "Internal server error" });
//     }
// }
const singupto = async (req, res) => {
    try {
        // Check if the user already exists
        const finduser = await singup.findOne({ email: req.body.email });
        if (finduser) {
            return res.status(200).json({ status: false, data: finduser, message: "User already signed up" });
        }

        // Fetch all users
        const users = await singup.find({});
        // Determine the role based on the number of users
        let role = users.length === 0 ? "admin" : "user";

        // Generate user ID
        const userId = !users.length ? 'A1' : `A${Number(users[users.length - 1].userId.split('A')[1]) + 1}`;

        let newReferId, referrerUserId;
        newReferId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        if (users.length) {

            const referrPersonId = await singup.findOne({ referId: req.body.referrerId });
            if (!referrPersonId) {
                return res.status(400).json({ status: false, message: "Invalid Referrer Id" });
            }
            referrerUserId = referrPersonId.userId;
        }

        // Hash the password
        const saltRounds = 10;
        const hashpassword = await bcrypt.hash(req.body.password, saltRounds);

        // Create the user data
        const userData = !users.length ? {
            ...req.body,
            role,
            password: hashpassword,
            referId: newReferId,
            userId,
        } : {
            ...req.body,
            role,
            password: hashpassword,
            referId: newReferId,
            userId,
            referrPersonId: referrerUserId

        };

        // Save the user data
        const data = await singup.create(userData);

        return res.status(200).json({ status: true, data, message: "Signup successful" });
    } catch (error) {
        return res.status(500).json({ status: false, data: [], message: "Internal server error" });
    }
}



module.exports = { singupto };
