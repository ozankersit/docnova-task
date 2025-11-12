const INVOICE_API_URL = 'https://api-dev.docnova.ai/invoice/search'

export const fetchInvoices = async (token, body) => {
  const response = await fetch(INVOICE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'R-Auth': token,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error('Error fetching invoices')
  }

  return await response.json()
}
