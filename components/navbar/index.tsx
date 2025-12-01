"use client";
import React, { useState } from "react";
import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import cn from "@/libs/utils";

export default function Navbar() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  const [hovered, setHovered] = useState<number | null>(null);
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <Container>
      <motion.nav
        animate={{
          boxShadow: scrolled ? "var(--shadow-input)" : "none",
          width: scrolled ? "60%" : "100%",
          y: scrolled ? 10 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-99999 mx-auto flex max-w-4xl items-center justify-between rounded-full",
          "backdrop-blur-md",
        )}
      >
        <Link href="/">
          <Image
            src="/avatar.jpg"
            width={50}
            height={50}
            className="h-20 w-20 rounded-full object-cover px-4 py-4"
            alt="logo"
          />
        </Link>
        <div className="relative flex items-center px-2 py-1">
          {navItems.map((item, idx) => (
            <Link
              className="relative px-2 py-1 text-sm"
              href={item.href}
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered-span"
                  className="absolute inset-0 h-full w-full rounded-md bg-neutral-100 dark:bg-neutral-900"
                ></motion.div>
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </div>
      </motion.nav>
    </Container>
  );
}
