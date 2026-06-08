"use client";

// import { useSelectedDate } from "@/entities/Issue/model/SelectedDateContext";
import IssueListItem from "./IssueListItem";
import { Issue } from "../types";

const Top3IssueList: Issue[] = [
  {
    id: 1,
    title: "Federal Reserve Signals Rate Hold Through Q3",
    summary:
      "Central bank maintains current policy stance amid stable inflation indicators and steady employment growth.",
    date: "June 4, 2026",
    imageId: "1611974789855-9c2a0a7236a3",
  },
  {
    id: 2,
    title: "EU Carbon Border Tax Takes Effect",
    summary:
      "New regulation requires importers to purchase certificates for embedded emissions in steel, cement, and aluminum.",
    date: "June 4, 2026",
    imageId: "1473341304170-971dccb5ac1e",
  },
  {
    id: 3,
    title: "Tech Sector Consolidation Accelerates",
    summary:
      "Three major acquisitions announced this week as companies seek vertical integration in AI infrastructure.",
    date: "June 4, 2026",
    imageId: "1451187580459-43490c3d8702",
  },
];

export default function IssueList() {
  // const { selectedDate } = useSelectedDate();
  return Top3IssueList.map((item, index: number) => (
    <IssueListItem key={item.id} index={index} {...item} />
  ));
}
