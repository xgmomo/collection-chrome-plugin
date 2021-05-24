module.exports = (app) => {
    const { io } = app;
    const { message } = io.controller;

    io.route('sendMessage', message.sendMessage);
    io.route('deleteMessage', message.deleteMessage);
};