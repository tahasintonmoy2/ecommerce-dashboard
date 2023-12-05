"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useBillboardImage } from "@/hooks/use-billboard-image";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";

export const BillboardImageModal = () => {
    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const billboardImage = useBillboardImage();
    const { edgestore } = useEdgeStore();

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        billboardImage.onClose();
    }

    const onChange =async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file)

            await edgestore.publicFiles.upload({
                file,
                options:{
                    replaceTargetUrl: billboardImage.url
                }
            });

            onClose();
        }
    }

  return (
    <Dialog open={billboardImage.isOpen} onOpenChange={billboardImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center font-semibold">
            Upload Image
          </h2>
        </DialogHeader>
         <SingleImageDropzone 
           className="w-full outline-none"
           disabled={isSubmitting}
           value={file}
           onChange={onChange}
         />
      </DialogContent>
    </Dialog>
  );
};
