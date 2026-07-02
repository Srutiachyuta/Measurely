"use client";

import dynamic from "next/dynamic";

const SearchCommand = dynamic(
  () =>
    import("./search-command").then((mod) => ({
      default: mod.SearchCommand,
    })),
  {
    ssr: false,
  }
);

export function SearchCommandLoader() {
  return <SearchCommand />;
}