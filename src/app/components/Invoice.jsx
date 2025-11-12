import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "../slices/invoice-slice";
import { logout } from "../slices/auth-slice";

export default function Invoice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jwt } = useSelector((state) => state.auth);
  const { list, loading, error } = useSelector((state) => state.invoice);

  const handleFetch = () => {
    if (!jwt) return;
    dispatch(
      getInvoices({
        token: jwt,
        body: {
          companyId: "01c880ca-46b5-4699-a477-616b84770071",
          documentType: "OUTGOING",
          endDate: "2025-07-04T08:31:10.422Z",
          page: 0,
          size: 20,
          startDate: "2025-06-27T00:00:00.000Z",
          referenceDocument: "",
          type: null,
          status: null,
          paymentStatus: null,
          isDeleted: false,
        },
      })
    );
  };

  const handleDetail = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`);
  };

  const columns = [
    {
      title: "Invoice No",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Issue Date",
      dataIndex: "issueDate",
      key: "issueDate",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      responsive: ["md", "lg"],
    },
    {
      title: "Supplier",
      dataIndex: "supplierName",
      key: "supplierName",
      responsive: ["lg"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "orange";
        if (status.includes("PDF")) color = "green";
        if (status.includes("ZUGFERD")) color = "blue";
        return <Tag color={color}>{status}</Tag>;
      },
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Detail",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleDetail(record.id)}>
          Detay
        </Button>
      ),
      responsive: ["xs", "sm", "md", "lg"],
    },
  ];

  const dataSource = list.map((inv) => ({
    ...inv,
    key: inv.id,
    issueDate: new Date(inv.issueDate).toLocaleDateString(),
  }));

  return (
    <div style={{ padding: 24, background: "#f5f5f5", borderRadius: 9 }}>
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <Button
          type="primary"
          onClick={handleFetch}
          disabled={!jwt}
          loading={loading}
        >
          Fetch Invoices
        </Button>
        <Button danger onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 2 }}
        scroll={{ x: "max-content" }} // yatay kaydırma aktif
      />
    </div>
  );
}
