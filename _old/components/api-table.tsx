  
import { useState } from 'react'
import { ApiArray, ApiArrayItem, TableProps } from '../interfaces/reconcilliation'
import styles from './api-table.module.scss'

const TableHeaders = (tableHeaders: TableProps) => {
  const topKeys = tableHeaders.tableProps.keys()

  const tHeads =
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Discount</th>
        <th>Expires</th>
        <th>Source</th>
        <th>Match?</th>
      </tr>
    </thead>
  
  return (
      tHeads
    )
}

const TableBody = (tableHeaders: TableProps) => {
    const tBody = (
        <tbody>
            {
                tableHeaders.tableProps.map((row, i: number) => {
                  return (
                    <TRow key={"trow "+i} {...row}></TRow>
                  )
                  }
                )
            }
        </tbody>
    )
    return (
        tBody
    )
}

const TRow = (tableRow: ApiArray) => {
    const isDiscountMatchFunc = (el: ApiArrayItem, index: number, arr: ApiArrayItem[]) => {
      if (index == 0) {
        return true;
      } else {
        return (el.Discount == arr[index-1].Discount)
      }
    }
    const isDiscountMatch = tableRow.items.every(isDiscountMatchFunc)

    const tableRowOutput = 
        <>
          {
            tableRow.items.map((item, i: number) => {
              return (
                <tr className={isDiscountMatch? styles.matched: styles.unmatched} key={"row "+i}>
                    {i == 0?<td rowSpan={tableRow.items.length}>{tableRow.Id}</td> : null}
                    <td className={styles.textLeft}>{item.Name}</td>
                    <td>{item.Discount}</td>
                    <td>{item.Expires}</td>
                    <td>{item.Source}</td>
                    <td>{isDiscountMatch? "✔️": "❌"}</td>
                </tr>
              )
            })
          }
      </>
    return (
        tableRowOutput
    )
}

export default function ApiTable(tableProps: TableProps) {
  // console.log(tableProps.tableProps)
  return (
    <table className={styles.table}>
      <TableHeaders tableProps={tableProps.tableProps}></TableHeaders>
      <TableBody tableProps={tableProps.tableProps}></TableBody>
    </table>
  )
}
