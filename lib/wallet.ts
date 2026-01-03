import { mnemonicToSeedSync, generateMnemonic } from "bip39"
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";


export function getSeedFromMnemonic(mnemonic: string) {
    const genseed = mnemonicToSeedSync(mnemonic)
    
    
    return genseed
    
}

export function getSolanaKeypair(mnemonic: string, index:number) {
    const seed = getSeedFromMnemonic(mnemonic)
    const path = `m/44'/501'/${index}'/0'`; // This is the derivation path
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    return (Keypair.fromSecretKey(secret).publicKey.toBase58());

    
}

