import type { Address } from "abitype";
import type { ThirdwebClient } from "../../client/client.js";
import { getClientFetch } from "../../utils/fetch.js";
import { getPayConvertCryptoToFiatEndpoint } from "../utils/definitions.js";

export type ConvertCryptoToFiatParams = {
  client: ThirdwebClient;
  /**
   * The contract address of the token
   * For native token, use NATIVE_TOKEN_ADDRESS
   */
  fromTokenAddress: Address;
  fromAmount: number;
  /**
   * The chainId that the token is deployed to
   */
  chainId: number;
  /**
   * The fiat symbol. e.g "usd"
   */
  to: string;
};

export async function convertCryptoToFiat(options: ConvertCryptoToFiatParams) {
  const { client, fromTokenAddress, to, chainId, fromAmount } = options;
  try {
    const queryString = new URLSearchParams({
      fromTokenAddress,
      to,
      chainId: String(chainId),
      fromAmount: String(fromAmount),
    }).toString();
    const url = `${getPayConvertCryptoToFiatEndpoint()}?${queryString}`;
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
