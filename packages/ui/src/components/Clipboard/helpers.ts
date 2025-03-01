import type { Dispatch, SetStateAction } from "react";

export function copyToClipboard(valueToCopy: string, setIsJustCopied: Dispatch<SetStateAction<boolean>>) {
  setIsJustCopied(true);
  navigator?.clipboard
    ?.writeText(valueToCopy)
    .then(() => {
      console.log("Copy Successfull");
    })
    .catch((error) => {
      console.error("Failed to Copy text: ", error);
      setIsJustCopied(false);
    });
  setTimeout(() => setIsJustCopied(false), 4000);
}
