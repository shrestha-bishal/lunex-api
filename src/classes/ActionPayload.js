class ActionPayload {
    /**
     * @param {string} action
     * @param {json|null} data
     */
    constructor(action, data = null) {
        this.action = action
        this.data = data
    }
}

export default ActionPayload