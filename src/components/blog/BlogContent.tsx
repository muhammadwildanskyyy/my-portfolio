"use client";

import { useState, useMemo, useCallback } from "react";
import { Column, Grid, Heading } from "@once-ui-system/core";
import Post from "@/components/blog/Post";
import { SearchFilter, EmptyState, FilterConfig, ViewMode } from "@/components/SearchFilter";
import styles from "./BlogContent.module.scss";

interface PostData {
  slug: string;
  content: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images: string[];
    tag?: string;
  };
}

interface BlogContentProps {
  posts: PostData[];
  title: string;
}

export function BlogContent({ posts, title }: BlogContentProps) {
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(posts);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showThumbnails, setShowThumbnails] = useState(true);


  // Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => {
      if (p.metadata.tag && typeof p.metadata.tag === "string" && p.metadata.tag.trim()) {
        tags.add(p.metadata.tag);
      }
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Extract unique years
  const allYears = useMemo(() => {
    const years = new Set<string>();
    posts.forEach((p) => {
      const year = new Date(p.metadata.publishedAt).getFullYear().toString();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [posts]);

  // Build filter configs
  const filterConfigs: FilterConfig[] = useMemo(() => {
    const configs: FilterConfig[] = [];

    if (allTags.length > 0) {
      configs.push({
        label: "Topic",
        key: "tag",
        options: allTags,
        multiSelect: true,
        icon: "🏷️",
      });
    }

    if (allYears.length > 0) {
      configs.push({
        label: "Year",
        key: "year",
        options: allYears,
        multiSelect: false,
        icon: "📅",
      });
    }

    return configs;
  }, [allTags, allYears]);

  const handleFilterChange = useCallback(
    ({
      search,
      filters,
      sortNewest,
    }: {
      search: string;
      filters: Record<string, string[]>;
      sortNewest: boolean;
    }) => {
      let result = [...posts];

      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase();
        result = result.filter(
          (p) =>
            p.metadata.title.toLowerCase().includes(query) ||
            p.metadata.summary.toLowerCase().includes(query) ||
            (typeof p.metadata.tag === "string" &&
              p.metadata.tag.toLowerCase().includes(query))
        );
      }

      // Tag filter
      if (filters.tag?.length > 0) {
        result = result.filter(
          (p) =>
            typeof p.metadata.tag === "string" && filters.tag.includes(p.metadata.tag)
        );
      }

      // Year filter
      if (filters.year?.length > 0) {
        result = result.filter((p) => {
          const year = new Date(p.metadata.publishedAt).getFullYear().toString();
          return filters.year.includes(year);
        });
      }

      // Sort
      result.sort((a, b) => {
        const diff =
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime();
        return sortNewest ? diff : -diff;
      });

      setFilteredPosts(result);
    },
    [posts]
  );

  const handleClearAll = useCallback(() => {
    setFilteredPosts(posts);
  }, [posts]);

  return (
    <>
      <Heading marginBottom="l" variant="display-strong-s">
        {title}
      </Heading>

      <SearchFilter
        searchPlaceholder="Search articles by title, topic, or keyword..."
        filters={filterConfigs}
        onFilterChange={handleFilterChange}
        totalResults={posts.length}
        filteredResults={filteredPosts.length}
        showViewToggle
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showThumbnailToggle
        thumbnailVisible={showThumbnails}
        onThumbnailVisibleChange={setShowThumbnails}
      />

      {filteredPosts.length > 0 ? (
        <div
          className={`${styles.contentContainer} ${viewMode === "grid" ? styles.gridMode : styles.listMode}`}
          key={viewMode}
        >
          <Column fillWidth flex={1}>
            <Grid
              columns={viewMode === "grid" ? "2" : "1"}
              s={{ columns: "1" }}
              fillWidth
              marginBottom="40"
              gap={viewMode === "grid" ? "16" : "12"}
            >
              {filteredPosts.map((post, index) => (
                <Post
                  key={post.slug}
                  post={post}
                  thumbnail={showThumbnails}
                  direction={viewMode === "grid" ? "column" : "row"}
                />
              ))}
            </Grid>
          </Column>
        </div>
      ) : (
        <Column fillWidth marginBottom="40">
          <EmptyState onClear={handleClearAll} />
        </Column>
      )}
    </>
  );
}
