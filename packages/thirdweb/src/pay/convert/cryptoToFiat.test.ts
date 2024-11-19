import { describe, expect, it } from "vitest";
import { TEST_CLIENT } from "~test/test-clients.js";
import { base } from "../../chains/chain-definitions/base.js";
import { NATIVE_TOKEN_ADDRESS } from "../../constants/addresses.js";
import { convertCryptoToFiat } from "./cryptoToFiat.js";

describe.runIf(process.env.TW_SECRET_KEY)("Pay: crypto-to-fiat", () => {
  it("should convert ETH price to USD on Ethereum mainnet", async () => {
    const result = await convertCryptoToFiat({
      chainId: 1,
      fromTokenAddress: NATIVE_TOKEN_ADDRESS,
      fromAmount: 1,
      to: "usd",
      client: TEST_CLIENT,
    });
    expect(result).toBeDefined();
    // Should be a number
    expect(!Number.isNaN(result)).toBe(true);
    // Since eth is around US$3000, we can add a test to check if the price is greater than $1500 (as a safe margin)
    // let's hope that scenario does not happen :(
    expect(Number(result) > 1500).toBe(true);
  });

  it("should convert ETH price to USD on Base mainnet", async () => {
    const result = await convertCryptoToFiat({
      chainId: base.id,
      fromTokenAddress: NATIVE_TOKEN_ADDRESS,
      fromAmount: 1,
      to: "usd",
      client: TEST_CLIENT,
    });
    expect(result).toBeDefined();
    // Should be a number
    expect(!Number.isNaN(result)).toBe(true);
    // Since eth is around US$3000, we can add a test to check if the price is greater than $1500 (as a safe margin)
    // let's hope that scenario does not happen :(
    expect(Number(result) > 1500).toBe(true);
  });
});
