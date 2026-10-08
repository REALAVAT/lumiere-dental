import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ToothIcon } from "@/components/icons";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="grain-bg flex min-h-[80vh] items-center pt-28 pb-20">
      <div className="container-page text-center">
        <span className="mx-auto inline-flex size-20 items-center justify-center rounded-3xl bg-secondary text-primary">
          <ToothIcon className="size-10" />
        </span>
        <p className="mt-8 font-mono text-sm tracking-widest text-sand-strong">404</p>
        <h1 className="display mx-auto mt-3 max-w-xl text-4xl sm:text-5xl">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">{t("body")}</p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/">
            <ArrowLeft className="rtl:rotate-180" aria-hidden />
            {t("home")}
          </Link>
        </Button>
      </div>
    </section>
  );
}
