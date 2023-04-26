
const Hooks = {
    // current hook queue
    queue: {},

    add: function (name, fn) {
        if (!this.queue[name]) { 
            this.queue[name] = []; 
        }
        this.queue[name].push(fn);
    },

    remove: function (name) {
        delete this.queue[name];
    },

    call: function (name, ...params) {
        if (Array.isArray(this.queue[name])) {
            this.queue[name].forEach(function (fn) { 
                fn.call(this, ...params); 
            });
        }
    },

    return: function (name, ...params) {
        return this.queue[name][0](...params);
    }
};


module.exports = Hooks;
