# Web-Based Wallet (Solana HD Wallet)

[Live Demo](https://web-based-wallet-web3.vercel.app/)

A modern, secure, and user-friendly web-based wallet for the Solana blockchain. Built with Next.js, React, and Tailwind CSS, this wallet allows users to generate, import, and manage multiple Solana accounts using a single mnemonic phrase (HD wallet). All sensitive data is stored locally in the browser for maximum privacy.

---

## Features

- **Solana HD Wallet**: Generate or import a BIP39 mnemonic and derive multiple Solana accounts.
- **Account Management**: Add or remove accounts (derivation paths) on demand.
- **Secure Storage**: Mnemonic and account indices are stored in browser localStorage only.
- **Copy Address**: Easily copy public addresses to clipboard.
- **Show/Hide Private Key**: Toggle visibility of private keys for each account.
- **Dark/Light Theme**: Switch between dark and light modes.
- **Responsive UI**: Clean, modern, and mobile-friendly interface.

---

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [bip39](https://github.com/bitcoinjs/bip39) & [ed25519-hd-key](https://github.com/paulmillr/ed25519-hd-key)
- [Radix UI](https://www.radix-ui.com/) (for accessible UI primitives)
- [lucide-react](https://lucide.dev/) (icons)

---

## Getting Started

### 1. Clone the repository

```bash
# Using Git
https://github.com/your-username/webbasedwallet.git
cd webbasedwallet
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Usage

- **Generate Wallet**: Leave the mnemonic field empty and click "Generate Wallet" to create a new mnemonic phrase and first account.
- **Import Wallet**: Paste an existing BIP39 mnemonic and click "Import Wallet".
- **Add Account**: Click "Add Account" to derive a new Solana account from your mnemonic.
- **Delete Account**: Remove any account except the first (index 0).
- **Copy Address**: Click the copy icon next to an address.
- **Show/Hide Private Key**: Toggle the eye icon to reveal or hide the private key.

---

## Security & Privacy

- **Local-Only Storage**: All wallet data (mnemonic, account indices) is stored in your browser's localStorage. Nothing is ever sent to a server.
- **No Backend**: This is a fully client-side application.
- **Open Source**: Review the code for transparency and trust.

**Warning:** Never use this wallet for large amounts or as your primary wallet. For production use, prefer audited and battle-tested wallets.

---

## Deployment

This project is production-ready and can be deployed on [Vercel](https://vercel.com/) or any platform supporting Next.js.

---


## Acknowledgements

- [Solana Labs](https://solana.com/)
- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [lucide-react](https://lucide.dev/)

---

## Author

- [Haarush](https://github.com/your-username)

---

