"use strict";

module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserInfoSchema = new Schema(
        {
            userName: String, // 用户账户
            password: String, // 密码
        },
        {
            versionKey: false,
            timestamps: {
                createdAt: "created_at",
                updatedAt: "updated_at",
            },
            collection: "collection_chrome_plugin_user",
        }
    );

    return mongoose.model("User", UserInfoSchema);
}