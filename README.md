# Club Minutes Application

An Angular Material application for displaying and printing amateur radio club board meeting minutes.

## Features

- Clean, compact display optimized for both screen and print
- Modular component architecture for easy customization
- JSON-based data loading
- Material Design UI
- Print-friendly styling with automatic formatting adjustments
- SVG spark graph for financial balance trends

## Sections

The application displays the following sections:

1. **Attendance** - Members present with call signs, roles, arrival/departure times
2. **Financial Report** - Current balance, monthly/yearly changes, balance trend graph
3. **Minutes Approval** - Moved by and seconded by information
4. **President's Report** - President's comments and updates
5. **Vice President's Report** - Vice President's comments and updates
6. **Committee Reports** - Reports from various committees
7. **Old Business** - Continuing business items
8. **New Business** - New business items
9. **Announcements** - Club announcements

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Data Configuration

The application loads minutes data from a JSON file located at:
```
public/assets/data/minutes.json
```

To customize the minutes data, edit this file following the structure defined in `src/app/models/minutes.model.ts`. A sample data file is included to get you started.

### Data Structure

The JSON file should contain:
- `date`: Meeting date
- `clubName`: Name of your club
- `attendees`: Array of attendee objects with firstName, callSign, role, arrivalTime, departureTime
- `financialReport`: Object with currentBalance, changeSinceLastMonth, changeThisYear, and optional balanceHistory array
- `minutesApproval`: Object with movedBy and secondedBy
- `presidentReport`: String
- `vicePresidentReport`: String
- `committeeReports`: Array of committee report objects
- `oldBusiness`: Array of strings
- `newBusiness`: Array of strings
- `announcements`: Array of strings

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Printing

To print the minutes:

1. Click the **Print** button in the top toolbar, or
2. Use your browser's print function (Ctrl+P or Cmd+P)

The print styles automatically adjust the layout for optimal printing:
- Removes the toolbar and buttons
- Adds a header with club name and date
- Reduces font sizes and spacing for compact output
- Ensures sections don't break across pages

## Claude Code Interaction Logging

This project is configured to automatically log all Claude Code interactions to `CLAUDE_INTERACTIONS.md`.

**What gets logged:**
- Session start/end events with timestamps
- All user prompts submitted to Claude
- Response completion notifications

**How it works:**
- A custom hook (`~/.claude/hooks/log-club-minutes.py`) monitors Claude Code events
- Only activates when working in this specific project directory
- Automatically appends to `CLAUDE_INTERACTIONS.md` with timestamps
- Does not log when working in other directories

**To view the interaction history:**
```bash
cat CLAUDE_INTERACTIONS.md
# or
less CLAUDE_INTERACTIONS.md
```

**To disable logging:**
Edit `~/.claude/settings.json` and remove the hook entries for `log-club-minutes.py`

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
