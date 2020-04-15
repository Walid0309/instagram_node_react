const Transactions = require("../models/Transactions")



//@route    /api/v1/transaction
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transactions.find()
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "server error"
        })

    }
}

//@route    /api/v1/transaction

exports.addTransactions = async (req, res, next) => {
    try {
        const {
            amount,
            text
        } = req.body;
        const transaction = await Transactions.create(req.body)
        return res.status(200).json({
            success: true,
            data: transaction
        })
    } catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            res.status(500).json({
                success: false,
                data: err
            })
        }
    }

}

//@route    /api/v1/transaction/:id
exports.deleteTransactions = async (req, res, next) => {
    try {
        const transactions = await Transactions.findById(req.params.id);
        if (!transactions) {
            res.status(404).json({
                success: false,
                error: "no transaction found"
            })
        }

        await transactions.remove();

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err
        })
    }
}