
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
        if ( typeof this.queue[name][0] !== 'function' ) {
            return this.queue[name][0];
        } else {
            return this.queue[name][0](...params);
        }
        
    }
};


export default Hooks;
