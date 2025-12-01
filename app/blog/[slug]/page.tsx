import Container from "@/components/container";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

export default async function SingleBlogsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "data", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  const { content, frontmatter } = await compileMDX({
    source: raw,
    options: { parseFrontmatter: true },
    components: {
      h1: (props) => <h1 className="my-4 text-3xl font-bold" {...props} />,
      h2: (props) => <h2 className="my-3 text-2xl font-semibold" {...props} />,
      p: (props) => <p className="my-2 text-base md:text-lg" {...props} />,
      ul: (props) => <ul className="my-2 ml-6 list-disc" {...props} />,
      li: (props) => <li className="my-1" {...props} />,
      code: (props) => <code className="rounded bg-gray-100 px-1" {...props} />,
      blockquote: (props) => (
        <blockquote
          className="my-3 border-l-4 border-gray-400 pl-4 italic"
          {...props}
        />
      ),
    },
  });

  return (
    <div>
      <Container className="min-h-[200vh] p-4 md:pt-10 md:pb-10">
        <h1 className="text-primary text-2xl font-bold tracking-tight md:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="text-secondary text-sm md:text-base">
          {frontmatter.date}
        </p>
        <article className="prose max-w-none pt-6">{content}</article>
      </Container>
    </div>
  );
}

export async function generateStaticParams() {
  const directory = path.join(process.cwd(), "data");
  const files = fs.readdirSync(directory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(".mdx", "") }));
}
