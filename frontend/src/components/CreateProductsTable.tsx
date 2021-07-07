import React, { useEffect, useState } from 'react'
import { Table, Select, Space } from 'antd'

const { Option } = Select

const { Column } = Table

const CreateProductsTable = ({ Products, keys, setproducts, setQty }: any) => {
  const [Qtyselected, setQtyselected] = useState<
    Array<{
      productID: number
      Qty: number
    }>
  >([])
  const [select, setselect] = useState({
    selectedRowKeys: [],
    loading: false,
  })
  const { selectedRowKeys } = select
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setselect({
        ...selectedRowKeys,
        selectedRowKeys: selectedRowKeys,
      })
      setproducts(
        selectedRows.map((row: any) => ({ productID: row.id, Qty: 1 }))
      )
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.stockQty === 0, // Column configuration not to be checked if stockQty is 0
    }),
  }

  const updateQty = (ProductID: any, Qtytoadd: any) => {
    let index = Qtyselected.findIndex(
      (x: any) => x.productID === Number(ProductID)
    )
    if (index === -1) {
      setQtyselected([
        ...Qtyselected,
        { Qty: Number(Qtytoadd), productID: Number(ProductID) },
      ])
    } else {
      const Qty: any = [...Qtyselected]
      Qty[index].Qty = Qtytoadd
      setQtyselected(Qty)
    }
  }

  useEffect(() => {
    setQty(Qtyselected)
  }, [Qtyselected, setQty])

  return (
    <Table
      dataSource={Products}
      rowSelection={{ type: 'checkbox', ...rowSelection }}
      rowKey={(record) => record.id}
    >
      {keys.map((key: string, index: any) => {
        return <Column title={key} dataIndex={key} key={`${index + 1}`} />
      })}
      <Column
        title="Qty"
        key="stockQty"
        dataIndex="stockQty"
        render={(stockQty, product: any) => (
          <Space size="middle">
            <Select
              onChange={(value) => updateQty(product.id, value)}
              style={{ width: 120 }}
              defaultValue="1"
            >
              {Array.from(Array(stockQty), (e, i) => (
                <Option key={i} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </Select>
          </Space>
        )}
      />
    </Table>
  )
}

export default CreateProductsTable
