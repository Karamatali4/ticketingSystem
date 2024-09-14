import React from 'react'
import { Progress } from 'antd'
const TableSkeletion = () => {
  return (
    <>
      {[1,2,3,4,5].map((_,i) => <Progress key={i} status="active" showinfo={false} />)}
    </>
  )
}

export default TableSkeletion
