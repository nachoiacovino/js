import type { CoreServiceConfig } from "../api.js";
import type { AuthorizationResult } from "../authorize/types.js";
import type { UsageLimitResult } from "./types.js";

export async function usageLimit(
  authzResult: AuthorizationResult,
  serviceConfig: CoreServiceConfig,
): Promise<UsageLimitResult> {
  if (!authzResult.authorized) {
    return {
      usageLimited: false,
    };
  }

  const { apiKeyMeta, accountMeta } = authzResult;
  const { limits, usage } = apiKeyMeta || accountMeta || {};
  const { serviceScope } = serviceConfig;

  if (
    !usage ||
    !(serviceScope in usage) ||
    !limits ||
    !(serviceScope in limits)
  ) {
    // No usage limit is provided. Assume the request is not limited.
    return {
      usageLimited: false,
    };
  }

  if (
    serviceScope === "storage" &&
    (usage.storage?.sumFileSizeBytes ?? 0) > (limits.storage ?? 0)
  ) {
    return {
      usageLimited: true,
      status: 402,
      errorMessage: `You've used all of your total usage credits for Storage Pinning. Please add your payment method at https://thirdweb.com/team/~/~/settings/billing.`,
      errorCode: "PAYMENT_METHOD_REQUIRED",
    };
  }

  if (
    serviceScope === "embeddedWallets" &&
    (usage.embeddedWallets?.countWalletAddresses ?? 0) >
      (limits.embeddedWallets ?? 0)
  ) {
    return {
      usageLimited: true,
      status: 402,
      errorMessage: `You've used all of your total usage credits for Embedded Wallets. Please add your payment method at https://thirdweb.com/team/~/~/settings/billing.`,
      errorCode: "PAYMENT_METHOD_REQUIRED",
    };
  }

  return {
    usageLimited: false,
  };
}
