"use client";

import { Column, Flex, Heading, Media, SmartLink, Tag, Text } from '@once-ui-system/core';
import styles from './Posts.module.scss';
import { formatDate } from '@/app/utils/formatDate';

interface PostProps {
    post: any;
    thumbnail: boolean;
    direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
    return (
        <SmartLink
            fillWidth
            unstyled
            style={{ borderRadius: 'var(--radius-l)' }}
            key={post.slug}
            href={`/blog/${post.slug}`}>
            <Flex
                position="relative"
                direction={direction}
                radius="l"
                className={styles.card}
                s={{ direction: "column" }}
                fillWidth>
                {(post.metadata.image || (post.metadata.images && post.metadata.images.length > 0)) && thumbnail && (
                    <Flex className={styles.imageWrapper} flex={direction === "row" ? 4 : undefined} fillWidth={direction === "column"}>
                        <Media
                            priority
                            className={styles.image}
                            sizes={direction === "column" ? "(max-width: 768px) 100vw, 480px" : "(max-width: 768px) 100vw, 640px"}
                            border="neutral-alpha-weak"
                            cursor="interactive"
                            radius="l"
                            src={post.metadata.image || post.metadata.images[0]}
                            alt={'Thumbnail of ' + post.metadata.title}
                            aspectRatio="16 / 9"
                        />
                        <div className={styles.overlay}>
                            <Text variant="body-default-xs" className={styles.overlayText}>
                                Read Article →
                            </Text>
                        </div>
                    </Flex>
                )}
                <Column
                    position="relative"
                    flex={direction === "row" ? 6 : undefined}
                    fillWidth gap="4"
                    padding="24"
                    vertical="center">
                    <Heading
                        as="h2"
                        variant={direction === "column" ? "heading-strong-m" : "heading-strong-l"}
                        wrap="balance">
                        {post.metadata.title}
                    </Heading>
                    <Text
                        variant="label-default-s"
                        onBackground="neutral-weak">
                        {formatDate(post.metadata.publishedAt, false)}
                    </Text>
                    { post.metadata.tag &&
                        <Tag
                            className="mt-12"
                            label={post.metadata.tag}
                            variant="neutral" />
                    }
                </Column>
            </Flex>
        </SmartLink>
    );
}