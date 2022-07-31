// Handle events from client
function trigger ( eventName, args ) { // eslint-disable-line
    try {
        window.EventManager.events[ eventName ]( args );
    } catch ( e ) {
    }
}