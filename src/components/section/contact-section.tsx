import Link from "next/link";
import { DATA } from "@/data/resume";
import { CopyEmail } from "@/components/copy-email";

export default function ContactSection() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border p-6 sm:p-8">
      <h2 className="text-xl font-medium">Get in touch</h2>
      <p className="max-w-lg text-muted-foreground text-pretty">
        Have something to build or just want to talk shop? Email me at{" "}
        <Link
          href={`mailto:${DATA.contact.email}`}
          className="text-blue-700 dark:text-blue-400 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          {DATA.contact.email}
        </Link>{" "}
        and I&apos;ll reply when I can
      </p>
      <div>
        <CopyEmail email={DATA.contact.email} />
      </div>
    </div>
  );
}
