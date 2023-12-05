import { db } from '@/lib/db'
import React from 'react'
import { ColorForm } from './_components/color-form';

const NewColor = async({
  params
}:{
  params: { colorId: string }
}) => {
  const color = await db.color.findUnique({
    where: {
      id: params.colorId
    }
  });


  return (
    <div className='flex-col'>
      <div className="flex-1 space-4 p-8 pt-6">
        <ColorForm initialData={color}/>
      </div>
    </div>
  )
}

export default NewColor