"use client";
import { useState } from "react";
import { Check, Palette as PaletteIcon } from "lucide-react";

const themes = [
  { id: "default", name: "Default", bg: "#ffffff", accent: "#22c55e" },
  { id: "dark", name: "Dark", bg: "#0f172a", accent: "#4ade80" },
  { id: "ocean", name: "Ocean", bg: "#0c4a6e", accent: "#38bdf8" },
  { id: "sunset", name: "Sunset", bg: "#7c2d12", accent: "#fb923c" },
  { id: "lavender", name: "Lavender", bg: "#4c1d95", accent: "#a78bfa" },
  { id: "forest", name: "Forest", bg: "#14532d", accent: "#86efac" },
];

const buttonStyles = [
  { id: "rounded", name: "Rounded", radius: "12px" },
  { id: "pill", name: "Pill", radius: "9999px" },
  { id: "sharp", name: "Sharp", radius: "4px" },
];

const Appearance = () => {
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [selectedButtonStyle, setSelectedButtonStyle] = useState("pill");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-heading text-[var(--text-primary)] mb-2">
          Appearance
        </h1>
        <p className="text-body text-[var(--text-secondary)]">
          Customize how your DevLinks page looks to visitors.
        </p>
      </div>

      {/* Themes Section */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary-100)] flex items-center justify-center">
            <PaletteIcon size={20} className="text-[var(--primary-600)]" />
          </div>
          <div>
            <h2 className="text-subheading text-[var(--text-primary)]">
              Themes
            </h2>
            <p className="text-caption">Choose a color theme for your page</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-200
                ${
                  selectedTheme === theme.id
                    ? "border-[var(--primary-500)] shadow-md"
                    : "border-[var(--border-light)] hover:border-[var(--border-medium)]"
                }
              `}
            >
              <div
                className="w-full h-20 rounded-lg mb-3 flex items-end justify-center pb-2"
                style={{ background: theme.bg }}
              >
                <div
                  className="w-16 h-6 rounded-full"
                  style={{ background: theme.accent }}
                />
              </div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {theme.name}
              </p>
              {selectedTheme === theme.id && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--primary-500)] flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Button Styles Section */}
      <div className="card p-6">
        <h2 className="text-subheading text-[var(--text-primary)] mb-4">
          Button Style
        </h2>
        <div className="flex flex-wrap gap-4">
          {buttonStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedButtonStyle(style.id)}
              className={`
                flex-1 min-w-[120px] p-4 rounded-xl border-2 transition-all duration-200
                ${
                  selectedButtonStyle === style.id
                    ? "border-[var(--primary-500)] bg-[var(--primary-50)]"
                    : "border-[var(--border-light)] hover:border-[var(--border-medium)]"
                }
              `}
            >
              <div
                className="w-full h-10 bg-[var(--neutral-800)] mb-2"
                style={{ borderRadius: style.radius }}
              />
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {style.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Background Options */}
      <div className="card p-6">
        <h2 className="text-subheading text-[var(--text-primary)] mb-4">
          Background
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {["#ffffff", "#f8fafc", "#f1f5f9", "#e2e8f0"].map((color, i) => (
            <button
              key={i}
              className="w-full aspect-square rounded-xl border-2 border-[var(--border-light)] hover:border-[var(--primary-400)] transition-colors"
              style={{ background: color }}
            />
          ))}
          <button className="w-full aspect-square rounded-xl border-2 border-[var(--border-light)] hover:border-[var(--primary-400)] transition-colors bg-[var(--primary-200)]" />
          <button className="w-full aspect-square rounded-xl border-2 border-[var(--border-light)] hover:border-[var(--primary-400)] transition-colors bg-blue-300" />
          <button className="w-full aspect-square rounded-xl border-2 border-[var(--border-light)] hover:border-[var(--primary-400)] transition-colors bg-purple-300" />
          <button className="w-full aspect-square rounded-xl border-2 border-[var(--border-light)] hover:border-[var(--primary-400)] transition-colors bg-orange-300" />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="btn btn-primary">Save Appearance</button>
      </div>
    </div>
  );
};

export default Appearance;
