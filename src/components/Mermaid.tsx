"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Flex } from "@once-ui-system/core";

export const Mermaid = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svgStr, setSvgStr] = useState<string>("");

  useEffect(() => {
    // Generate a unique ID to prevent conflicts when multiple diagrams exist
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "var(--font-primary)",
    });

    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(id, chart);
        setSvgStr(svg);
      } catch (e) {
        console.error("Mermaid parsing error:", e);
      }
    };

    renderChart();
  }, [chart]);

  return (
    <Flex
      fillWidth
      padding="32"
      marginTop="16"
      marginBottom="32"
      border="neutral-alpha-medium"
      radius="l"
      background="surface"
      style={{ alignItems: "center", justifyContent: "center" }}
      className="mermaid-wrapper"
    >
      {svgStr ? (
        <div
          ref={ref}
          dangerouslySetInnerHTML={{ __html: svgStr }}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        />
      ) : (
        <div>Parsing Diagram...</div>
      )}
    </Flex>
  );
};
