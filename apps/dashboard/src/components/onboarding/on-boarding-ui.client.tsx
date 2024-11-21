"use client";
import { cn } from "@/lib/utils";
import type { Account } from "@3rdweb-sdk/react/hooks/useApi";
import { useState } from "react";
import { useTrack } from "../../hooks/analytics/useTrack";
import { OnboardingChoosePlan } from "./ChoosePlan";
import { OnboardingConfirmEmail } from "./ConfirmEmail";
import { OnboardingGeneral } from "./General";
import { OnboardingLinkWallet } from "./LinkWallet";
import type { OnboardingScreen } from "./types";
import { useSkipOnboarding } from "./useSkipOnboarding";

function OnboardingUI(props: {
  account: Account;
  onComplete: () => void;
}) {
  const { account } = props;
  const [screen, setScreen] = useState<OnboardingScreen>({ id: "onboarding" });

  const trackEvent = useTrack();
  const [updatedEmail, setUpdatedEmail] = useState<string | undefined>();
  const skipOnboarding = useSkipOnboarding();

  function trackOnboardingStep(params: {
    nextStep: OnboardingScreen["id"];
    email?: string;
  }) {
    trackEvent({
      category: "account",
      action: "onboardingStep",
      label: "next",
      data: {
        email: params.email || account.unconfirmedEmail || updatedEmail,
        currentStep: screen,
        nextStep: params.nextStep,
      },
    });
  }

  const handleDuplicateEmail = (email: string) => {
    setScreen({
      id: "linking",
    });
    trackOnboardingStep({
      nextStep: "linking",
      email,
    });
  };

  return (
    <div
      className={cn(
        "relative w-screen rounded-lg border border-border bg-background p-4 lg:p-6",
        screen.id === "plan" ? "max-w-[750px]" : "max-w-[500px]",
      )}
    >
      {screen.id === "onboarding" && (
        <OnboardingGeneral
          account={account}
          onSave={(email) => {
            setUpdatedEmail(email);
            setScreen({
              id: "confirming",
            });
            trackOnboardingStep({
              nextStep: "confirming",
              email,
            });
          }}
          onDuplicate={(email) => {
            setUpdatedEmail(email);
            handleDuplicateEmail(email);
          }}
        />
      )}

      {screen.id === "linking" && (
        <OnboardingLinkWallet
          onSave={() => {
            setScreen({
              id: "confirmLinking",
            });
            trackOnboardingStep({
              nextStep: "confirmLinking",
            });
          }}
          onBack={() => {
            setUpdatedEmail(undefined);
            setScreen({
              id: "onboarding",
            });
          }}
          email={updatedEmail as string}
        />
      )}

      {/* TODO - separate the confirming and  confirmLinking into separate components  */}
      {(screen.id === "confirming" || screen.id === "confirmLinking") && (
        <OnboardingConfirmEmail
          linking={screen.id === "confirmLinking"}
          onComplete={props.onComplete}
          onEmailConfirm={(res) => {
            if (screen.id === "confirmLinking") {
              props.onComplete();
            } else if (screen.id === "confirming") {
              if (account.onboardSkipped) {
                props.onComplete();
              } else {
                setScreen({ id: "plan", team: res.team });
              }
            }
          }}
          onBack={() =>
            setScreen({
              id: "onboarding",
            })
          }
          email={(account.unconfirmedEmail || updatedEmail) as string}
        />
      )}

      {screen.id === "plan" && (
        <OnboardingChoosePlan
          teamSlug={screen.team.slug}
          skipPlan={async () => {
            await skipOnboarding().catch(() => {});
            props.onComplete();
          }}
          canTrialGrowth={true}
        />
      )}
    </div>
  );
}

export default OnboardingUI;
