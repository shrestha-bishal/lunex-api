/**
 * Represents the structure of a standard API action payload.
 * 
 * Typically used to wrap a specific action type and its associated data
 * for communication with an API endpoint.
 */
class ActionPayload {
  /**
     * Create an ActionPayload instance.
     * 
     * @param {string} action - The action identifier (e.g., "login", "fetchUser").
     * @param {Object|null} data - The associated data payload for the action. Can be null.
     */
    constructor(action, data = null) {
        /**
         * The type of action being performed.
         * @type {string}
         */
        this.action = action
         /**
         * Optional data related to the action.
         * @type {Object|null}
         */
        this.data = data
    }
}

export default ActionPayload