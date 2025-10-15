# Copilot Instructions

This project uses a modern, professional React + TypeScript + MUI dashboard layout inspired by Codementor's UI. Please follow these guidelines when using GitHub Copilot or similar AI coding assistants in this repository.

## General Guidelines

- Chat with me only in Estonian.
- Write code only in English.
- Use React functional components and hooks (no class components).
- Use TypeScript for all code (no plain JS files).
- Use Material-UI (MUI v5+) components for all UI elements.
- Maintain a clean, white, modern look with blue as the primary accent color.
- Use Cards, Grids, and Boxes for layout, and keep plenty of whitespace.
- Sidebar navigation should use MUI Drawer and List components with icons.
- Top AppBar should include logo/title, status, and action buttons.
- Main content should be organized into Cards with clear headers and actions.
- Use clear, readable typography and proper spacing.
- Avoid inline styles except for quick prototyping; prefer sx prop or theme.
- All code must pass TypeScript strict mode and build cleanly.

## Copilot Usage

- Prefer Copilot suggestions that match the above design and tech stack.
- If Copilot suggests class components, convert to functional components.
- If Copilot suggests non-MUI UI, refactor to use MUI components.
- If Copilot suggests code that does not match the design system, rewrite it.
- Always review Copilot code for accessibility, performance, and maintainability.

## File/Folder Structure

- Place all React components in `src/components/` by feature or domain.
- Place hooks in `src/hooks/`, types in `src/types/`, and utilities in `src/utils/`.
- Keep the project structure modular and easy to navigate.

## Example: Sidebar Navigation

- Use MUI Drawer, List, ListItemButton, ListItemIcon, and ListItemText.
- Use icons from `@mui/icons-material`.
- Sidebar should be permanent on desktop, collapsible on mobile (if needed).

## Example: Main Content Cards

- Use MUI Card, CardContent, CardActions, Typography, and Button.
- Each dashboard section should be a Card with a header and actions.

## Accessibility

- Use semantic HTML and ARIA attributes where appropriate.
- Ensure all interactive elements are keyboard accessible.

## Testing

- All code should be easy to test with React Testing Library and Jest.

---

_These instructions are for Copilot and all contributors to ensure a consistent, high-quality codebase and UI._
