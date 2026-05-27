# Petition Update Creation Feature

React/TypeScript implementation of a petition update creation modal based on the provided design.

## How to run

```bash
npm install
npm run dev
```

## Features

- Always-open modal for creating a petition update
- Title input limited to 100 characters
- Main content textarea limited to 10,000 characters
- Editable author name controlled by a toggle
- Validation for empty form values
- Draft saving to localStorage
- Success message after saving a valid draft
- Responsive styling approximating the provided design

## Notes

I used the native HTML <dialog> element for the modal and kept it open as required by the task. The draft is stored in `localStorage` under the key `petitionUpdateDraft.`

## With more time

I would refine the styling to match the provided design more closely, especially the toggle component, improve the error message design, set up colors and fonts more systematically, extract reusable UI components such as buttons, inputs, and the toggle switch, and add tests for validation and the main save-draft flow.
