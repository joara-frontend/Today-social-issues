import IssueHeader from "@/entities/Issue/ui/IssueHeader";
import IssueList from "@/entities/Issue/ui/IssueList";

export default function IssuesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <IssueHeader />
      <IssueList />
    </main>
  );
}
