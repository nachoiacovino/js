/* eslint-disable no-restricted-syntax */
import { ScrollShadow } from "@/components/ui/ScrollShadow/ScrollShadow";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import ConfigForm from "./ConfigForm";

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

function ExecuteTab({
  messages,
  setMessages,
  inputValue,
  setInputValue,
  isLoading,
  setIsLoading,
  sessionId,
  setSessionId,
  config,
  setConfig,
  isConfigModalOpen,
  setIsConfigModalOpen,
}: {
  messages: Array<{ text: string; sender: "user" | "chat" | "error" }>;
  setMessages: React.Dispatch<
    React.SetStateAction<
      Array<{ text: string; sender: "user" | "chat" | "error" }>
    >
  >;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sessionId: string | null;
  setSessionId: React.Dispatch<React.SetStateAction<string | null>>;
  config: ExecuteConfig | null;
  setConfig: (config: ExecuteConfig) => void;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const createSession = async () => {
    const response = await fetch("/api/nebula/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_id: "default-user",
        config: config,
        action: "create_session",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("ExecuteTab - Session created:", data);

    if (data.result?.id) {
      setSessionId(data.result.id);
      return data.result.id;
    }

    throw new Error("No session ID returned from session creation");
  };

  const sendMessage = async () => {
    if (inputValue.trim()) {
      setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);
      setInputValue("");
      setIsLoading(true);

      try {
        // Ensure we have a session ID
        let currentSessionId = sessionId;
        if (!currentSessionId) {
          console.log("ExecuteTab - No session ID found, creating new session");
          currentSessionId = await createSession();
        }

        console.log("ExecuteTab - Using session ID:", currentSessionId);

        const response = await fetch("/api/nebula/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            message: inputValue,
            user_id: "default-user",
            session_id: currentSessionId,
            config: config,
            can_execute: true,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("ExecuteTab - Execute response:", data);
        setMessages((prev) => [
          ...prev,
          { text: data.message, sender: "chat" },
        ]);
      } catch (error) {
        console.error("ExecuteTab - Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: `Error: ${error instanceof Error ? error.message : "Failed to execute command"}`,
            sender: "error",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleConfigSubmit = async (newConfig: ExecuteConfig) => {
    try {
      setIsLoading(true);
      setConfig(newConfig);

      if (!sessionId) {
        // If no session exists, create a new one
        console.log("ExecuteTab - Creating new session for config");
        await createSession();
      } else {
        // If session exists, update it
        console.log("ExecuteTab - Updating existing session:", sessionId);

        const response = await fetch("/api/nebula/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            user_id: "default-user",
            session_id: sessionId,
            config: newConfig,
            action: "update_session",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("ExecuteTab - Session updated:", data);

        if (data.result?.session_id) {
          setSessionId(data.result.session_id);
        }
      }

      setConfig(newConfig);
      console.log("ExecuteTab - Config updated successfully");
    } catch (error) {
      console.error("ExecuteTab - Config update error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: `Error: Failed to ${sessionId ? "update" : "create"} session`,
          sender: "error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setSessionId(null);
    console.log(
      "Execute chat cleared, session reset, config preserved:",
      config,
    );
  };

  return (
    <div className="container relative flex max-w-[800px] grow flex-col overflow-hidden rounded-lg border py-6">
      <ScrollShadow
        className="flex-1"
        scrollableClassName="max-h-full"
        shadowColor="hsl(var(--background)/50%)"
      >
        {messages.map((message, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className={`mb-2 inline-block rounded-lg p-2 shadow-lg ${
              message.sender === "user"
                ? "float-right ml-auto border border-white text-right text-white"
                : message.sender === "error"
                  ? "border border-red-600 bg-red-800 text-white"
                  : "border border-[rgba(242,19,164,0.25)] bg-[rgba(242,19,164,0.25)] text-left text-white"
            } break-words`}
          >
            {message.sender === "chat" ? (
              <ReactMarkdown className="whitespace-pre-wrap">
                {message.text.replace(/\n{2,}/g, "\n\n")}
              </ReactMarkdown>
            ) : (
              <span className="whitespace-pre-wrap">{message.text}</span>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Scroll anchor */}
      </ScrollShadow>

      <div className="h-5" />

      <div className="">
        <Textarea
          placeholder={"Type your message..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isLoading) {
              sendMessage();
            }
          }}
          className="grow"
          disabled={isLoading}
        />

        <div className="h-4" />

        <div className="flex gap-3">
          <Button onClick={clearChat} variant="outline" disabled={isLoading}>
            Reset
          </Button>

          <Dialog open={isConfigModalOpen} onOpenChange={setIsConfigModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="">
                {config ? "Show Config" : "Set Config"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {config
                    ? "Update Execute Configuration"
                    : "Set Execute Configuration"}
                </DialogTitle>
                <DialogDescription>
                  Please enter your thirdweb API key to continue.
                </DialogDescription>
              </DialogHeader>
              <ConfigForm
                onSubmit={handleConfigSubmit}
                onClose={() => setIsConfigModalOpen(false)}
                initialConfig={config || undefined}
              />
            </DialogContent>
          </Dialog>

          <Button onClick={sendMessage} disabled={isLoading}>
            {isLoading ? <Spinner className="size-4" /> : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExecuteTab;
