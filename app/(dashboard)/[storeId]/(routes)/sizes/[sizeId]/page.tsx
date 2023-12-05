import { db } from '@/lib/db'
import React from 'react'
import { SizeForm } from './_components/size-form';

const NewSize = async({
  params
}:{
  params: { sizeId: string }
}) => {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId
    }
  });


  return (
    <div className='flex-col'>
      <div className="flex-1 space-4 p-8 pt-6">
        <SizeForm initialData={size}/>
      </div>
    </div>
  )
}

export default NewSize