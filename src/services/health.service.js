
module.exports.health = async (_, res, next) => {
    try {
        return res.status(200).json({
            message: "Todo esta funcionando correctamente",
        });        
    } catch (e) {
        next(e);
    }
};
