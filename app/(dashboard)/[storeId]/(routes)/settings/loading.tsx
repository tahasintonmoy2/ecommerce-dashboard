"use client";

import Loader from "@/components/ui/loader";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[26rem] w-full">
      <Loader />
    </div>
  );
};

export default Loading;
