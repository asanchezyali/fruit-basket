export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
