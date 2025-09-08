Platform Monorepo
This monorepo contains the core foundational packages for our platform, managed with Nx and pnpm workspaces.

Packages
This repository includes the following packages:

@platform-monorepo/core: Defines the core interfaces and data models for the platform, including the CrudStore and DomainModel contracts.

@platform-monorepo/firebase: Provides a concrete implementation of the CrudStore interface using Google Firestore.

Getting Started
Clone the repository:

git clone [https://github.com/dipteshhh/platform-monorepo.git](https://github.com/dipteshhh/platform-monorepo.git)
cd platform-monorepo

Install dependencies:
This project uses pnpm for package management.

pnpm install

Common Commands
All commands should be run from the root of the monorepo.

Build a specific package:

pnpm nx build <package-name>
# Example: pnpm nx build firebase

Test a specific package:

pnpm nx test <package-name>
# Example: pnpm nx test core

Run commands on affected projects only:
Nx can intelligently run commands only on the projects that have been changed.

pnpm nx affected -t build
pnpm nx affected -t test