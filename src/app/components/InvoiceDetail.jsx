import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Card, Descriptions, Button } from "antd"

export default function InvoiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { list } = useSelector((state) => state.invoice)

  const invoice = list.find((inv) => inv.id === id)

  if (!invoice) {
    return <p>Invoice not found</p>
  }

  return (
    <div style={{ padding: 24 }}>
      <Button onClick={() => navigate("/invoice")} style={{ marginBottom: 16 }}>
        Back to List
      </Button>
      <Card title={`Invoice Details: ${invoice.invoiceNumber}`}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Invoice No">{invoice.invoiceNumber}</Descriptions.Item>
          <Descriptions.Item label="Issue Date">{invoice.issueDate}</Descriptions.Item>
          <Descriptions.Item label="Customer">{invoice.customerName}</Descriptions.Item>
          <Descriptions.Item label="Supplier">{invoice.supplierName}</Descriptions.Item>
          <Descriptions.Item label="Status">{invoice.status}</Descriptions.Item>
          <Descriptions.Item label="Tax Amount (€)">{invoice.taxExclusiveAmount?.toFixed(2)}</Descriptions.Item>
          <Descriptions.Item label="Total Amount (€)">{invoice.taxInclusiveAmount?.toFixed(2)}</Descriptions.Item>
          <Descriptions.Item label="Document Type">{invoice.documentType}</Descriptions.Item>
          <Descriptions.Item label="Payment Status">{invoice.paymentDetails?.paymentStatus || '-'}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}
