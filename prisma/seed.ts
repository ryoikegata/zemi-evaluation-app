// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 既存のユーザーデータを削除（必要に応じて）
  await prisma.user.deleteMany({});
  const hashedPassword = await bcrypt.hash("password", 10);

  // ダミーユーザーの作成
  const users = Array.from({ length: 10 }).map(() => ({
    student_id: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: hashedPassword, // 実際のパスワードハッシュを使用する場合は別途処理が必要です
    group_id: faker.datatype.number({ min: 1, max: 5 }),
    createdAt: faker.date.past(),
  }));

  await prisma.user.createMany({
    data: users,
  });

  console.log('ダミーデータの挿入が完了しました。');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
