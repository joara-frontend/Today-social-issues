export default function IssueHeader() {
  return (
    <div className="mb-12">
      <h1 className="font-work-sans font-semibold text-3xl tracking-tight mb-2">
        Today&apos;s Top 3 Issues
      </h1>
      <p className="text-muted-foreground text-sm">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
