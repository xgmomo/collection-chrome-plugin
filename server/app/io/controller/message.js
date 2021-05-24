const Controller = require('egg').Controller;

class Message extends Controller {
    async sendMessage() {
        const { ctx } = this;
        const {
            socket,
            service,
        } = ctx;
        const {
            handshake: {
                query = {}
            },
            // nsp: {
            //     connected = []
            // }
        } = socket;
        // 参数
        const {
            userId,
            messageType,
        } = query;

        const message = ctx.args[0] || {}; // emit 值
        // const client = socket.id; // 客户socket编号
        // console.log(connected, 'socket.connected')

        // 第一步 根据userId查询对应的用户信息 并 当用户存在时 解构赋值 用户数据
        const detail = await service.user.userInfo.currentUser({
            id: userId,
        });

        if (!detail) {
            return socket.emit('connect_error', `服务端获取用户报错`);
        }
        const { data } = detail;
        const {
            headImg,
            nickName,
        } = data;

        // 第二步 将消息添加到消息表中 并解构赋值
        const messageResult = await service.user.message.addMessage({
            userId,
            message,
            messageType,
        })
        const {
            data: messageData,
        } = messageResult;
        const {
            _id, // 消息的id
            created_at,
        } = messageData;

        // 第三步 重构返回数据的格式
        const condition = {
            userInfo: {
                _id: userId,
                headImg,
                nickName,
            },
            _id,
            message,
            created_at,
        }
        // 第四歩 通知相应的人
        await socket.emit('otherMessage', JSON.stringify(condition));
        await socket.broadcast.emit('otherMessage', JSON.stringify(condition));
    }
    async deleteMessage() {
        const { ctx } = this;
        const {
            socket,
            service,
        } = ctx;

        const messageId = ctx.args[0] || {}; // emit 值
        const condition = {
            _id: messageId
        }

        const result = await service.user.message.deleteMessage(condition);
        if (!result) {
            return socket.emit('connect_error', `服务端获取删除报错`);
        }

        await socket.emit('deleteMessageRes', messageId);
        await socket.broadcast.emit('deleteMessageRes', messageId);
    }
}
module.exports = Message;
