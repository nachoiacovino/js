import type { Chain } from "../src/types";
export default {
  "name": "Deamchain Mainnet",
  "chain": "Deamchain",
  "icon": "deam",
  "rpc": [
    "https://deamchain.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://mainnet.deamchain.com"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Deamchain Native Token",
    "symbol": "DEAM",
    "decimals": 18
  },
  "infoURL": "https://deamchain.com",
  "shortName": "deam",
  "chainId": 136,
  "networkId": 136,
  "explorers": [
    {
      "name": "Deamchain Block Explorer",
      "url": "https://scan.deamchain.com",
      "standard": "EIP3091",
      "icon": "deam"
    }
  ],
  "testnet": false,
  "slug": "deamchain"
} as const satisfies Chain;