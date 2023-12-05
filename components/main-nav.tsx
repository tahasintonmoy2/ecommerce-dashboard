"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

export const MainNav = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
            label: 'Overview',
            href: `/${params.storeId}`,
            active: pathname === `/${params.storeId}`
        },        {
            label: 'Billboards',
            href: `/${params.storeId}/billboards`,
            active: pathname === `/${params.storeId}/billboards`
        },        {
            label: 'Categories',
            href: `/${params.storeId}/categories`,
            active: pathname === `/${params.storeId}/categories`
        },        {
            label: 'Colors',
            href: `/${params.storeId}/colors`,
            active: pathname === `/${params.storeId}/colors`
        },        {
            label: 'Sizes',
            href: `/${params.storeId}/sizes`,
            active: pathname === `/${params.storeId}/sizes`
        },        {
            label: 'Products',
            href: `/${params.storeId}/products`,
            active: pathname === `/${params.storeId}/products`
        },        {
            label: 'Orders',
            href: `/${params.storeId}/orders`,
            active: pathname === `/${params.storeId}/orders`
        },        {
            label: 'Settings',
            href: `/${params.storeId}/settings`,
            active: pathname === `/${params.storeId}/settings`
        },
    ]

  return (
    <nav
       className={cn("flex items-center space-x-4 lg:space-x-6", className)}
       {...props}
    >
        {routes.map((route)=> (
            <Link 
                href={route.href} 
                key={route.href}
                className={cn(
                    "font-semibold transition-colors dark:hover:bg-slate-600/30 hover:bg-slate-200 dark:hover:text-white px-2 py-1.5 rounded-md",
                    route.active ? 'dark:text-white text-blue-600 bg-slate-200 dark:bg-slate-600/30': 'text-muted-foreground'
                )}>
                {route.label}
            </Link>
        ))}
    </nav>
  )
}