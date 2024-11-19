import { describe, expect, it } from "vitest";
import { TEST_CLIENT } from "~test/test-clients.js";
import { base } from "../../chains/chain-definitions/base.js";
import { NATIVE_TOKEN_ADDRESS } from "../../constants/addresses.js";
import { convertFiatToCrypto } from "./fiatToCrypto.js";

describe.runIf(process.env.TW_SECRET_KEY)("Pay: fiatToCrypto", () => {
  it("should convert fiat price to token on Ethereum mainnet", async () => {
    const result = await convertFiatToCrypto({
      chainId: 1,
      from: "usd",
      fromAmount: 1,
      to: NATIVE_TOKEN_ADDRESS,
      client: TEST_CLIENT,
    });
    expect(result).toBeDefined();
    // Should be a number
    expect(!Number.isNaN(result)).toBe(true);
    // Since eth is around US$3000, 1 USD should be around 0.0003
    // we give it some safe margin so the test won't be flaky
    expect(Number(result) < 0.001).toBe(true);
  });

  it("should convert fiat price to token on Base mainnet", async () => {
    const result = await convertFiatToCrypto({
      chainId: base.id,
      from: "usd",
      fromAmount: 1,
      to: NATIVE_TOKEN_ADDRESS,
      client: TEST_CLIENT,
    });

    expect(result).toBeDefined();
    // Should be a number
    expect(!Number.isNaN(result)).toBe(true);
    // Since eth is around US$3000, 1 USD should be around 0.0003
    // we give it some safe margin so the test won't be flaky
    expect(Number(result) < 0.001).toBe(true);
  });
});
