"use client";
import Image from "next/image";
import React from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      title: "Butua - A web3 wallet",
      description: "A web3 wallet for seamless crypto management.",
      image: "/butua.png",
      href: "https://butua.oohsai.me/",
    },
    {
      title: "PayTM",
      description: "A monorepo setup for multiple apps using Turborepo",
      image: "https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg",
      href: "/projects/paytm",
    },

    {
      title: "Blog-it",
      description: "A full‑stack blogging platform",
      image:
        "https://images.pexels.com/photos/3601081/pexels-photo-3601081.jpeg",
      href: "/projects/blog-it",
    },
    {
      title: "Twitter",
      description: "Backend of a Twitter‑like application.",
      image:
        "https://images.pexels.com/photos/5417837/pexels-photo-5417837.jpeg",
      href: "/projects/twitter",
    },
  ];
  return (
    <div className="py-10">
      <div className="text-secondary max-w-3xl pt-4 text-sm md:text-sm">
        I love building projects that solve real-world problems and enhance user
        experiences. Here are some of the projects I&apos;ve worked on:
      </div>
      <div className="mt-2 grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
        {projects.map((project, idx) => (
          <Link key={project.title} href={project.href}>
            <motion.div
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: idx * 0.1,
                ease: "easeInOut",
              }}
              className="hover:shadow-input"
            >
              <Image
                className="h-[25vh] w-[50vh] rounded-lg object-cover transition duration-200 hover:z-50 hover:scale-102 hover:blur-[1px]"
                src={project.image}
                alt={project.title}
                width={1500}
                height={1500}
              />
            </motion.div>
            <div className="text-lg font-bold text-neutral-500">
              {project.title}
            </div>
            <p className="max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
              {project.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
