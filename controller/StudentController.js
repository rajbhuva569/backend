const user = require('../modal/StudentSchema.js')


const studentgetdata = async (req, res) => {
    try {
        const userData = await user.find();
        return res.status(200).json({ status: true, user: userData, message: 'data get sucessfully' });
    } catch (error) {
        return res.status(500).json({ status: false, user: [], message: "error to get data" });
    }
};

const studentadddata = async (req, res) => {
    try {
        // const getdata = await user.find(req.body);
        // const newobj = {
        //     ...req.body,
        //     userId: getdata[getdata.length - 1].userId ? getdata[getdata.length - 1].userId + 1 : getdata.length + 1
        // }
        const data = await user.create(req.body);
        return res.status(200).json({ status: true, user: data, status: 'insert success' });
    } catch (error) {
        return res.status(500).json({ status: false, user: [], message: "error to insert data", error: error });
    }
};

const studentgetonedata = async (req, res) => {
    try {
        const userData = await user.findOne({ _id: req.params.id });
        return res.status(200).json({ status: true, user: userData, status: 'success' });
    } catch (error) {
        return res.status(500).json({ status: false, user: [], message: "Unable to get data" });
    }
};
const studenteditdata = async (req, res) => {
    try {
        const userData = await user.findOne({ _id: req.params.id });
        if (!userData) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        const Data = await user.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        return res.status(200).json({ status: true, user: Data, message: 'User updated successfully' });
    } catch (error) {

        console.error(error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

const studentdeletedata = async (req, res) => {
    try {
        const userData = await user.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: true, user: userData, status: 'delete success' });
    } catch (error) {
        return res.status(500).json({ status: false, user: [], message: "Unable to get data" });
    }
};

module.exports = {
    studentgetdata,
    studentadddata,
    studentgetonedata,
    studenteditdata,
    studentdeletedata
}