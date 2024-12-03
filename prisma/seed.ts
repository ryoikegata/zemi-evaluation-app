// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 既存のユーザーデータを削除（必要に応じて）
  await prisma.user.deleteMany({});
  const hashedPassword = await bcrypt.hash("password", 10);

  // student_idのダミーデータを生成
const student_ids = Array.from({ length: 10 }).map(() => ({
  student_id: faker.datatype.uuid(),
}));

// ダミーユーザーの作成
const users = student_ids.map((studentObj) => ({
  student_id: studentObj.student_id, // ここで対応するstudent_idを使用
  name: '田中太郎',
  email: faker.internet.email(),
  password: hashedPassword, // 実際のパスワードハッシュを使用する場合は別途処理が必要です
  role_id: faker.datatype.number({ min: 1, max: 3 }),
  group_id: faker.datatype.number({ min: 1, max: 4 }),
  createdAt: faker.date.past(),
}));

await prisma.user.createMany({
  data: users,
});

  console.log('ダミーデータの挿入が完了しました。');


  // ダミーロールの作成
  await prisma.role.createMany({
    data: [
      { role: 'teacher' },
      { role: 'general' },
      { role: 'leaders' },
      { role: 'admin' },
    ],
  });

  // ダミーグループの作成

  await prisma.group.createMany({
    data: [
      { group: 'omise' },
      { group: 'tathikawa' },
      { group: 'point' },
      { group: 'all' },
    ],
  });


const lateness = await prisma.attendanceStatus.create({
  data: {
    status: 'lateness',
  },
});

const presence = await prisma.attendanceStatus.create({
  data: {
    status: 'presence',
  },
});

const absence = await prisma.attendanceStatus.create({
  data: {
    status: 'absence',
  },
});

// ClassAttendanceのダミーデータ
await prisma.classAttendance.createMany({
  data: [
    {
      studentId: student_ids[0].student_id,
      attendanceStatusId: presence.id,
      classDate: new Date('2024-09-01T08:00:00Z'),
    },
    {
      studentId: student_ids[1].student_id,
      attendanceStatusId: lateness.id,
      classDate: new Date('2024-09-01T08:00:00Z'),
    },
    {
      studentId: student_ids[2].student_id,
      attendanceStatusId: absence.id,
      classDate: new Date('2024-09-01T08:00:00Z'),
    },
    {
      studentId: student_ids[3].student_id,
      attendanceStatusId: presence.id,
      classDate: new Date('2024-09-02T08:00:00Z'),
    },
    {
      studentId: student_ids[4].student_id,
      attendanceStatusId: lateness.id,
      classDate: new Date('2024-09-02T08:00:00Z'),
    },
    {
      studentId: student_ids[5].student_id,
      attendanceStatusId: absence.id,
      classDate: new Date('2024-09-02T08:00:00Z'),
    },
    {
      studentId: student_ids[6].student_id,
      attendanceStatusId: presence.id,
      classDate: new Date('2024-09-03T08:00:00Z'),
    },
    {
      studentId: student_ids[7].student_id,
      attendanceStatusId: lateness.id,
      classDate: new Date('2024-09-03T08:00:00Z'),
    },
    {
      studentId: student_ids[8].student_id,
      attendanceStatusId: absence.id,
      classDate: new Date('2024-09-03T08:00:00Z'),
    },
    {
      studentId: student_ids[9].student_id,
      attendanceStatusId: presence.id,
      classDate: new Date('2024-09-04T08:00:00Z'),
    }
  ],
});

// EventAttendanceのダミーデータ
await prisma.eventAttendance.createMany({
  data: [
    {
      studentId: student_ids[0].student_id,
      attendanceStatusId: presence.id,
      eventDate: new Date('2024-09-15T10:00:00Z'),
    },
    {
      studentId: student_ids[1].student_id,
      attendanceStatusId: lateness.id,
      eventDate: new Date('2024-09-15T10:00:00Z'),
    },
    {
      studentId: student_ids[2].student_id,
      attendanceStatusId: absence.id,
      eventDate: new Date('2024-09-15T10:00:00Z'),
    },
    {
      studentId: student_ids[3].student_id,
      attendanceStatusId: presence.id,
      eventDate: new Date('2024-09-16T10:00:00Z'),
    },
    {
      studentId: student_ids[4].student_id,
      attendanceStatusId: lateness.id,
      eventDate: new Date('2024-09-16T10:00:00Z'),
    },
    {
      studentId: student_ids[5].student_id,
      attendanceStatusId: absence.id,
      eventDate: new Date('2024-09-16T10:00:00Z'),
    },
    {
      studentId: student_ids[6].student_id,
      attendanceStatusId: presence.id,
      eventDate: new Date('2024-09-17T10:00:00Z'),
    },
    {
      studentId: student_ids[7].student_id,
      attendanceStatusId: lateness.id,
      eventDate: new Date('2024-09-17T10:00:00Z'),
    },
    {
      studentId: student_ids[8].student_id,
      attendanceStatusId: absence.id,
      eventDate: new Date('2024-09-17T10:00:00Z'),
    },
    {
      studentId: student_ids[9].student_id,
      attendanceStatusId: presence.id,
      eventDate: new Date('2024-09-18T10:00:00Z'),
    }
  ],
});

// Eventのダミーデータ
await prisma.event.createMany({
  data: [
    {
      name: 'Orientation',
      description: 'New semester orientation',
      groupId: 1,
      eventDate: new Date('2024-09-10T09:00:00Z'),
    },
    {
      name: 'Sports Day',
      description: 'Annual sports event',
      groupId: 2,
      eventDate: new Date('2024-10-01T09:00:00Z'),
    },
    {
      name: 'Cultural Festival',
      description: 'School cultural festival',
      groupId: 3,
      eventDate: new Date('2024-11-15T09:00:00Z'),
    },
    {
      name: 'Graduation Ceremony',
      description: 'Graduation ceremony for seniors',
      groupId: 4,
      eventDate: new Date('2025-03-20T09:00:00'),
    }
  ],
});

// Workのダミーデータ
await prisma.work.createMany({
  data: [
    {
      name: 'Project Presentation',
      studentId: student_ids[0].student_id,
      description: 'Final project presentation',
      groupId: 1,
      workDate: new Date('2024-09-20T11:00:00Z'),
    },
    {
      name: 'Assignment Submission',
      studentId: student_ids[1].student_id,
      description: 'Submit the first assignment',
      groupId: 2,
      workDate: new Date('2024-09-25T11:59:00Z'),
    },
    {
      name: 'Midterm Exam',
      studentId: student_ids[2].student_id,
      description: 'Midterm exam for all subjects',
      groupId: 3,
      workDate: new Date('2024-10-10T09:00:00Z'),
    },
    {
      name: 'Final Exam',
      studentId: student_ids[3].student_id,
      description: 'Final exam for all subjects',
      groupId: 4,
      workDate: new Date('2024-11-20T09:00:00Z'),
    }
  ],
});
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
