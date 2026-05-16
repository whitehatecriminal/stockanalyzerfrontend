const BASE_URL = 'http://localhost:3000/api/v1';

export const fetchValuation = async (companyName) => {
    const response = await fetch(`${BASE_URL}/valuation/${encodeURIComponent(companyName)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch valuation data');
    }
    console.log(response);
    return response.json();
};

export const postStockData = async (companyName) => {
    const response = await fetch(`${BASE_URL}/StockData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ StockData: companyName }),
    });
    if (!response.ok) {
        throw new Error('Failed to post stock data');
    }
    console.log(response);
    return response.json();
};

export const fetchCompanyData = async (companyName) => {
    const response = await fetch(`${BASE_URL}/company/name/${encodeURIComponent(companyName)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch company data');
    }
    console.log(response);
    return response.json();
};
