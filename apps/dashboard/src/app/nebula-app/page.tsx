import { getValidAccount } from "../account/settings/getAccount";
import { ChatPage } from "./chat-page.client";

export default async function Page() {
  // enforce logged-in + onboarded user
  // TODO: need to change this when this page on subdomain
  // add a special login page in nebula-app
  // and redirect to that page instead
  await getValidAccount("/nebula-app");

  return <ChatPage />;
}
