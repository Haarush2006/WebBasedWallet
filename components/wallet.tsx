"use client"

import { getSolanaKeypair } from "@/lib/wallet";
import { generateMnemonic, validateMnemonic } from "bip39";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, Eye, EyeOff, Plus } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";



export default function wallet() {
  
  const [mnemonic, setmnemonic] = useState<string | null>(null)
  const [Inputmnemonic, setInputMnemonic] = useState<string>("")
  const [accountIndices, setAccountIndices] = useState<number[]>([0]);



  
  useEffect(() => {
    const storedMnemonic = localStorage.getItem("mnemonic");
    const storedIndices = localStorage.getItem("accountIndices");

  if (storedMnemonic) setmnemonic(storedMnemonic);
  if (storedIndices) setAccountIndices(JSON.parse(storedIndices));
}, []);






  const handleImport = () =>{
    
    const trimmed = Inputmnemonic.trim()

    if(trimmed === ""){

      const NewMnemonics = generateMnemonic(128)
      localStorage.setItem("mnemonic",NewMnemonics)
      

      setmnemonic(NewMnemonics)
      setInputMnemonic("")
      
    }
    else{
      if(!validateMnemonic(trimmed)){
        alert("Invalid mnemonics")
        return
      }
      
      localStorage.setItem("mnemonic", trimmed)
      setmnemonic(trimmed)
      setInputMnemonic("")
    }

    
  }
  const handleDeleteAccount = (idx: number) => {
    if (idx === 0) return; // never delete account 0
    setAccountIndices((prev) => prev.filter((i) => i !== idx));
  };
  

  const handleAddAccount = () => {
  const nextIndex = Math.max(...accountIndices) + 1;
  setAccountIndices((prev) => [...prev, nextIndex]);
};





  useEffect(() => {
  localStorage.setItem(
    "accountIndices",
    JSON.stringify(accountIndices)
  );
}, [accountIndices]);



    return (
        <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
    <div className="flex items-center justify-between">
        <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
            Web Wallet
            </h1>
            <Badge variant="secondary">Solana • HD Wallet</Badge>
        </div>

        <ThemeToggle />
    </div>

    <Separator />

    {/* If mnemonic not present → import / generate */}
    {!mnemonic && (
      <Card>
        <CardHeader>
          <CardTitle>Secret Recovery Phrase</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            rows={3}
            className="w-full rounded-md border p-2"
            placeholder="Paste mnemonic here or leave empty to generate new ones"
            value={Inputmnemonic}
            onChange={(e) => setInputMnemonic(e.target.value)}
          />
          <Button onClick={handleImport} className="w-full">
            {Inputmnemonic.trim() !== ""
              ? "Import Wallet"
              : "Generate Wallet"}
          </Button>
        </CardContent>
      </Card>
    )}

    {/* Wallet list */}
    {mnemonic && (
      <>
        {/* Actions */}
        <div className="flex justify-end">
          <Button onClick={handleAddAccount}>
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </div>

        {/* Accounts */}
        <div className="grid gap-4">
          {accountIndices.map((idx) => {
            const {publicKey, privateKey} = getSolanaKeypair(mnemonic, idx);

            return (
              <WalletCard
                key={idx}
                index={idx}
                address={publicKey}
                privateKey={privateKey}
                onDelete={() => handleDeleteAccount(idx)}
              />
            );
          })}
        </div>
      </>
    )}
  </div>
);



}




function WalletCard({
  index,
  address,
  privateKey,
  onDelete,
}: {
  index: number;
  address: string;
  privateKey: string;
  onDelete: () => void;
}) {
  const [show, setShow] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <Card className="transition hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Account {index}</CardTitle>
        <Badge variant="outline">Solana</Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Address */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Address</p>
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono truncate">{address}</p>
            <Button size="icon" variant="ghost" onClick={copy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Private key placeholder (Kosh-style) */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Private Key</p>
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono truncate">
              {show ? privateKey : "••••••••••••••••"}
            </p>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {index !== 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
          >
            Delete Account
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
