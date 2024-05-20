const product = require('../modal/productSchema')

const getdata = async (req, res) => {
    try {
        const productdata = await product.find();

        return res.json({ status: true, product: productdata, message: 'success' })
    } catch (error) {
        return res.status(500).json({ status: false, product: [], message: "Internal server error" });

    }
}
const onegetdata = async (req, res) => {
    try {
        const productdata = await product.findOne({ _id: req.params.id });
        return res.status(200).json({ status: true, product: productdata, message: 'success' });
    } catch (error) {
        return res.status(500).json({ status: false, product: [], message: "Internal server error" });

    }
}
const adddata = async (req, res) => {
    try {
        const data = await product.create({ ...req.body });
        return res.json({ product: data, status: 'success' })
    } catch (error) {
        return res.status(500).json({ status: false, product: [], message: "Internal server error" });

    }
}
const editdata = async (req, res) => {
    try {
        const id = await product.findById(req.params.id);
        // console.log(id, "id")
        // const path = `public/upload/${id.imagename}`;
        // console.log(path)
        // fs.unlink(path, (err) => {
        //     console.log(err)
        // })
        const productdata = await product.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });

        return res.status(200).json({ status: true, product: productdata, message: 'success' });
    } catch (error) {
        return res.status(500).json({ status: false, product: [], message: "Internal server error" });

    }
}
const deletedata = async (req, res) => {
    try {
        const productdata = await product.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: true, product: productdata, message: 'success delete' });
    } catch (error) {
        return res.status(500).json({ status: false, product: [], message: "Internal server error" });

    }
}

module.exports = { getdata, onegetdata, adddata, editdata, deletedata }