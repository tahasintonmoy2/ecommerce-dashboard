import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import Navbar from '@/components/navbar';

export default async function DashboardLayout({
    children,
    params
  }: {
    children: React.ReactNode
    params: { storeId: string }
  }){
    const { userId } = auth()

    if (!userId) {
        redirect('/auth/sign-in')
    }

    const store = await db.store.findFirst({
        where:{
            id: params.storeId,
            userId,
        }
    })

    if (!store) {
        redirect('/')
    }

    return (
        <>
         <Navbar />
            {children}
        </>
    )
  }