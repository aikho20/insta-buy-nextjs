'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { List } from 'lucide-react'
import { Skeleton } from './skeleton'

interface ColumnsProps {
  accessor: string
  label: string
  Cell?: (data: any) => JSX.Element
}

interface CustomTableProps {
  tableHeaderTitle: Array<ColumnsProps>
  columnRows: Array<any>
  isLoading: boolean
  hiddenColumns?: Array<string>
}

export default function CustomTable({
  tableHeaderTitle,
  columnRows,
  isLoading,
  hiddenColumns = [],
}: CustomTableProps) {
  return (
    <div className='w-full h-full'>
      {columnRows?.length <= 0 ? (
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <List className={`h-20 w-20 p-2 text-slate-300 rounded`} />
          <p className=' text-slate-300'> Nothing to show...</p>
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader>
            <TableRow>
              {tableHeaderTitle?.map((items: ColumnsProps) =>
                hiddenColumns.includes(items.accessor) ? null : (
                  <TableHead className='maxw-[300px]' key={items.accessor}>
                    {items.label}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {columnRows?.map((rowItem: any, rowIndex: number) => (
              <TableRow key={rowIndex}>
                {tableHeaderTitle.map((colItem: ColumnsProps) =>
                  hiddenColumns.includes(colItem.accessor) ? null : (
                    <TableCell key={colItem.accessor}>
                      {colItem.Cell ? colItem.Cell(rowItem) : rowItem[colItem.accessor]}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
