import { useCallback, useState } from "react";

interface BaseExecuteConfig {
  mode: "engine" | "session_key" | "webhook" | "client";
}

interface EngineConfig extends BaseExecuteConfig {
  mode: "engine";
  engine_url: string;
  engine_authorization_token: string;
  engine_backend_wallet_address: string;
}

interface SessionKeyConfig extends BaseExecuteConfig {
  mode: "session_key";
  smart_account_address: string;
  smart_account_factory_address: string;
  smart_account_session_key: string;
}

interface WebhookConfig extends BaseExecuteConfig {
  mode: "webhook";
  webhook_signing_url: string;
  webhook_metadata?: Record<string, unknown>;
  webhook_shared_secret?: string;
}

interface ClientConfig extends BaseExecuteConfig {
  mode: "client";
}

type ExecuteConfig =
  | EngineConfig
  | SessionKeyConfig
  | WebhookConfig
  | ClientConfig;

export function useExecuteConfig() {
  const [executeConfig, _setExecuteConfig] = useState<ExecuteConfig | null>(
    () => {
      // Try to load config from localStorage on initial render
      if (typeof window !== "undefined") {
        const savedConfig = localStorage.getItem("executeConfig");
        return savedConfig ? JSON.parse(savedConfig) : null;
      }
      return null;
    },
  );

  const setExecuteConfig = useCallback((config: ExecuteConfig) => {
    _setExecuteConfig(config);
    try {
      localStorage.setItem("executeConfig", JSON.stringify(config));
    } catch {
      // ignore
    }
  }, []);

  return [executeConfig, setExecuteConfig] as const;
}
