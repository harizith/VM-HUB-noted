# VM-HUB-noted

A modern portal application built with TypeScript, Next.js, and React for managing virtual machine environments with note-taking capabilities.

**Live Demo:** [https://portal-five-gray-82.vercel.app](https://portal-five-gray-82.vercel.app)

## 🚀 Features

- **Next.js 16** - Latest React framework with App Router
- **Full-Stack TypeScript** - Type-safe development across the entire stack
- **Authentication** - NextAuth v4 integration with bcryptjs password hashing
- **Database** - PostgreSQL with Prisma ORM
- **Styling** - Tailwind CSS v4 for modern UI components
- **Development Tools** - ESLint configuration, TypeScript strict mode

## 📋 Project Structure

```
portal/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── context/          # React context providers
│   ├── data/             # Static data and constants
│   ├── lib/              # Utility functions and helpers
│   └── types/            # TypeScript type definitions
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── scripts/              # Utility scripts
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── eslint.config.mjs     # ESLint rules
```

## 🛠️ Tech Stack

### Core
- **Next.js 16.3.1** - React framework
- **React 19.2.8** - UI library
- **React DOM 19.2.8** - React rendering

### Database & ORM
- **Prisma 7.9.1** - Type-safe ORM
- **PostgreSQL** - Database
- **@prisma/adapter-pg** - PostgreSQL adapter

### Authentication
- **NextAuth 4.24.15** - Authentication library
- **bcryptjs 3.0.3** - Password hashing

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS 4** - CSS processing

### Development
- **TypeScript 5** - Type safety
- **ESLint 9** - Code linting
- **pnpm 9.15.4** - Package manager

### Utilities
- **canvas-confetti** - Celebration effects

## 📦 Installation

### Prerequisites
- Node.js 18+ or higher
- pnpm (recommended) or npm/yarn
- PostgreSQL database

### Setup

1. **Clone the repository and navigate to the portal directory:**
```bash
cd portal
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Set up environment variables:**

Create a `.env.local` file in the `portal` directory:
```
DATABASE_URL="postgresql://user:password@localhost:5432/vm_hub"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Initialize the database:**
```bash
pnpm run prisma:generate
pnpm run prisma:push
```

5. **(Optional) Seed the database:**
```bash
pnpm run prisma:seed
```

## 🚀 Getting Started

### Development Server

Run the development server:

```bash
pnpm run dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The app will auto-reload as you edit files.

### Build for Production

```bash
pnpm run build
```

This command:
1. Generates Prisma types
2. Builds the Next.js application

### Start Production Server

```bash
pnpm run start
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Build for production |
| `pnpm run start` | Start production server |
| `pnpm run lint` | Run ESLint |
| `pnpm run prisma:generate` | Generate Prisma client |
| `pnpm run prisma:push` | Push schema changes to database |
| `pnpm run prisma:seed` | Seed database with initial data |

## 🔐 Authentication

The application uses NextAuth with:
- Session-based authentication
- bcryptjs for secure password hashing
- PostgreSQL for session storage
- Configurable authentication secret via environment variables

## 📊 Database

Prisma manages the database schema. To make changes:

1. Update the schema in `prisma/schema.prisma`
2. Generate Prisma client: `pnpm run prisma:generate`
3. Push changes: `pnpm run prisma:push`

## 🎨 Styling

Tailwind CSS v4 is configured for utility-first styling. Customize the theme in `tailwind.config.ts`.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth Documentation](https://next-auth.js.org)

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
pnpm run build
```

Then push to your git repository and connect it to Vercel. The app will deploy automatically.

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more options.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created by [harizith](https://github.com/harizith)

---

For more information, visit the [repository](https://github.com/harizith/VM-HUB-noted).
