"use client";

import { useState, useMemo, useCallback } from "react";
import { Column, Grid } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { ProjectCardCompact } from "@/components/ProjectCardCompact";
import { SearchFilter, EmptyState, FilterConfig, ViewMode } from "@/components/SearchFilter";
import styles from "./WorkContent.module.scss";

interface ProjectData {
  slug: string;
  content: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    images: string[];
    team?: { avatar: string }[];
    link?: string;
    techStack?: string[];
    category?: string;
  };
}

interface WorkContentProps {
  projects: ProjectData[];
}

export function WorkContent({ projects }: WorkContentProps) {
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>(projects);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Extract unique values from project data for filters
  const allTechStacks = useMemo(() => {
    const stacks = new Set<string>();
    projects.forEach((p) => {
      p.metadata.techStack?.forEach((t) => stacks.add(t));
    });
    return Array.from(stacks).sort();
  }, [projects]);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => {
      if (p.metadata.category) cats.add(p.metadata.category);
    });
    return Array.from(cats).sort();
  }, [projects]);

  const allYears = useMemo(() => {
    const years = new Set<string>();
    projects.forEach((p) => {
      const year = new Date(p.metadata.publishedAt).getFullYear().toString();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [projects]);

  // Build filter configs
  const filterConfigs: FilterConfig[] = useMemo(() => {
    const configs: FilterConfig[] = [];

    if (allCategories.length > 0) {
      configs.push({
        label: "Category",
        key: "category",
        options: allCategories,
        multiSelect: false,
        icon: "📁",
      });
    }

    if (allTechStacks.length > 0) {
      configs.push({
        label: "Tech Stack",
        key: "techStack",
        options: allTechStacks,
        multiSelect: true,
        icon: "💻",
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
  }, [allCategories, allTechStacks, allYears]);

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
      let result = [...projects];

      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase();
        result = result.filter(
          (p) =>
            p.metadata.title.toLowerCase().includes(query) ||
            p.metadata.summary.toLowerCase().includes(query) ||
            p.metadata.techStack?.some((t) => t.toLowerCase().includes(query)) ||
            p.metadata.category?.toLowerCase().includes(query)
        );
      }

      // Category filter
      if (filters.category?.length > 0) {
        result = result.filter((p) =>
          filters.category.includes(p.metadata.category || "")
        );
      }

      // Tech stack filter (match any selected)
      if (filters.techStack?.length > 0) {
        result = result.filter((p) =>
          filters.techStack.some((stack) =>
            p.metadata.techStack?.includes(stack)
          )
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

      setFilteredProjects(result);
    },
    [projects]
  );

  const handleClearAll = useCallback(() => {
    setFilteredProjects(projects);
  }, [projects]);

  return (
    <>
      <Column fillWidth paddingX="l" marginBottom="24">
        <SearchFilter
          searchPlaceholder="Search projects by name, tech stack, or category..."
          filters={filterConfigs}
          onFilterChange={handleFilterChange}
          totalResults={projects.length}
          filteredResults={filteredProjects.length}
          showViewToggle
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </Column>

      {filteredProjects.length > 0 ? (
        <div
          className={`${styles.contentContainer} ${viewMode === "grid" ? styles.gridMode : styles.listMode}`}
          key={viewMode}
        >
          {viewMode === "list" ? (
            <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
              {filteredProjects.map((post, index) => (
              <ProjectCard
                  priority={index < 2}
                  key={post.slug}
                  href={`work/${post.slug}`}
                  images={post.metadata.images}
                  title={post.metadata.title}
                  description={post.metadata.summary}
                  content={post.content}
                  avatars={
                    post.metadata.team?.map((member) => ({ src: member.avatar })) || []
                  }
                  link={post.metadata.link || ""}
                  techStack={post.metadata.techStack}
                  category={post.metadata.category}
                />
              ))}
            </Column>
          ) : (
            <Grid
              columns="2"
              s={{ columns: "1" }}
              fillWidth
              gap="20"
              marginBottom="40"
              paddingX="l"
            >
              {filteredProjects.map((post) => (
                <ProjectCardCompact
                  key={post.slug}
                  href={`work/${post.slug}`}
                  images={post.metadata.images}
                  title={post.metadata.title}
                  description={post.metadata.summary}
                  link={post.metadata.link}
                  techStack={post.metadata.techStack}
                  category={post.metadata.category}
                />
              ))}
            </Grid>
          )}
        </div>
      ) : (
        <Column fillWidth paddingX="l" marginBottom="40">
          <EmptyState onClear={handleClearAll} />
        </Column>
      )}
    </>
  );
}
