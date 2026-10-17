export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-canvas text-ink">
      <div className="w-full max-w-xl text-center space-y-4">
        <span className="inline-block text-xs uppercase tracking-widest text-ink-secondary font-display font-semibold">
          Urban Prototype
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-ink">
          On-Demand Service Platform
        </h1>
        <p className="text-sm sm:text-base text-ink-secondary font-sans max-w-md mx-auto">
          Minimalist, high-motion architecture ready for page-by-page and component-by-component construction.
        </p>
      </div>
    </main>
  );
}
