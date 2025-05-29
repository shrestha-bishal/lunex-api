class ApiClient 
{
    /**
     * @param {string} url - API URL 
     */
    constructor(url) 
    {
        this.url = url
    }

    /***
     * [POST]
     * @param {string|null} routeParam - The route api parameter
     * @param {Object} data
     * @returns {Promise<Object>} 
     * @throws {Error}
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

    /***
     * [POST]
     * @param {string|null} routeParam - The route api parameter
     * @param {Object} data
     * @returns {Promise<Object>} 
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
     * [GET]
     * @param {string|null} routeParam - The route api parameter
     * @returns {Promise<Object>} 
     * @throws {Error}
     */
    async getAsync(routeParam = null) 
    {
        try 
        {
            let apiUrl = this.#getAbsoluteUrl(routeParam)
            var response = await fetch(apiUrl)
            
            if(!response.ok)
                throw new Exception(`An error occurred ${response.statusText}`)
        }
        catch(error) {
            throw error
        }
    }

    #getAbsoluteUrl(routeParam = null) {
        return `${this.url}/${routeParam}`
    }
}

export default ApiClient;