
export const getAlerts = async () => {
    let url = 'http://localhost:8000/api/alerts'

    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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