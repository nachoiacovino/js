"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { THIRDWEB_ANALYTICS_API_HOST } from "constants/urls";
import { motion } from "framer-motion";
import { Users2 } from "lucide-react";
import { Building } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import {
  type SubmitHandler,
  type UseFormRegister,
  useForm,
} from "react-hook-form";
import { getCookie } from "stores/SyncStoreToCookies";
import { Blobbie } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { z } from "zod";

const interestValues = [
  {
    key: "SOCIAL_LOGIN",
    label: "Social Login",
    description:
      "Let users login to your app with Email, Phone, Telegram, and more",
  },
  {
    key: "WALLET_CONECTORS",
    label: "Wallet Connectors",
    description: "Allow users to connect to over 350 web3 wallets",
  },
  {
    key: "SPONSOR_TRANSACTIONS",
    label: "Sponsor Transactions",
    description:
      "Abstract away signatures & gas using Account Abstraction and set up sponsorship rules",
  },
  {
    key: "UNIFIED_IDENTITY",
    label: "Unified Identity",
    description:
      "Enable your users to link multiple onchain and offchain identities to a single ID",
  },
  {
    key: "CUSTOM_AUTH",
    label: "Custom Auth",
    description: "Authenticate with your backend using SIWE or JWT",
  },
  {
    key: "QUERY_BLOCKCHAIN_DATA",
    label: "Query Blockchain Data",
    description: "All your data are belong to us",
  },
  {
    key: "AUTO_TXN_MGMT",
    label: "Automated Transaction Management",
    description: "Scale transaction throughput with nonce management",
  },
  {
    key: "GAMING_TOOLS",
    label: "Gaming Tools",
    description: "Everything you need to build a game",
  },
  {
    key: "TOKEN_SWAPS",
    label: "Token Swaps",
    description:
      "Bridge to and from tokens on any EVM, directly in your application",
  },
  {
    key: "FIAT_ONRAMPS",
    label: "Fiat Onramps",
    description:
      "Allow users to purchase with a credit card within your application.",
  },
];

const formSchema = z.object({
  email: z.string().email("Email is not valid").optional(),
  userType: z.string().optional(),
  name: z
    .string()
    .refine((name) => /^[a-zA-Z0-9 ]*$/.test(name), {
      message: "Name can only contain letters, numbers and spaces",
    })
    .optional(),
  role: z.string().optional(),
  industry: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

interface FormData {
  email: string;
  userType: string;
  name: string;
  role: string;
  industry: string;
  interests: string[];
}

interface StepProps {
  register: UseFormRegister<FormData>;
}

// Displays the radio item as a button-like element
const RadioGroupItemButton = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "group flex min-w-32 cursor-pointer items-center space-x-3 space-y-0 rounded-md border-2 px-3 py-4 font-medium transition-all hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer-hover:border-nonce data-[state=checked]:border-inverted",
        className,
      )}
      {...props}
    >
      <Label className="cursor-pointer">{props.children}</Label>
    </RadioGroupPrimitive.Item>
  );
});

function isValidRedirectPath(encodedPath: string): boolean {
  try {
    // Decode the URI component
    const decodedPath = decodeURIComponent(encodedPath);
    // ensure the path always starts with a _single_ slash
    // dobule slash could be interpreted as `//example.com` which is not allowed
    return decodedPath.startsWith("/") && !decodedPath.startsWith("//");
  } catch {
    // If decoding fails, return false
    return false;
  }
}

export default function OnboardingPage({
  searchParams,
}: { searchParams: { email: string | undefined; next: string | undefined } }) {
  const accountQuery = useAccount();
  const [step, setStep] = useState(searchParams.email ? 2 : 1);
  const [direction, setDirection] = useState(1);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: [],
      email: searchParams.email ?? "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    const res = await fetch(
      `${THIRDWEB_ANALYTICS_API_HOST}/v1/preferences/account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: accountQuery.data?.id,
          userType: data.userType,
          role: data.role,
          industry: data.industry,
          name: data.name,
          email: data.email,
          interests: data.interests,
        }),
      },
    );
    const json = await res.json();

    if (res.status !== 200) {
      throw new Error(json.message);
    }

    if (searchParams.next && isValidRedirectPath(searchParams.next)) {
      router.replace(searchParams.next);
    } else {
      const dashboardType = getCookie("x-dashboard-type");
      if (dashboardType === "team") {
        router.push("/team");
      } else {
        router.push("/dashboard");
      }
    }
  };

  const watchInterests = form.watch("interests");

  const Footer: React.FC = () => {
    return (
      <div className="absolute right-0 bottom-0 left-0 box-border flex w-full items-center justify-between overflow-auto p-12">
        {/* Stepper */}
        <div className="flex space-x-4">
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            key={"step-2"}
            onClick={() => {
              if (step > 2) {
                setDirection(-1);
              } else {
                setDirection(1);
              }
              setStep(2);
            }}
            className={
              step === 2
                ? "h-3 w-12 rounded-md bg-white transition ease-in-out"
                : "h-3 w-12 rounded-md bg-secondary transition ease-in-out"
            }
          />
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            key={"step-3"}
            onClick={() => {
              if (step > 3) {
                setDirection(-1);
              } else {
                setDirection(1);
              }
              setStep(3);
            }}
            className={
              step === 3
                ? "h-3 w-12 rounded-md bg-white transition ease-in-out"
                : "h-3 w-12 rounded-md bg-secondary transition ease-in-out"
            }
          />
        </div>
        <div className="flex space-x-4">
          {step < 3 && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setDirection(1);
                setStep(step + 1);
              }}
            >
              Skip
            </Button>
          )}
          {step < 3 && (
            <Button type="button" variant="primary" onClick={nextStep}>
              Next
            </Button>
          )}
          {step === 3 && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setDirection(-1);
                setStep(step - 1);
              }}
            >
              Back
            </Button>
          )}
          {step === 3 && (
            <Button
              type="submit"
              variant="primary"
              onClick={form.handleSubmit(onSubmit)}
            >
              Finish
            </Button>
          )}
        </div>
      </div>
    );
  };

  const nextStep = async () => {
    const fields =
      step === 1
        ? ["email"]
        : step === 2
          ? ["userType", "name", "role", "industry"]
          : ["interests"];
    const isStepValid = await form.trigger(fields as Array<keyof FormData>);
    if (isStepValid) {
      setDirection(1);
      setStep(step + 1);
      fields.map((field) => {
        form.register(field as keyof FormData);
      });
    }
  };

  const Step1: React.FC = () => (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem className="box-border flex-col space-y-2">
          <FormLabel>What's your email?</FormLabel>
          <FormControl>
            <Input
              className="w-1/2 min-w-[250px]"
              {...field}
              id="email"
              type="email"
              placeholder="user@example.com"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const Step2: React.FC<StepProps> = ({ register }) => (
    <div className="flex max-h-[450px] flex-col space-y-8 overflow-y-scroll sm:max-h-full">
      {/* User Type */}
      <FormField
        name="userType"
        control={form.control}
        render={() => (
          <FormItem>
            <FormControl>
              <RadioGroup
                defaultValue={form.getValues("userType")}
                className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                onValueChange={(value) => form.setValue("userType", value)}
              >
                <RadioGroupItemButton
                  value="Developer"
                  className="w-full items-center justify-center rounded-xl border border-foreground/25 p-4 hover:border-foreground sm:aspect-square sm:max-w-[180px]"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Users2 className="size-8" />
                    <h5 className="font-semibold text-white text-xl">
                      Developer
                    </h5>
                    <p className="font-regular text-white leading-snug">
                      I am building an application or game
                    </p>
                  </div>
                </RadioGroupItemButton>
                <RadioGroupItemButton
                  value="Studio"
                  className="w-full items-center justify-center rounded-xl border border-foreground/25 p-4 hover:border-foreground sm:aspect-square sm:max-w-[180px]"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Building className="size-8" />
                    <h5 className="font-semibold text-white text-xl">Studio</h5>
                    <p className="font-regular text-white leading-snug">
                      I am building multiple applications or games
                    </p>
                  </div>
                </RadioGroupItemButton>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      {/* Name */}
      <FormField
        name="name"
        control={form.control}
        render={() => (
          <FormItem>
            <FormLabel>What's the name of your company?</FormLabel>
            <FormControl className="flex flex-col space-y-2">
              <Input
                className="w-1/2 min-w-[250px]"
                id="name"
                type="text"
                placeholder="Hooli, Inc."
                {...register("name")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Role */}
      <FormField
        name="role"
        control={form.control}
        render={() => (
          <FormItem>
            <FormLabel>What's your role?</FormLabel>
            <FormControl className="flex flex-col space-y-2">
              <Select
                defaultValue={form.getValues("role")}
                onValueChange={(value) => {
                  form.setValue("role", value);
                }}
              >
                <SelectTrigger id="role" className="w-1/2 min-w-[250px]">
                  <SelectValue placeholder={"Select Role"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem key={"founder"} value={"Founder"}>
                      Founder
                    </SelectItem>
                    <SelectItem key={"product"} value={"Product"}>
                      Product
                    </SelectItem>
                    <SelectItem key={"developer"} value={"Developer"}>
                      Developer
                    </SelectItem>
                    <SelectItem key={"biz-dev"} value={"Business Development"}>
                      Business Development
                    </SelectItem>
                    <SelectItem key={"other"} value={"Other"}>
                      Other
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Industry */}
      <FormField
        name="industry"
        control={form.control}
        render={() => (
          <FormItem>
            <FormLabel>What industry is your company in?</FormLabel>
            <FormControl className="flex flex-col space-y-2">
              <Select
                defaultValue={form.getValues("industry")}
                onValueChange={(value) => {
                  form.setValue("industry", value);
                }}
              >
                <SelectTrigger className="w-1/2 min-w-[250px]">
                  <SelectValue placeholder={"Select Industry"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={"consumer"} value={"consumer"}>
                    Consumer
                  </SelectItem>
                  <SelectItem key={"defi"} value={"defi"}>
                    DeFi
                  </SelectItem>
                  <SelectItem key={"gaming"} value={"gaming"}>
                    Gaming
                  </SelectItem>
                  <SelectItem key={"social"} value={"social"}>
                    Social
                  </SelectItem>
                  <SelectItem key={"other"} value={"other"}>
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );

  const Step3: React.FC<StepProps> = ({ register }) => (
    <div className="flex max-h-[700px] flex-col space-y-4 overflow-scroll">
      <FormField
        name="industry"
        control={form.control}
        render={() => (
          <FormItem>
            <FormControl>
              <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
                {interestValues.map((interest) => {
                  const checkedInterests = watchInterests || [];
                  const isChecked = checkedInterests.includes(interest.key);

                  return (
                    <Card
                      key={interest.key}
                      className={cn(
                        "no-scrollbar flex aspect-[4/3] cursor-pointer flex-col items-start justify-start space-y-1 p-4 transition-colors hover:bg-muted md:aspect-[16/9]",
                        isChecked && "border-primary bg-muted",
                      )}
                      onClick={(event) => {
                        event.preventDefault(); // Prevent default behavior
                        const newInterests = isChecked
                          ? checkedInterests.filter(
                              (key) => key !== interest.key,
                            )
                          : [...checkedInterests, interest.key];
                        form.setValue("interests", newInterests);
                      }}
                    >
                      <Checkbox
                        className="sr-only"
                        value={interest.key}
                        {...register("interests")}
                        id={`interest-${interest.key}`}
                      />
                      <h5 className="font-semibold text-lg tracking-tight">
                        {interest.label}
                      </h5>
                      <p className="font-regular text-foreground/75 text-sm tracking-tight">
                        {interest.description}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );

  const variants = {
    enter: { opacity: 0, x: 200 * direction },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 * direction },
  };

  const transition = {
    type: "spring",
    bounce: 0,
    duration: 0.45,
  };

  return (
    <div className="relative flex place-items-center bg-muted/30">
      <main className="z-10 flex w-full flex-col-reverse gap-6 md:flex-row">
        {/* Left Panel */}
        <div className="items-between relative box-border flex h-[75vh] w-full flex-col overflow-hidden p-4 md:h-screen md:w-1/2 md:p-12">
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold text-xl tracking-tight">
              {step === 3 ? "Tell us what you need." : "Tell us about you."}
            </h1>
            <h3 className="font-regular text-muted-foreground text-sm tracking-tight">
              {step === 3
                ? "What are you looking to include in your project? Select as many as you want."
                : "This will help us personalize your experience."}
            </h3>
          </div>
          <Form {...form}>
            <form className="my-8">
              <motion.div
                key={step}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 register={form.register} />}
                {step === 3 && <Step3 register={form.register} />}
              </motion.div>
            </form>
          </Form>
          <Footer />
        </div>
        {/* Right Panel */}
        <div className="flex h-[25vh] w-full animate-gradient-x flex-col items-center justify-center bg-gradient-to-r from-[#25369F] via-[#290259] to-[#3E0D45] md:h-screen md:w-1/2">
          <Card className="flex w-[300px] items-center rounded-xl border-muted transition-all ">
            <CardContent className="flex items-center space-x-4 p-4">
              {form.getValues("userType") ? (
                form.getValues("userType") === "Developer" ? (
                  <Users2 className="size-8" />
                ) : (
                  <Building className="size-8" />
                )
              ) : (
                <div className="size-9 overflow-hidden rounded-full">
                  <Blobbie
                    address={accountQuery.data?.creatorWalletAddress ?? ""}
                    size={48}
                  />
                </div>
              )}
              <div className="flex flex-col">
                <h5 className="max-w-[200px] truncate font-regular font-sm text-white">
                  {form.getValues("email")
                    ? form.getValues("email")
                    : accountQuery.data?.creatorWalletAddress
                      ? shortenAddress(accountQuery.data?.creatorWalletAddress)
                      : ""}
                </h5>

                <h5
                  className={`font-sm text-foreground/50 ${form.getValues("role") ? "" : "hidden"}`}
                >
                  {form.getValues("role")}
                </h5>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
