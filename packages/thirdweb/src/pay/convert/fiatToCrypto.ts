import type { Address } from "abitype";
import type { ThirdwebClient } from "../../client/client.js";
import { getClientFetch } from "../../utils/fetch.js";
import { getPayConvertFiatToCryptoEndpoint } from "../utils/definitions.js";

export type ConvertFiatToCryptoParams = {
  client: ThirdwebClient;
  /**
   * The fiat symbol. e.g: "usd"
   */
  from: string;
  fromAmount: number;
  /**
   * The token address
   * For native token, use NATIVE_TOKEN_ADDRESS
   */
  to: Address;
  /**
   * The chainId that the token is deployed to
   */
  chainId: number;
};

/**
 *
 * @param options
 * @returns
 */
export async function convertFiatToCrypto(options: ConvertFiatToCryptoParams) {
  const { client, from, to, chainId, fromAmount } = options;
  try {
    const queryString = new URLSearchParams({
      from,
      to,
      chainId: String(chainId),
      fromAmount: String(fromAmount),
    }).toString();
    const url = `${getPayConvertFiatToCryptoEndpoint()}?${queryString}`;
    const response = await getClientFetch(client)(url);
    if (!response.ok) {
      response.body?.cancel();
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: string = (await response.json()).result;
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error(`Fetch failed: ${error}`);
  }
}
