/**
 * Unit Tests — Project Data Integrity
 *
 * Validates the projects data source: no missing fields, unique IDs,
 * valid domains, and consistent numbering.
 */
import { describe, it, expect } from "vitest";
import { getAllProjects, getFeaturedProjects, getProjectById, type ProjectDomain } from "@/data/projects";

const VALID_DOMAINS: ProjectDomain[] = [
  "Embedded Systems & Electronics",
  "Robotics & Autonomous Control",
  "Biomedical & Precision Instrumentation",
  "Mechanism Design & Fabrication",
];

describe("Projects Data Integrity", () => {
  const projects = getAllProjects();

  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("all projects have unique IDs", () => {
    const ids = projects.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("all projects have unique numbers", () => {
    const numbers = projects.map((p) => p.number);
    const unique = new Set(numbers);
    expect(unique.size).toBe(numbers.length);
  });

  it("all projects have valid domains", () => {
    for (const p of projects) {
      expect(VALID_DOMAINS).toContain(p.domain);
    }
  });

  it("all projects have required fields", () => {
    for (const p of projects) {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.descriptor).toBeTruthy();
      expect(p.heroImage).toBeTruthy();
      expect(p.detail).toBeTruthy();
      expect(p.detail.description.what).toBeTruthy();
      expect(p.detail.description.how).toBeTruthy();
      expect(p.detail.description.why).toBeTruthy();
      expect(p.detail.role).toBeTruthy();
      expect(p.detail.duration).toBeTruthy();
      expect(p.detail.technologies.length).toBeGreaterThan(0);
    }
  });

  it("hero images reference valid paths", () => {
    for (const p of projects) {
      expect(p.heroImage).toMatch(/^\/(images|public)\//);
    }
  });

  it("getFeaturedProjects returns only featured projects", () => {
    const featured = getFeaturedProjects();
    for (const p of featured) {
      expect(p.featured).toBe(true);
    }
  });

  it("getProjectById returns correct project", () => {
    for (const p of projects) {
      const found = getProjectById(p.id);
      expect(found).toBeDefined();
      expect(found?.id).toBe(p.id);
    }
  });

  it("getProjectById returns undefined for non-existent ID", () => {
    const found = getProjectById("non-existent-project-xyz");
    expect(found).toBeUndefined();
  });
});
