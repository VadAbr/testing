import { RequestHandler } from 'express';
import { getTestCollection, getUserCollection } from '../models';
import { randomUUID } from 'node:crypto';

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
