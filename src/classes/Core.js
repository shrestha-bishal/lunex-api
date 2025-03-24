class Core {
    /**
     * @param {} outputContainer 
     * @param {} content 
     */
    static renderContent(outputContainer, content) {
        outputContainer.innerHTML = ''
        var contentRange = document.createRange().createContextualFragment(content)
        outputContainer.appendChild(contentRange)
    }

    /**
     * Get form data as json formatted object
     * @param {json} form 
     */
    static getFormData(form) {
        var data = new FormData(form)
        const formData = {}
        data.forEach((value, key) => {
            formData[key] = value
        })

        return formData
    }
}

export default Core