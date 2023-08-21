
const {
    EVENT_SEND_CHAT,
    EVENT_ABORT
} = require('../core/socket/constants');

const main = (socket, io) => {
    socket.on(EVENT_SEND_CHAT, msg => {
        io.emit(EVENT_SEND_CHAT, msg);
    });

    socket.on(EVENT_ABORT, msg => {
        const { data } = msg;
        io.emit(EVENT_ABORT, msg);
        if (data.info === true) {
            console.log(EVENT_ABORT, data.info);
        }
    });
};


module.exports = {
    main
}     
