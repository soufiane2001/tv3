@echo off
echo Starting StreamTV Pro...
set DATABASE_URL=file:./dev.db
set M3U_URL=http://goat2027.alwanvipsaw.store:80/playlist/bmuser14414/C38WGv6DmJ/m3u_plus?output=hls

echo Running database migrations...
npx prisma db push

echo Starting Next.js server...
npm run dev

pause
