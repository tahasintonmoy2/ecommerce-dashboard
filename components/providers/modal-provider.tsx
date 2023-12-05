"use client"

import { useState, useEffect } from "react";
import { StoreModal } from "@/components/models/store-modal";
import React from 'react'
import { BillboardImageModal } from "@/components/models/billboard-image-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null;
    }

  return (
    <>
        <StoreModal />
        <BillboardImageModal />
    </>
  )
}
