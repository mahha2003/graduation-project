import { memo } from "react";

import ProgressLink from "@/components/progress-link";
import ShinyButton from "@/components/shiny-button";

import { ActionButtonsType } from "../types/table";

function AdditionalButtons({
  ActionButtons,
}: {
  ActionButtons: ActionButtonsType[];
}) {
  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
      {ActionButtons?.map((button, index) => (
        <div key={`${button.type}_${index}`} className="w-full sm:w-auto">
          {button.type === "link" ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <ProgressLink href={button.href as any}>
              <ShinyButton>
                <span className="text-sm font-normal">
                  <p>{button.title}</p>
                </span>
              </ShinyButton>
            </ProgressLink>
          ) : button.type === "component" ? (
            button.component
          ) : (
            <ShinyButton onClick={button.onClick}>
              <span className="text-sm font-normal">
                <p>{button.title}</p>
              </span>
            </ShinyButton>
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(AdditionalButtons);
