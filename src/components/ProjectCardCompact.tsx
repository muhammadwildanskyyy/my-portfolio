"use client";

import {
  Column,
  Flex,
  Heading,
  Media,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";
import styles from "./ProjectCardCompact.module.scss";

interface ProjectCardCompactProps {
  href: string;
  images: string[];
  title: string;
  description: string;
  link?: string;
  techStack?: string[];
  category?: string;
}

export const ProjectCardCompact: React.FC<ProjectCardCompactProps> = ({
  href,
  images = [],
  title,
  description,
  link,
  techStack,
  category,
}) => {
  return (
    <SmartLink
      fillWidth
      unstyled
      style={{ borderRadius: "var(--radius-l)" }}
      href={href}
    >
      <Column fillWidth className={styles.card}>
        {images.length > 0 && (
          <div className={styles.imageWrapper}>
            <Media
              sizes="(max-width: 768px) 100vw, 480px"
              border="neutral-alpha-weak"
              radius="l"
              src={images[0]}
              alt={title}
              aspectRatio="16 / 9"
              className={styles.image}
            />
            <div className={styles.overlay}>
              <Text variant="body-default-xs" className={styles.overlayText}>
                View Project →
              </Text>
            </div>
          </div>
        )}
        <Column gap="8" padding="16" paddingTop="12">
          <Heading as="h3" variant="heading-strong-s" wrap="balance">
            {title}
          </Heading>
          <Text
            variant="body-default-xs"
            onBackground="neutral-weak"
            className={styles.description}
          >
            {description}
          </Text>
          {(category || (techStack && techStack.length > 0)) && (
            <Flex gap="4" wrap className={styles.tags}>
              {category && (
                <Tag label={category} variant="neutral" />
              )}
              {techStack?.slice(0, 3).map((tech) => (
                <Tag key={tech} label={tech} variant="brand" />
              ))}
              {techStack && techStack.length > 3 && (
                <Tag label={`+${techStack.length - 3}`} variant="neutral" />
              )}
            </Flex>
          )}
        </Column>
      </Column>
    </SmartLink>
  );
};
