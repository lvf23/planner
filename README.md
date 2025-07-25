# Planner

**Planner** is a lightweight and extensible task planning system built with **Node.js**, designed to help organize activities within a structured hierarchy of **projects**, **subjects**, and **tasks**. Tasks can be nested indefinitely, forming a flexible, tree-like structure of subtasks.

## Table of Contents

- [Inspiration](#inspiration)
- [Input](#Input)
  - [Relationship Model](#relationship-model)
  - [CSV File Structures](#csv-file-structures)
- [Scheduler](#scheduler)
- [Output](#output)
- [Additional Features](#additional-features)
- [Planned Features](#planned-features)
  - [Graphical User Interface](#graphical-user-interface)
  - [Multi-DBMS Support](#multi-dbms-support)
  - [Alternate Subjects](#alternate-subjects)
  - [Skipped days](#skipped-days)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Special Thanks](#special-thanks)
- [License](#license)
- [Author](#author)

---

## Inspiration

I created Planner to make my study life easier. The idea started while I was preparing for college, where manually building schedules and organizing tasks every semester felt overwhelming and time-consuming. I wanted a tool that could take care of the planning so I could focus more on studying and less on constantly figuring out what to do next.

Although it began with college in mind, this project was designed to support study-oriented planning in general, for any kind of learning project. The goal is to make Planner multi-project by nature, allowing multiple projects and subjects to coexist and be scheduled together intelligently.

## Input

Currently, data is provided through three CSV files located in the `data/` folder:

- `projects.csv`
- `subjects.csv`
- `tasks.csv`

This CSV-based setup was chosen for simplicity and quick prototyping during the early stages of development. Eventually, I plan to replace this with a more robust solution, such as a graphical interface and a proper database system.

For now, these files are edited manually, including the relationships between projects, subjects, and tasks. While this may change in the near future, it's the current approach and works well for small to medium study plans.

### Relationship Model

Here's how projects, subjects, and tasks relate to each other, forming a hierarchical tree structure:

```
project
 └── subject (project_id)
      └── task (subject_id)
           └── subtask (parent_id)
                └── ...
```

### CSV File Structures

#### projects.csv

Projects are the main units in the system. They contain all the tasks organized and scheduled based on their own defined time frame (start and end dates). Here is how they are structured:

| Column | Description                     | Example          |
| ------ | ------------------------------- | ---------------- |
| id     | Unique project identifier       | 1                |
| name   | Name of the project             | My First Project |
| start  | Project start date (DD/MM/YYYY) | 01/01/2026       |
| end    | Project end date (DD/MM/YYYY)   | 31/12/2026       |

#### subjects.csv

Subjects represent the divisions within a project. They help organize tasks by grouping them logically. The scheduler uses these subjects to separate tasks, either in series or alternating, in order to generate the final output schedule. See below how they are structured:

| Column     | Description                                          | Example |
| ---------- | ---------------------------------------------------- | ------- |
| id         | Unique subject identifier                            | 1       |
| name       | Name of the subject                                  | Math    |
| local_id   | Local reference ID, to sort children based in parent | 1       |
| project_id | References the related project                       | 1       |

#### tasks.csv

Tasks in this system can be nested infinitely, allowing for complex hierarchies. Each task can be associated either directly with a subject or with another task as its parent. When a task belongs directly to a subject, the `subject_id` field is used. When a task is a subtask of another task, the `parent_id` field references that parent task. This flexible structure allows you to build an infinite tree of tasks and subtasks. See below how they are structured:

| Column     | Description                                                                                                | Example     |
| ---------- | ---------------------------------------------------------------------------------------------------------- | ----------- |
| id         | Unique task identifier                                                                                     | 1           |
| name       | Name or title of the task                                                                                  | Arithmetics |
| type       | Task type indicating its role in the hierarchy (branch, topic, item, or any other user-defined types)      | branch      |
| local_id   | Local ordering ID used to sort sibling tasks under the same parent (task or subject)                       | 1           |
| subject_id | References related subject                                                                                 | 1           |
| parent_id  | References parent task                                                                                     | 1           |
| done       | Task completion status (true, false, or null). Completion cascades automatically up to the top of the tree | false       |
| done_at    | Date task was completed                                                                                    | 25/12/2024  |

## Scheduler

One of the key features of Planner is its ability to perform **smart scheduling** based on a defined time window in the project:

- **Start date**
- **End date**

Given this range and the list of remaining tasks, the system:

1. Calculates the number of available planning days.
2. Determines the number of incomplete tasks.
3. Evenly distributes the remaining tasks across the available days.

This results in a balanced daily workload. If tasks are left incomplete, the system intelligently redistributes them over the remaining days.

## Output

When you run the planner, it generates a **textual report** saved in the `output/` folder with a filename prefixed by `output-` and timestamp, like:

```
output/output-2025-06-15_19-33-02.txt
```

### The output report includes:

- **Header**: The date and time when the output document was generated.
- **Project Stats**: Number of tasks, total available days, tasks per day, remaining tasks, and how days are distributed among them.
- **Project Structure**: Hierarchical listing of projects, subjects, and nested tasks (branches, topics, items). Each task shows:
  - Completion status `[ ]` for pending tasks
  - Task ID and local reference ID (e.g., `(#3) {$1}`)
  - Task type in brackets (`[branch]`, `[topic]`, `[item]`)
- **TODO List**: Tasks scheduled by day, showing for each date:
  - The project and number of tasks planned
  - Full task path including ancestors for context

## Additional Features

- i18n support (en-US and pt-BR languages supported at the moment)

## Planned Features

### Graphical User Interface

Currently, it is being developed as a separate project. Soon more details will be available.

### Multi-DBMS Support

To improve consistent and flexibility of data inputed in the system, it could have support for multiple DBMS as MySQL, PostgreSQL, etc. Depending of the demand for the project.

### Alternate subjects

Currently it get all the tasks in the subject, put in the scheduler and move to next subject, it can be the Math subject in the monday, English in the tuesday and so on, or put a limit of subjects you can intercalate per day.

### Skipped days

Skip weekends, holidays and rest days, it could be useful to skip days you don't want to consider in the day counting in the project, it would interfere directly in the tasks per day.

## Dependencies

The project don't have many dependencies, but the dependencies used are vital for this project, they are:

> - Node.js ( originally used v22.16.0)
> - npm (originally used v10.9.2)

The other dependencies are npm modules, just check the package.json for version details, but basically they are:

> - jest - it is a development dependency, helped a lot to keep the consistency of the modules of the project
> - csv - I opted for use csv library because parse CSVs using a own module could interfere in the quality of the program, dificult to parse different types of CSVs
> - i18next - I found no best library to make it compatible with i18n in a simple way, it's very practical and mantainable to use in the long run

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/lvf23/planner.git
cd planner
```

2. **Install dependencies:**

```bash
npm install
```

## Usage

The first run will generate the files you need to move on, the files in `data/` and would generate the `.env` with other config you might need. The program will create based in the templates in `samples/` directory.

```
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to your branch: `git push origin feature/my-feature`
5. Open a Pull Request

Feedback and suggestions are welcome! Feel free to:

- Open an [issue](https://github.com/lvf23/planner/issues)
- Or reach out via email (contact information in [profile](https://github.com/lvf23))

## Special Thanks

I would like to express my heartfelt thanks to my longtime friend [@lopeso](https://github.com/lopeso), whose encouragement, feedback, and insightful ideas were fundamental throughout the development of this project. His support helped shape this system into something far more complete and functional than it might have been on my own.

## License

This project is licensed under the [MIT License](./LICENSE).

## Author

Developed by [lvf23](https://github.com/lvf23)
