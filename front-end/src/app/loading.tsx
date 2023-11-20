"use client"

import { Box } from "@mui/material"
import Image from "next/image"
import dots_loading from "@/assets/animations/dots_loading.gif"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Box sx={{
      display: 'grid',
      placeItems: 'center',
      textAlign: 'center'
  }}>
      <Image src={"/logo_criselegance_no_bg.svg"} alt={""} width={400} height={380} />
      <Image src={dots_loading} alt={""} width={60} height={60}/>
    </Box>
  )
}

