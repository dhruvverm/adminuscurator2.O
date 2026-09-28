import Link from "next/link";
import type { SimplePage } from "@/content/pages";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "./Sections";

export function SimplePageView({ page, eyebrow, isLegal = false }: { page: SimplePage; eyebrow: string; isLegal?: boolean }) {
  const [notice, ...sections] = isLegal ? page.sections : [null, ...page.sections];
  return (
    <>
      <PageHero eyebrow={eyebrow} title={page.title} lede={page.description}>
        {page.updated && <p className="subtle mt-4">Last updated: {page.updated}</p>}
      </PageHero>
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          {notice && (
            <div className="alert alert--warning" role="note">
              <Icon name="helpCircle" size={18} />
              <span>
                <strong>{notice.heading}: </strong>
                {notice.body.join(" ")}
              </span>
            </div>
          )}
          <article className="prose">
            {sections.map(
              (s) =>
                s && (
                  <section key={s.heading}>
                    <h2>{s.heading}</h2>
                    {s.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </section>
                ),
            )}
          </article>
          <div className="btn-row mt-12">
            <Link href="/contact" className="btn btn--secondary">
              Questions? Contact us <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
