"use client"

import { getSolanaKeypair } from "@/lib/wallet";
import { generateMnemonic, validateMnemonic } from "bip39";
import { useEffect, useState } from "react";

export default function Home() {

  const [mnemonic, setmnemonic] = useState<string | null>(null)
  const [Inputmnemonic, setInputMnemonic] = useState<string>("")
  const [accountIndices, setAccountIndices] = useState<number[]>([0]);



useEffect(() => {
  if (mnemonic) {
    setAccountIndices([0]);
  }
}, [mnemonic]);





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




  useEffect(()=>{
    const storedMnemonic = localStorage.getItem("mnemonic")

    if(storedMnemonic){
      setmnemonic(storedMnemonic)
    }

  },[])



  return (
    <div>
      {mnemonic? <>
      <button onClick={handleAddAccount}>Add Account</button>
      {accountIndices.map((idx) => {
        const address = getSolanaKeypair(mnemonic, idx);
        return (
          <div key={idx}>
            <p>
              <strong>Account {idx}</strong>: {address}
            </p>
            {idx !== 0 && (
              <button onClick={() => handleDeleteAccount(idx)}>
                Delete
              </button>
            )}
          </div>
        );
      })}

      </> : 
        <div>
          <textarea
            rows={3}
            placeholder="Paste mnemonic here or leave empty to generate new ones"
            value={Inputmnemonic}
            onChange={(e) => setInputMnemonic(e.target.value)}
          />
          <button onClick={handleImport}>
            {Inputmnemonic.trim() !=="" ? "Import wallet" : "Generate wallet"}
            
          </button>

        </div>
      }
    </div>

  );
}
