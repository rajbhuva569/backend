// const login = require('../modal/loginSchema')
const user = require('../modal/singupSchema')
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const loginto = async (req, res) => {
    try {
        const finduser = await user.findOne({ email: req.body.email })
        if (!finduser) {
            return res.status(200).json({ status: false, data: [], message: "user not found!!!" })
        }
       
        console.log(finduser);
        const role = finduser.role
        const token = jwt.sign({ email: finduser.email, role: finduser.role }, 'raj', { expiresIn: '1h' });

        // const data = await user.create(req.body)
        return res.status(200).json({ status: true, data: finduser, token, role, message: "login successfully" });

    } catch (error) {
        return res.status(500).json({ status: false, data: [], message: "internal server error" });
    }
}

const emailverfication = async (req, res) => {
    try {
        const finduser = await user.findOne({ email: req.body.email })

        if (!finduser) {
            return res.status(200).json({ status: false, data: [], message: "user not found!!!" })
        }
        const otp = Math.floor(Math.random() * 9000);
        console.log(otp);
        const userupdate = await user.findOneAndUpdate({ email: req.body.email }, { $set: { otp: otp } }, { new: true })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rajbhuva569@gmail.com',
                pass: 'eosm bmqx wcrp ywti'
            }
        });

        const mailOptions = {
            from: 'rajbhuva569@gmail.com',
            to: req.body.email,
            subject: 'Sending Email using Node.js',
            text: `${otp}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        

        return res.status(200).json({ status: true, data: userupdate, message: "user verfird!!" });

    } catch (error) {
        return res.status(500).json({ status: false, data: [], message: "internal server error" });
    }
}
const optverfication = async (req, res) => {
    try {
        const finduser = await user.findOne({ email: req.body.email })

        if (!finduser) {
            return res.status(200).json({ status: false, data: [], message: "user not found!!!" })
        }
        console.log("req.body.otp", req.body.otp);
        console.log("finduser.otp", finduser.otp);

        if (req.body.otp != finduser.otp) {
            return res.status(200).json({ status: false, data: [], message: "otp not found!!!" })
        }
        return res.status(200).json({ status: true, data: finduser, message: "user verfird!!" });

    } catch (error) {
        return res.status(500).json({ status: false, data: [], message: "internal server error" });
    }
}
const resetpassword = async (req, res) => {
    try {
        const finduser = await user.findOne({ email: req.body.email })
        if (!finduser) {
            return res.status(200).json({ status: false, data: [], message: "user not found!!!" })
        }
        if (req.body.password !== req.body.confirmpassword) {
            return res.status(200).json({ status: false, data: [], message: 'Invalide email or password' });
        }
        const data = await user.findByIdAndUpdate({ _id: finduser._id }, { $set: { password: req.body.password } })
        return res.status(200).json({ status: true, data: data, message: "password changecd successfully" });

    } catch (error) {
        return res.status(500).json({ status: false, data: [], message: "internal server error" });
    }
}
module.exports = { loginto, emailverfication, resetpassword, optverfication }