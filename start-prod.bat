@echo off
echo Building StreamTV Pro for production...
set DATABASE_URL=file:./dev.db

echo Running database migrations...
npx prisma db push

echo Building Next.js...
npm run build

echo Starting production server on port 3000...
set PORT=3000
npm run start

pause
