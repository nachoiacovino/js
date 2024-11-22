"use client";

import { WithEngineInstance } from "../_components/EnginePageLayout";
import { EngineOverview } from "./components/engine-overview";

export function EngineOverviewPage(props: {
  engineId: string;
  teamSlug: string;
  teamId: string;
}) {
  return (
    <WithEngineInstance
      engineId={props.engineId}
      content={(res) => (
        <EngineOverview instance={res.instance} teamSlug={props.teamSlug} />
      )}
      teamId={props.teamId}
    />
  );
}
