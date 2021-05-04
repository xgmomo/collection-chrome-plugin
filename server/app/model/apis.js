"use strict";

module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const schema = new Schema(
        {
            userId: {
                type: mongoose.ObjectId,
                ref: 'User'
            }, // 用户的id
            name: String, // 名称
            index: Number, // 序号
            websiteId: {
                type: mongoose.ObjectId,
                ref: 'Apis'
            },
            prodUrl: String,
            betaUrl: String,
            localUrl: String,
        },
        {
            versionKey: false,
            timestamps: {
                createdAt: "created_at",
                updatedAt: "updated_at",
            },
            collection: "collection_chrome_plugin_apis",
        }
    );

    return mongoose.model("Apis", schema);
}