import { RequestHandler } from 'express';
import { getTestCollection, getUserCollection } from '../models';
import { randomUUID } from 'node:crypto';
import * as ExcelJS from 'exceljs';

export const completeTest: RequestHandler = async (req, res) => {
  const { testResult, testId } = req.body;
  const test = getTestCollection();

  try {
    await test.updateOne({ id: testId }, { $set: { result: testResult, status: 'success' } });

    res.json(true);
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }
};

export const currentTest: RequestHandler = async (req, res) => {
  const userId = req.user?.id;
  const test = getTestCollection();

  try {
    const currentTest = await test.findOne({ userId, status: 'pending' });

    if (!currentTest) {
      res.status(403).json({ message: 'Invalid credentials' });
      return;
    }

    res.json(currentTest.id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllTests: RequestHandler = async (req, res) => {
  try {
    const testsCol = getTestCollection();

    const enriched = await testsCol
      .aggregate([
        {
          $lookup: {
            from: getUserCollection().collectionName,
            localField: 'userId',
            foreignField: 'id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            password: 0,
            'user.password': 0,
          },
        },
      ])
      .toArray();

    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const askForHelp: RequestHandler = async (req, res) => {
  const { testId } = req.body;
  const test = getTestCollection();

  try {
    await test.updateOne({ id: testId }, { $set: { isAskedForHelp: true } });
    res.json(true);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTest: RequestHandler = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const test = getTestCollection();

  try {
    const testId = randomUUID();

    await test.insertOne({
      id: testId,
      userId,
      status: 'pending',
      createdAt: new Date(),
    });
    res.json(testId);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const STEP_LABELS: Record<string, string> = {
  step1: 'Самоанализ',
  step2: 'Управление самопрезентацией',
  step3: 'Анализ карьерной среды',
};

const CATEGORY_LABELS: Record<string, string> = {
  goalSetting: 'Удовлетворённость и целеполагание',
  physiology: 'Физиология',
  anxiety: 'Тревожность',
  burnout: 'Выгорание',
  rigidity: 'Ригидность',
  timeManagement: 'Тайм-менеджмент',
  motivation: 'Мотивация',
  ethicalStandards: 'Этические нормы',
  appearance: 'Внешний вид',
  manners: 'Манеры',
  communication: 'Коммуникация',
  externalCareer: 'Анализ внешней карьерной среды',
  internalCareer: 'Анализ внутренней карьерной среды',
  careerSpace: 'Анализ карьерного пространства',
};

const COLOR_HEADER_BG = 'FF2563EB';
const COLOR_HEADER_FG = 'FFFFFFFF';
const COLOR_STEP_BG = 'FFE0E7FF';
const COLOR_STEP_FG = 'FF1E3A8A';
const COLOR_ROW_ODD = 'FFF8FAFF';
const COLOR_ROW_EVEN = 'FFFFFFFF';
const COLOR_VALID = 'FF16A34A';
const COLOR_INVALID = 'FFDC2626';
const COLOR_SUMMARY_BG = 'FFFBBF24';

export const exportTestsToExcel: RequestHandler = async (_req, res): Promise<void> => {
  try {
    const testsCol = getTestCollection();
    const usersCol = getUserCollection();

    const tests = await testsCol.find({}).sort({ createdAt: -1 }).toArray();

    const userIds = [...new Set(tests.map((t) => t.userId))];
    const users = await usersCol.find({ id: { $in: userIds } }).toArray();
    const userMap = new Map(users.map((u) => [u.id, u]));

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Testing App';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet('Тесты');

    sheet.columns = [
      { key: 'testId', width: 28 },
      { key: 'userName', width: 20 },
      { key: 'userEmail', width: 28 },
      { key: 'status', width: 14 },
      { key: 'createdAt', width: 22 },
      { key: 'isAskedForHelp', width: 18 },
      { key: 'stepLabel', width: 32 },
      { key: 'stepScore', width: 14 },
      { key: 'categoryLabel', width: 36 },
      { key: 'categoryScore', width: 12 },
      { key: 'isValid', width: 12 },
    ];

    const headerRow = sheet.addRow([
      'ID теста',
      'Имя',
      'Email',
      'Статус',
      'Дата прохождения',
      'Запросил помощь',
      'Блок',
      'Баллы блока',
      'Категория',
      'Баллы',
      'Результат',
    ]);
    headerRow.height = 24;
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: COLOR_HEADER_FG } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLOR_HEADER_BG } };
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      cell.border = { bottom: { style: 'thin', color: { argb: 'FF1E40AF' } } };
    });

    let rowIndex = 2;

    tests.forEach((test) => {
      const user = userMap.get(test.userId);
      const result = test.result as any;
      const steps = result ? Object.entries(result) : [];

      const testMeta = {
        testId: test.id,
        userName: user?.name ?? '—',
        userEmail: user?.email ?? '—',
        status: test.status === 'success' ? '✅ Пройден' : '⏳ В ожидании',
        createdAt: test.createdAt ? new Date(test.createdAt).toLocaleString('ru-RU') : '—',
        isAskedForHelp: test.isAskedForHelp ? 'Да' : 'Нет',
      };

      if (steps.length === 0) {
        const row = sheet.addRow({
          ...testMeta,
          stepLabel: '—',
          stepScore: '—',
          categoryLabel: '—',
          categoryScore: '—',
          isValid: '—',
        });
        row.eachCell((cell) => {
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });
        rowIndex++;
        return;
      }

      const testRows: any[] = [];
      steps.forEach(([stepKey, stepData]: [string, any]) => {
        const categories: any[] = stepData.categories ?? [];
        categories.forEach((cat) => {
          testRows.push({
            stepKey,
            stepLabel: STEP_LABELS[stepKey] ?? stepKey,
            stepScore: stepData.totalScore,
            stepValid: stepData.isValid,
            categoryLabel: CATEGORY_LABELS[cat.category] ?? cat.category,
            categoryScore: cat.totalScore,
            isValid: cat.isValid,
          });
        });
      });

      const startRow = rowIndex;
      const endRow = rowIndex + testRows.length - 1;

      testRows.forEach((tr, i) => {
        const isOdd = i % 2 === 0;
        const row = sheet.addRow({
          testId: i === 0 ? testMeta.testId : '',
          userName: i === 0 ? testMeta.userName : '',
          userEmail: i === 0 ? testMeta.userEmail : '',
          status: i === 0 ? testMeta.status : '',
          createdAt: i === 0 ? testMeta.createdAt : '',
          isAskedForHelp: i === 0 ? testMeta.isAskedForHelp : '',
          stepLabel: tr.stepLabel,
          stepScore: tr.stepScore,
          categoryLabel: tr.categoryLabel,
          categoryScore: tr.categoryScore,
          isValid: tr.isValid ? '✅' : '❌',
        });

        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

          if (colNumber >= 7) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: isOdd ? COLOR_ROW_ODD : COLOR_ROW_EVEN },
            };
          }
        });

        const stepCell = row.getCell(7);
        stepCell.font = { bold: true, color: { argb: COLOR_STEP_FG } };
        stepCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLOR_STEP_BG } };

        const validCell = row.getCell(11);
        validCell.font = { bold: true, color: { argb: tr.isValid ? COLOR_VALID : COLOR_INVALID } };

        rowIndex++;
      });

      if (testRows.length > 1) {
        for (let col = 1; col <= 6; col++) {
          sheet.mergeCells(startRow, col, endRow, col);
          const cell = sheet.getCell(startRow, col);
          cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        }
      }

      const sepRow = sheet.addRow([]);
      sepRow.height = 6;
      rowIndex++;
    });

    sheet.addRow([]);
    const summaryRow = sheet.addRow(['ИТОГО тестов', tests.length]);
    summaryRow.font = { bold: true };
    summaryRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: COLOR_SUMMARY_BG },
    };
    summaryRow.getCell(2).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: COLOR_SUMMARY_BG },
    };

    sheet.views = [{ state: 'frozen', ySplit: 1 }];

    const filename = `tests_export_${Date.now()}.xlsx`;

    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.set('Content-Disposition', `attachment; filename="${filename}"`);

    await workbook.xlsx.write(res as any);
    res.end();
  } catch (err) {
    console.error('Export error:', err);
    res.status(500).json({ message: 'Server error during export' });
  }
};
