import { UnorderedList } from "@/components/ui/List/List";
import { Button } from "@/components/ui/button";
import { InlineCode } from "@/components/ui/inline-code";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ToolTipLabel } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Box, Flex, Link } from "@chakra-ui/react";
import { useCsvUpload } from "hooks/useCsvUpload";
import { CircleAlertIcon, DownloadIcon, UploadIcon } from "lucide-react";
import { type Dispatch, type SetStateAction, useRef } from "react";
import type { Column } from "react-table";
import { ZERO_ADDRESS } from "thirdweb";
import { CsvDataTable } from "../csv-data-table";

interface SnapshotAddressInput {
  address: string;
  maxClaimable?: string;
  price?: string;
  currencyAddress?: string;
  isValid?: boolean;
}
interface SnapshotUploadProps {
  setSnapshot: (snapshot: SnapshotAddressInput[]) => void;
  snapshotIndex: number;
  setOpenSnapshotIndex: Dispatch<SetStateAction<number>>;
  index: number;
  dropType: "specific" | "any" | "overrides";
  isDisabled: boolean;
  value?: SnapshotAddressInput[] | undefined;
}

const csvParser = (items: SnapshotAddressInput[]): SnapshotAddressInput[] => {
  return items
    .map(({ address, maxClaimable, price, currencyAddress }) => ({
      address: (address || "").trim(),
      maxClaimable: (maxClaimable || "0").trim().toLowerCase(),
      price: (price || "").trim() || undefined,
      currencyAddress: (currencyAddress || "").trim() || undefined,
    }))
    .filter(({ address }) => address !== "");
};

export const SnapshotUpload: React.FC<SnapshotUploadProps> = ({
  setSnapshot,
  snapshotIndex,
  index,
  setOpenSnapshotIndex,
  dropType,
  isDisabled,
  value,
}) => {
  const {
    normalizeQuery,
    getInputProps,
    getRootProps,
    isDragActive,
    rawData,
    noCsv,
    reset,
    removeInvalid,
  } = useCsvUpload<SnapshotAddressInput>({ csvParser, defaultRawData: value });

  const paginationPortalRef = useRef<HTMLDivElement>(null);

  const onSave = () => {
    setSnapshot(normalizeQuery.data.result);
    setOpenSnapshotIndex(-1);
  };

  const columns = [
    {
      Header: "Address",
      accessor: ({ address, isValid }) => {
        if (isValid) {
          return address;
        }
        return (
          <ToolTipLabel
            label={
              address === ZERO_ADDRESS
                ? "Cannot send tokens to ZERO_ADDRESS"
                : address.startsWith("0x")
                  ? "Address is not valid"
                  : "Address couldn't be resolved"
            }
          >
            <div className="flex flex-row items-center gap-2">
              <CircleAlertIcon className="size-4 text-red-500" />
              <div className="cursor-default font-bold text-red-500">
                {address}
              </div>
            </div>
          </ToolTipLabel>
        );
      },
    },
    {
      Header: "Max claimable",
      accessor: ({ maxClaimable }) => {
        return maxClaimable === "0" || !maxClaimable
          ? "Default"
          : maxClaimable === "unlimited"
            ? "Unlimited"
            : maxClaimable;
      },
    },
    {
      Header: "Price",
      accessor: ({ price }) => {
        return price === "0"
          ? "Free"
          : !price || price === "unlimited"
            ? "Default"
            : price;
      },
    },
    {
      Header: "Currency Address",
      accessor: ({ currencyAddress }) => {
        return currencyAddress ===
          "0x0000000000000000000000000000000000000000" || !currencyAddress
          ? "Default"
          : currencyAddress;
      },
    },
  ] as Column<SnapshotAddressInput>[];

  const handleOpenChange = (isOpen: boolean) => {
    setOpenSnapshotIndex(isOpen ? snapshotIndex : -1);
  };

  return (
    <Sheet open={snapshotIndex === index} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:min-w-[540px] lg:min-w-[900px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            {rawData.length ? "Edit" : "Upload"} Snapshot
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-6">
          {rawData.length > 0 ? (
            <CsvDataTable<SnapshotAddressInput>
              portalRef={paginationPortalRef}
              data={normalizeQuery.data.result}
              columns={columns}
            />
          ) : (
            <Flex
              flexGrow={1}
              align="center"
              overflow="auto"
              gap={8}
              flexDir="column"
            >
              <div className="relative aspect-[21/9] w-full">
                <div
                  className={cn(
                    "flex h-full cursor-pointer rounded-md border border-border hover:border-primary",
                    noCsv ? "bg-red-200" : "bg-card",
                  )}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <div className="!m-auto flex flex-col">
                    <UploadIcon
                      className={cn(
                        "mx-auto mb-2 size-8",
                        noCsv ? "text-red-500" : "text-gray-600",
                      )}
                    />
                    {isDragActive ? (
                      <p>Drop the files here</p>
                    ) : (
                      <p className={noCsv ? "text-red-500" : "text-gray-600"}>
                        {noCsv
                          ? `No valid CSV file found, make sure your CSV includes the "address" column.`
                          : "Drag & Drop a CSV file here"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg">Requirements</p>
                <UnorderedList>
                  {dropType === "specific" ? (
                    <>
                      <li>
                        Files <em>must</em> contain one .csv file with a list of
                        addresses and their <InlineCode code="maxClaimable" />.
                        (amount each wallet is allowed to claim)
                        <br />
                        <Link
                          download
                          color="blue.500"
                          href="/snapshot-with-maxclaimable.csv"
                        >
                          <DownloadIcon className="inline size-3" /> Example
                          snapshot
                        </Link>
                      </li>
                      <li>
                        You may optionally add <InlineCode code="price" /> and
                        <InlineCode code="currencyAddress" /> overrides as well.
                        This lets you override the currency and price you would
                        like to charge per wallet you specified
                        <br />
                        <Link
                          download
                          color="blue.500"
                          href="/snapshot-with-overrides.csv"
                        >
                          <DownloadIcon className="inline size-3" /> Example
                          snapshot
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        Files <em>must</em> contain one .csv file with a list of
                        addresses.
                        <br />
                        <Link download color="blue.500" href="/snapshot.csv">
                          <DownloadIcon className="inline size-3" /> Example
                          snapshot
                        </Link>
                      </li>
                      <li>
                        You may optionally add a{" "}
                        <InlineCode code="maxClaimable" />
                        column override. (amount each wallet is allowed to
                        claim) If not specified, the default value is the one
                        you have set on your claim phase.
                        <br />
                        <Link
                          download
                          color="blue.500"
                          href="/snapshot-with-maxclaimable.csv"
                        >
                          <DownloadIcon className="inline size-3" /> Example
                          snapshot
                        </Link>
                      </li>
                      <li>
                        You may optionally add <InlineCode code="price" /> and
                        <InlineCode code="currencyAddress" /> overrides. This
                        lets you override the currency and price you would like
                        to charge per wallet you specified.{" "}
                        <strong>
                          When defining a custom currency address, you must also
                          define a price override.
                        </strong>
                        <br />
                        <Link
                          download
                          color="blue.500"
                          href="/snapshot-with-overrides.csv"
                        >
                          <DownloadIcon className="inline size-3" /> Example
                          snapshot
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    Repeated addresses will be removed and only the first found
                    will be kept.
                  </li>
                  <li>
                    The limit you set is for the maximum amount of NFTs a wallet
                    can claim, not how many they can receive in total.
                  </li>
                </UnorderedList>
              </div>
            </Flex>
          )}
          <Flex
            align="center"
            justify="space-between"
            p={{ base: 0, md: 4 }}
            flexDir={{ base: "column", md: "row" }}
            mt={{ base: 4, md: 0 }}
            borderTop="1px solid"
            borderTopColor="borderColor"
          >
            <Box ref={paginationPortalRef} />
            {!isDisabled && (
              <Flex
                gap={2}
                align="center"
                mt={{ base: 4, md: 0 }}
                w={{ base: "100%", md: "auto" }}
              >
                <Button
                  className="w-full rounded-md md:w-auto"
                  disabled={isDisabled || rawData.length === 0}
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset
                </Button>
                {normalizeQuery.data.invalidFound ? (
                  <Button
                    className="w-full rounded-md md:w-auto"
                    variant="primary"
                    disabled={isDisabled || rawData.length === 0}
                    onClick={() => {
                      removeInvalid();
                    }}
                  >
                    Remove invalid
                  </Button>
                ) : (
                  <Button
                    className="w-full rounded-md md:w-auto"
                    variant="primary"
                    onClick={onSave}
                    disabled={isDisabled || rawData.length === 0}
                  >
                    Next
                  </Button>
                )}
              </Flex>
            )}
          </Flex>
        </div>
      </SheetContent>
    </Sheet>
  );
};
