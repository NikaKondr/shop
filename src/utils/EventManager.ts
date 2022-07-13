 // @ts-ignore
const EventManager = window.EventManager || {
    events: {},
  
    addHandler: function (eventName: string, handler: any) {
        this.events[eventName] = handler;
    },

    callHandler: function ( eventName: string, type: string, data: any ) {
        if (eventName in this.events) {        
            this.events[eventName]({type: type, data: data})
        } else {
            console.log(eventName + 'not found');
        }
    },
  
    removeHandler: function (eventName: string) {
        if (eventName in this.events) {
            this.events[eventName] = null;
            delete this.events[eventName];
        }
    },

    trigger: function(eventTarget: string, eventName: string, ...args: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`emitted: server::${eventTarget}:${eventName}\n`, ...args) 
        } else {
            // @ts-ignore
            mp.trigger(eventTarget, eventName, JSON.stringify(...args)) // eslint-disable-line
        }
    }
  };
  // @ts-ignore
  window.EventManager = EventManager;
  export default EventManager;