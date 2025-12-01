import Container from "@/components/container";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Metadata } from "next";
import { Link } from "next-view-transitions";

export const metadata: Metadata = {
  title: "All blogs - ooh.sai",
  description: "A visual dive into the creator",
};

type Blog = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export default async function BlogsPage() {
  // 1️⃣ Read all MDX files from /data
  const directory = path.join(process.cwd(), "data");
  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"));

  // 2️⃣ Extract frontmatter for each file
  const blogs: Blog[] = files.map((file) => {
    const filePath = path.join(directory, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw); // gray-matter parses frontmatter
    return {
      slug: file.replace(".mdx", ""),
      title: data.title || "Untitled",
      date: data.date || "Unknown",
      description: data.description || "Unknown",
    };
  });

  const truncate = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  // 3️⃣ Render the blog list
  return (
    <div>
      <Container className="min-h-[200vh] p-4 md:pt-10 md:pb-10">
        <h1 className="text-primary text-2xl font-bold tracking-tight md:text-4xl">
          All Blogs
        </h1>
        <ul className="mt-8 space-y-4">
          {blogs.map((blog) => (
            <li key={blog.slug}>
              <Link
                href={`/blog/${blog.slug}`}
                className="flex w-full items-center justify-between text-2xl font-semibold text-black hover:text-neutral-700 md:text-xl"
              >
                <div className="flex flex-col">
                  {blog.title}
                  <p className="text-sm font-light text-neutral-400">
                    {truncate(blog.description || "", 150)}
                  </p>
                </div>

                <span className="text-sm text-gray-300">
                  (
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  )
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
