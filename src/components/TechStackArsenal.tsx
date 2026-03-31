"use client";

import React from "react";
import clsx from "classnames";
import { Heading, Flex, RevealFx } from "@once-ui-system/core";
import styles from "./TechStackArsenal.module.scss";

export function TechStackArsenal() {
  const tech = [
    { name: "Golang", slug: "go" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Express.js", slug: "express" },
    { name: "NestJS", slug: "nestjs" },
    { name: "Gin Gonic", slug: "gin" },
    { name: "Next.js", slug: "nextdotjs" },
    { name: "Nuxt.js", slug: "nuxt" },
    { name: "React.JS", slug: "react" },
    { name: "Vue.js", slug: "vuedotjs" },
    { name: "Apache Kafka", slug: "apachekafka" },
    { name: "Xendit", slug: "xendit" },
    { name: "Prisma", slug: "prisma" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "MongoDB", slug: "mongodb" },
    { name: "Redis", slug: "redis" },
    { name: "Kong API Gateway", slug: "kong" },
    { name: "Cloudinary", slug: "cloudinary" },
    { name: "Docker", slug: "docker" },
    { name: "Git", slug: "git" },
    { name: "Jira", slug: "jira" },
    { name: "Taskfile", slug: "task" },
    { name: "JavaScript", slug: "javascript" },
    { name: "Node.js", slug: "nodedotjs" },
    // Derived from About page technical skills:
    { name: "Hapi", slug: "hapi" },
    { name: "C++", slug: "cplusplus" },
    { name: "Python", slug: "python" },
    { name: "TensorFlow", slug: "tensorflow" },
    { name: "OpenCV", slug: "opencv" },
  ];

  // Logic to repeat tech list for seamless infinite loop
  const duplicatedTech = [...tech, ...tech];

  const renderTrackContent = (isColor = false) => (
    <div className={styles.marqueeTrack} aria-hidden={isColor}>
      {duplicatedTech.map((t, idx) => (
        <div key={idx} className={styles.techLogoWrapper}>
          <img
            src={
              isColor
                ? `https://cdn.simpleicons.org/${t.slug}`
                : `https://cdn.simpleicons.org/${t.slug}/gray`
            }
            alt={t.name}
            className={clsx(styles.techLogo, !isColor && styles.techLogoGrayscale)}
            loading="lazy"
          />
          <span className={clsx(styles.techName, isColor && styles.techNameColor)}>
            {t.name}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <RevealFx translateY="16" delay={0.6}>
      <Flex fillWidth direction="column" gap="24" className={styles.techSection}>
        <Flex fillWidth horizontal="center">
          <Heading as="h2" variant="display-strong-xs" wrap="balance">
            Core Tech Stack & Tools
          </Heading>
        </Flex>
        <div className={styles.marqueeContainer}>
          {/* Background Layer: Grayscale */}
          {renderTrackContent(false)}

          {/* Foreground Layer: Original Colors (Controlled by CSS mask in the center) */}
          <div className={styles.marqueeColorLayer}>
            {renderTrackContent(true)}
          </div>
        </div>
      </Flex>
    </RevealFx>
  );
}
