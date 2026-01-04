"use client"

import Wallet from "@/components/wallet";
import { getSolanaKeypair } from "@/lib/wallet";
import { generateMnemonic, validateMnemonic } from "bip39";
import { useEffect, useState } from "react";



export default function Home() {
  return <div>
    <Wallet/>
  </div>
}
