"use client";

import {
  AvatarGroup,
  Column,
  Flex,
  Heading,
  Media,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  techStack?: string[];
  category?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  techStack,
  category,
}) => {
  return (
    <Column fillWidth className={styles.card}>
        {images.length > 0 && (
          <SmartLink unstyled className={styles.imageWrapper} href={href}>
            <Media
              sizes="(max-width: 960px) 100vw, 960px"
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
          </SmartLink>
        )}
        <Flex
          s={{ direction: "column" }}
          fillWidth
          padding="24"
          gap="l"
        >
          {title && (
            <Flex flex={5} direction="column" gap="8">
              <SmartLink unstyled href={href}>
                <Heading as="h2" wrap="balance" variant="heading-strong-xl">
                  {title}
                </Heading>
              </SmartLink>
              {(category || (techStack && techStack.length > 0)) && (
                <Flex gap="4" wrap>
                  {category && (
                    <Tag label={category} variant="neutral" />
                  )}
                  {techStack?.slice(0, 4).map((tech) => (
                    <Tag key={tech} label={tech} variant="brand" />
                  ))}
                  {techStack && techStack.length > 4 && (
                    <Tag label={`+${techStack.length - 4}`} variant="neutral" />
                  )}
                </Flex>
              )}
            </Flex>
          )}
          {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
            <Column flex={7} gap="16">
              {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
              {description?.trim() && (
                <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                  {description}
                </Text>
              )}
              <Flex gap="24" wrap>
                {content?.trim() && (
                  <SmartLink
                    suffixIcon="arrowRight"
                    style={{ margin: "0", width: "fit-content" }}
                    href={href}
                  >
                    <Text variant="body-default-s">Read case study</Text>
                  </SmartLink>
                )}
                {link && (
                  <SmartLink
                    suffixIcon="arrowUpRightFromSquare"
                    style={{ margin: "0", width: "fit-content" }}
                    href={link}
                  >
                    <Text variant="body-default-s">View project</Text>
                  </SmartLink>
                )}
              </Flex>
            </Column>
          )}
        </Flex>
      </Column>
  );
};
