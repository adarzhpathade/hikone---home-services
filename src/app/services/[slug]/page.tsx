import { Suspense, type ReactNode } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { serviceApi } from "@/features/services/api";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { ServiceDetailContent } from "./service-detail-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await serviceApi.getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Cached so the full page is part of the prefetched shell and navigation
// to it is instant.
async function getServiceDetailData(slug: string) {
  "use cache";
  cacheLife("hours");

  const service = await serviceApi.getServiceBySlug(slug);
  if (!service) return null;

  const relatedServices = await serviceApi.getRelatedServices(
    service.relatedServiceIds,
  );
  return { service, relatedServices };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getServiceDetailData(slug);
  if (!data) return { title: "Service not found" };
  const { service } = data;
  return {
    title: `${service.title} — Hikone`,
    description: service.description,
  };
}

function DetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-4 w-48 bg-canvas-surface rounded" />
      <div className="h-8 w-3/4 bg-canvas-surface rounded" />
      <div className="h-4 w-56 bg-canvas-surface rounded" />
      <div className="h-px bg-hairline-subtle" />
      <div className="flex justify-between items-center py-5">
        <div className="h-8 w-24 bg-canvas-surface rounded" />
        <div className="h-10 w-28 bg-canvas-surface rounded" />
      </div>
      <div className="h-px bg-hairline-subtle" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-canvas-surface rounded" />
        <div className="h-3 w-5/6 bg-canvas-surface rounded" />
        <div className="h-3 w-4/6 bg-canvas-surface rounded" />
      </div>
    </div>
  );
}

function DetailMain({ children }: { children: ReactNode }) {
  return (
    <main className="vt-page flex-1 max-w-3xl w-full mx-auto px-4 sm:px-8 pt-8 pb-12">
      {children}
    </main>
  );
}

async function ServiceData({ params }: PageProps) {
  const { slug } = await params;
  const data = await getServiceDetailData(slug);
  if (!data) notFound();
  const { service, relatedServices } = data;

  return (
    <DetailMain>
      <ServiceDetailContent
        service={service}
        relatedServices={relatedServices}
      />
    </DetailMain>
  );
}

export default function ServiceDetailPage({ params }: PageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader />

      <Suspense
        fallback={
          <DetailMain>
            <DetailSkeleton />
          </DetailMain>
        }
      >
        <ServiceData params={params} />
      </Suspense>

      <SiteFooter />
    </div>
  );
}
