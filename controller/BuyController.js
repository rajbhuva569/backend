

const { Types } = require("mongoose");
const BuyProduct = require("../modal/BuyProduct");
const product = require("../modal/productSchema");
const user = require("../modal/singupSchema");
const TransactionHistory = require("../modal/TransctionSchema");

const buyproduct = async (req, res) => {
    try {
        const userdata = await user.findOne({ email: req.body.email });
        console.log("req.body.price", req.body.price);
        if (userdata.balance < req.body.price) {
            return res.status(400).json({ status: false, message: "Insufficient balance" });
        }


        const productPrice = req.body.price;
        const referralBonusPercentage = 0.05;
        const totalPurchasePrice = productPrice * (1 - referralBonusPercentage);

        if (userdata.balance < totalPurchasePrice) {
            return res.status(400).json({ status: false, message: "Insufficient balance including referral bonus" });
        }

        userdata.balance -= totalPurchasePrice;
        await userdata.save();
        console.log("userdata=============", userdata.userId);
        await TransactionHistory.create({
            userId: userdata.userId,
            type: 'debit',
            amount: totalPurchasePrice
        });
        console.log("userdata.referrPersonId===========", userdata.referrPersonId);
        if (userdata.referrPersonId) {
            const referPerson = await user.findOne({ userId: userdata.referrPersonId });
            if (referPerson) {
                const referralBonusAmount = await productPrice * 0.05;
                console.log(" referPerson.balance ", referPerson.balance);
                referPerson.balance += referralBonusAmount;
                await referPerson.save();
                await TransactionHistory.create({
                    userId: referPerson.userId,
                    type: 'credit',
                    amount: referralBonusAmount
                });
            }
        }


        
        const data = await BuyProduct.create({
            productId: new Types.ObjectId(req.body.productId),
            userId: new Types.ObjectId(userdata._id),
            productPrice: productPrice,
            referralBonus: (productPrice - totalPurchasePrice)
        });
        console.log("data=================", data);
        return res.status(200).json({ status: true, product: data, message: 'Success' });
    } catch (error) {
        return res.status(500).json({ status: false, product: [], message: "Internal server error" });
    }
};

const Tranction = async (req, res) => {
    try {
        const transction =await TransactionHistory.find();
        console.log("transction================", transction);
        return res.status(200).json({ status: true, data: transction, message: "Transction Get Succesfully" });

    } catch (error) {
        return res.status(500).json({ status: false, data: [], message: "Internal server error" });

    }
}

const userTransactionHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const transactions = await TransactionHistory.find({ userId }).sort({ timestamp: -1 });
        return res.status(200).json({ status: true, transactions });
    } catch (error) {
        return res.status(500).json({ status: false, transactions: [], message: "Internal server error" });
    }
};

// const buydatashow = async (req, res) => {
//     try {
//         const productshow = await BuyProduct.find();

//         const productData = await BuyProduct.aggregate([{
//             $lookup: {

//                 from: "products",
//                 localField: "productId",
//                 foreignField: "_id",
//                 as: "product"
//             }
//         }, {
//             $lookup: {

//                 from: "singups",
//                 localField: "userId",
//                 foreignField: "_id",
//                 as: "user"
//             }
//         }, {
//             $unwind: {

//                 path: "$product",
//             }

//         }, {
//             $unwind: {

//                 path: "$user",

//             }
//         }, {
//             $addFields: {

//                 user: "$user.email",
//                 product: "$product.product_name"
//             }
//         },
//         {
//             $project: {

//                 user: 1,
//                 product: 1
//             }
//         },
//         ])

//         console.log(productData);

//         return res.status(200).json({ status: true, product: productData, message: 'success' });
//     } catch (error) {

//         console.error(error);
//         return res.status(500).json({ status: false, message: "Internal server error" });
//     }
// }


const buydatashow = async (req, res) => {
    try {
        const userdata = await user.findOne({ email: req.body.email });
        console.log("userdata===================", userdata);
        if (userdata.role === 'admin') {
            // Admin can view all buy products
            const productData = await BuyProduct.aggregate([
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "product"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: {
                        path: "$product",
                    }
                },
                {
                    $unwind: {
                        path: "$user",
                    }
                },
                {
                    $addFields: {
                        user: "$user.email",
                        product: "$product.product_name"
                    }
                },
                {
                    $project: {
                        user: 1,
                        product: 1
                    }
                },
            ]);
            return res.status(200).json({ status: true, product: productData, message: 'Success' });
        } else {
            // Regular u"sers can only view their own buy products
            console.log("user=========", req.body.email);
            const productData = await BuyProduct.aggregate([
                {
                    $match: {
                        userId: userdata._id // Filter by the user's ID
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "product"
                    }
                },
                {
                    $unwind: {
                        path: "$product",
                    }
                },
                {
                    $addFields: {
                        product: "$product.product_name"
                    }
                },
                {
                    $project: {
                        product: 1,
                        user: userdata.email
                    }
                },
            ]);
            return res.status(200).json({ status: true, product: productData, message: 'Success' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}



module.exports = {
    buyproduct, buydatashow, Tranction
}