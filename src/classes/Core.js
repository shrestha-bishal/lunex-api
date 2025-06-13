/**
 * Core utility class providing helper methods for DOM manipulation and form handling.
 */
class Core {
    /**
     * Clears the content of the given container and inserts new HTML content.
     * 
     * @param {HTMLElement} outputContainer - The DOM element to render content into.
     * @param {string} content - The HTML string content to be rendered.
     */
    static renderContent(outputContainer, content) {
        outputContainer.innerHTML = ''
        var contentRange = document.createRange().createContextualFragment(content)
        outputContainer.appendChild(contentRange)
    }

    /**
     * Extracts form data and returns it as a plain JavaScript object.
     * 
     * @param {HTMLFormElement} form - The form element to extract data from.
     * @returns {Object} A key-value map representing form fields and their values.
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