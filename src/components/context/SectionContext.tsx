// src/context/SectionContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface SectionInfo {
  id: string;
  title: string;
  text: string; // the full text extracted from the section
}

interface SectionContextValue {
  sections: SectionInfo[];
  registerSection: (section: SectionInfo) => void;
}

const SectionContext = createContext<SectionContextValue>({
  sections: [],
  registerSection: () => {},
});

export const SectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sections, setSections] = useState<SectionInfo[]>([]);

  const registerSection = useCallback((section: SectionInfo) => {
    setSections((prev) => {
      const existing = prev.find((s) => s.id === section.id);
      // Only update if the text has changed to avoid unnecessary re-renders
      if (existing) {
        if (existing.text === section.text) return prev;
        return prev.map((s) => (s.id === section.id ? section : s));
      }
      return [...prev, section];
    });
  }, []);

  return (
    <SectionContext.Provider value={{ sections, registerSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSectionContext = () => useContext(SectionContext);
