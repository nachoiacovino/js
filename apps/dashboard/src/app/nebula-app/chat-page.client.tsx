"use client";
import { CustomConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { useState } from "react";
import ExecuteTab from "./components/ExecuteTab";
import { useExecuteConfig } from "./hooks/useExecuteConfig";

export function ChatPage() {
  const [executeMessages, setExecuteMessages] = useState<
    Array<{ text: string; sender: "user" | "chat" | "error" }>
  >([]);

  const [executeInputValue, setExecuteInputValue] = useState("");
  const [executeIsLoading, setExecuteIsLoading] = useState(false);
  const [executeSessionId, setExecuteSessionId] = useState<string | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [executeConfig, setExecuteConfig] = useExecuteConfig();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left  */}
      <aside className="hidden w-[260px] border-r bg-muted/50 md:block">
        <div className="p-4">
          <div className="flex flex-col gap-3">
            <CustomConnectWallet />
          </div>
        </div>
      </aside>

      {/* Right */}
      <ExecuteTab
        messages={executeMessages}
        setMessages={setExecuteMessages}
        inputValue={executeInputValue}
        setInputValue={setExecuteInputValue}
        isLoading={executeIsLoading}
        setIsLoading={setExecuteIsLoading}
        sessionId={executeSessionId}
        setSessionId={setExecuteSessionId}
        config={executeConfig}
        setConfig={setExecuteConfig}
        isConfigModalOpen={isConfigModalOpen}
        setIsConfigModalOpen={setIsConfigModalOpen}
      />
    </div>
  );
}
