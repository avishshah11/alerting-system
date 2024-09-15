
export const postAlerts = async (postData) => {
    let url = 'http://localhost:8000/api/alerts'

    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json()
        return result;
    } catch (error) {
        throw error;
    }
};