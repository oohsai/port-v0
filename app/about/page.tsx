import Container from "@/components/container";
import Projects from "@/components/projects";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      <Container className="min-h-[200vh] p-4 md:pt-10 md:pb-10">
        <h1 className="text-primary text-2xl font-bold tracking-tight md:text-4xl">
          About Me
        </h1>
        <p className="text-secondary max-w-lg pt-4 text-sm md:text-base">
          I&apos;m passionate about building web applications. Currently working
          @Earth🌏 and fixing the webpages.
        </p>
      </Container>
    </div>
  );
}
