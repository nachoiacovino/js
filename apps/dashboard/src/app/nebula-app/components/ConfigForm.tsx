import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabButtons } from "@/components/ui/tabs";
import { useState } from "react";

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

export default function ConfigForm({
  onSubmit,
  onClose,
  initialConfig,
}: {
  onSubmit: (config: ExecuteConfig) => void;
  onClose: () => void;
  initialConfig?: ExecuteConfig;
}) {
  const [activeTab, setActiveTab] = useState<ExecuteConfig["mode"]>(
    initialConfig?.mode || "engine",
  );

  const [engineForm, setEngineForm] = useState<Omit<EngineConfig, "mode">>({
    engine_url:
      (initialConfig?.mode === "engine" && initialConfig.engine_url) || "",
    engine_authorization_token:
      (initialConfig?.mode === "engine" &&
        initialConfig.engine_authorization_token) ||
      "",
    engine_backend_wallet_address:
      (initialConfig?.mode === "engine" &&
        initialConfig.engine_backend_wallet_address) ||
      "",
  });

  const [sessionKeyForm, setSessionKeyForm] = useState<
    Omit<SessionKeyConfig, "mode">
  >({
    smart_account_address:
      (initialConfig?.mode === "session_key" &&
        initialConfig.smart_account_address) ||
      "",
    smart_account_factory_address:
      (initialConfig?.mode === "session_key" &&
        initialConfig.smart_account_factory_address) ||
      "",
    smart_account_session_key:
      (initialConfig?.mode === "session_key" &&
        initialConfig.smart_account_session_key) ||
      "",
  });

  const [webhookForm, setWebhookForm] = useState<Omit<WebhookConfig, "mode">>({
    webhook_signing_url:
      (initialConfig?.mode === "webhook" &&
        initialConfig.webhook_signing_url) ||
      "",
    webhook_metadata:
      (initialConfig?.mode === "webhook" && initialConfig.webhook_metadata) ||
      undefined,
    webhook_shared_secret:
      (initialConfig?.mode === "webhook" &&
        initialConfig.webhook_shared_secret) ||
      undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let config: ExecuteConfig;

    switch (activeTab) {
      case "engine":
        config = {
          mode: "engine",
          ...engineForm,
          // Remove trailing slash from engine_url if present
          engine_url: engineForm.engine_url.replace(/\/$/, ""),
        };
        break;
      case "session_key":
        config = { mode: "session_key", ...sessionKeyForm };
        break;
      case "webhook":
        config = { mode: "webhook", ...webhookForm };
        break;
      case "client":
        config = { mode: "client" };
        break;
      default:
        throw new Error("Invalid mode");
    }

    onSubmit(config);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TabButtons
        tabs={[
          {
            name: "Engine",
            onClick: () => setActiveTab("engine"),
            isActive: activeTab === "engine",
            isEnabled: true,
          },
          {
            name: "Session Key",
            onClick: () => setActiveTab("session_key"),
            isActive: activeTab === "session_key",
            isEnabled: true,
          },
          {
            name: "Webhook",
            onClick: () => setActiveTab("webhook"),
            isActive: activeTab === "webhook",
            isEnabled: true,
          },
          {
            name: "Client",
            onClick: () => setActiveTab("client"),
            isActive: activeTab === "client",
            isEnabled: true,
          },
        ]}
      />

      {activeTab === "engine" && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="engine_url"
              className="mb-1 block font-medium text-sm"
            >
              Engine URL
            </label>
            <Input
              id="engine_url"
              value={engineForm.engine_url}
              onChange={(e) =>
                setEngineForm((prev) => ({
                  ...prev,
                  engine_url: e.target.value,
                }))
              }
              required
            />
          </div>
          <div>
            <label
              htmlFor="engine_authorization_token"
              className="mb-1 block font-medium text-sm"
            >
              Engine Authorization Token
            </label>
            <Input
              id="engine_authorization_token"
              value={engineForm.engine_authorization_token}
              onChange={(e) =>
                setEngineForm((prev) => ({
                  ...prev,
                  engine_authorization_token: e.target.value,
                }))
              }
              required
            />
          </div>
          <div>
            <label
              htmlFor="engine_backend_wallet_address"
              className="mb-1 block font-medium text-sm"
            >
              Engine Backend Wallet Address
            </label>
            <Input
              id="engine_backend_wallet_address"
              value={engineForm.engine_backend_wallet_address}
              onChange={(e) =>
                setEngineForm((prev) => ({
                  ...prev,
                  engine_backend_wallet_address: e.target.value,
                }))
              }
              required
            />
          </div>
        </div>
      )}

      {activeTab === "session_key" && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="smart_account_address"
              className="mb-1 block font-medium text-gray-400 text-sm"
            >
              Smart Account Address
            </label>
            <Input
              id="smart_account_address"
              value={sessionKeyForm.smart_account_address}
              onChange={(e) =>
                setSessionKeyForm((prev) => ({
                  ...prev,
                  smart_account_address: e.target.value,
                }))
              }
              required
              disabled
              className="opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="smart_account_factory_address"
              className="mb-1 block font-medium text-gray-400 text-sm"
            >
              Smart Account Factory Address
            </label>
            <Input
              id="smart_account_factory_address"
              value={sessionKeyForm.smart_account_factory_address}
              onChange={(e) =>
                setSessionKeyForm((prev) => ({
                  ...prev,
                  smart_account_factory_address: e.target.value,
                }))
              }
              required
              disabled
              className="opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="smart_account_session_key"
              className="mb-1 block font-medium text-gray-400 text-sm"
            >
              Smart Account Session Key
            </label>
            <Input
              id="smart_account_session_key"
              value={sessionKeyForm.smart_account_session_key}
              onChange={(e) =>
                setSessionKeyForm((prev) => ({
                  ...prev,
                  smart_account_session_key: e.target.value,
                }))
              }
              required
              disabled
              className="opacity-50"
            />
          </div>
          <p className="mt-2 text-sm text-yellow-500">
            Session Key configuration coming soon...
          </p>
        </div>
      )}

      {activeTab === "webhook" && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="webhook_signing_url"
              className="mb-1 block font-medium text-gray-400 text-sm"
            >
              Webhook Signing URL
            </label>
            <Input
              id="webhook_signing_url"
              value={webhookForm.webhook_signing_url}
              onChange={(e) =>
                setWebhookForm((prev) => ({
                  ...prev,
                  webhook_signing_url: e.target.value,
                }))
              }
              required
              disabled
              className="opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="webhook_shared_secret"
              className="mb-1 block font-medium text-gray-400 text-sm"
            >
              Webhook Shared Secret (Optional)
            </label>
            <Input
              id="webhook_shared_secret"
              value={webhookForm.webhook_shared_secret || ""}
              onChange={(e) =>
                setWebhookForm((prev) => ({
                  ...prev,
                  webhook_shared_secret: e.target.value,
                }))
              }
              disabled
              className="opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="webhook_metadata"
              className="mb-1 block font-medium text-gray-400 text-sm"
            >
              Webhook Metadata (Optional JSON)
            </label>
            <Input
              id="webhook_metadata"
              value={
                webhookForm.webhook_metadata
                  ? JSON.stringify(webhookForm.webhook_metadata)
                  : ""
              }
              onChange={(e) => {
                try {
                  const metadata = e.target.value
                    ? JSON.parse(e.target.value)
                    : undefined;
                  setWebhookForm((prev) => ({
                    ...prev,
                    webhook_metadata: metadata,
                  }));
                } catch (error) {
                  console.error("Invalid JSON:", error);
                }
              }}
              placeholder="{}"
              disabled
              className="opacity-50"
            />
          </div>
          <p className="mt-2 text-sm text-yellow-500">
            Webhook configuration coming soon...
          </p>
        </div>
      )}

      {activeTab === "client" && (
        <p className="text-sm text-yellow-500">
          Client mode configuration coming soon...
        </p>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {initialConfig ? "Update Configuration" : "Save Configuration"}
        </Button>
      </div>
    </form>
  );
}
