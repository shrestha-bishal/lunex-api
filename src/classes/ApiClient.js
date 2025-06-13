/**
 * ApiClient provides methods to interact with a RESTful API using HTTP methods.
 * Supports JSON-based GET and POST requests with configurable route parameters.
 */
class ApiClient 
{
    /**
     * Creates an instance of ApiClient.
     *
     * @param {string} url - The base URL of the API (e.g., "https://api.example.com").
     */
    constructor(url) 
    {
        /**
         * The base URL of the API.
         * @type {string}
         */
        this.url = url
    }

    /**
     * Sends a POST request and returns the parsed JSON or text response.
     *
     * @param {string|null} routeParam - Optional route appended to the base URL.
     * @param {Object} data - The JSON payload to send.
     * @returns {Promise<Object|string>} - Parsed JSON or raw text from the server.
     * @throws {Error} - If the request fails or the response is not OK.
     */
    async postAsync(routeParam = null, data)
    {
        try 
        {
            let apiUrl = this.#getAbsoluteUrl(routeParam)

            const response = await fetch(apiUrl , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if(!response.ok) 
                throw new Exception(`An error occurred ${response.statusText}`)
            
            if(response.headers.get('content-type').includes('application/json'))
                return await response.json()

            return await response.text()
        }catch(error) {
            throw error;
        }
    }

    /**
     * Sends a POST request and returns the raw Response object.
     *
     * @param {string|null} routeParam - Optional route appended to the base URL.
     * @param {Object} data - The JSON payload to send.
     * @returns {Promise<Response>} - The raw fetch Response.
     */
    async executePostAsync(routeParam = null, data) {
        let apiUrl = this.#getAbsoluteUrl(routeParam)

        return await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }

    /**
     * Sends a GET request and returns the parsed JSON or text response.
     *
     * @param {string|null} routeParam - Optional route appended to the base URL.
     * @returns {Promise<Object|string>} - Parsed JSON or raw text from the server.
     * @throws {Error} - If the request fails or the response is not OK.
     */
    async getAsync(routeParam = null) 
    {
        try 
        {
            let apiUrl = this.#getAbsoluteUrl(routeParam)
            var response = await fetch(apiUrl)
            
            if(!response.ok)
                throw new Exception(`An error occurred ${response.statusText}`)

            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                return await response.json();
            }

            return await response.text();
        }
        catch(error) {
            throw error
        }
    }

    /**
     * Constructs the full URL by appending a route to the base URL.
     *
     * @private
     * @param {string|null} routeParam - The route to append.
     * @returns {string} - The full request URL.
     */
    #getAbsoluteUrl(routeParam = null) {
        let baseUrl = this.url.replace(/\/+$/, '')

        if(routeParam != null) {
            baseUrl += `/${routeParam.replace(/^\/+/, '')}`
        }

        return baseUrl
    }
}

export default ApiClient;