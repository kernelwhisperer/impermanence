import { persistentAtom } from "@nanostores/persistent";

export const $disallowedKeywords = persistentAtom<string>(
  "disallowed-keywords",
  "",
);
