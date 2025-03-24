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
     * @param {Object} data
     * @returns {Promise<Object>} 
     * @throws {Error}
     */
    async postAsync(data)
    {
        try 
        {
            const response = await fetch(this.url, {
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
     * @param {Object} data
     * @returns {Promise<Object>} 
     */
    async executePostAsync(data) {
        return await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }

    /**
     * [GET]
     * @returns {Promise<Object>} 
     * @throws {Error}
     */
    async getAsync() 
    {
        try 
        {
            var response = await fetch(this.url)
            
            if(!response.ok)
                throw new Exception(`An error occurred ${response.statusText}`)
        }
        catch(error) {
            throw error
        }
    }
}

export default ApiClient;