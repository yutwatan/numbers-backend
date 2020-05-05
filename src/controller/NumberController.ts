import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Number } from '../entity/Number';

/**
 * 指定した期間の結果を取得する
 *   from: 開始日
 *   to  : 終了日
 *   type: 3 or 4 (3 は Numbers3 のことを指す）
 */
export async function numberGetAll(req: Request, res: Response): Promise<void> {
  const query = await getRepository(Number)
    .createQueryBuilder('number')
    .leftJoinAndSelect('number.event', 'event');

  // Check request query
  if (
    Object.prototype.hasOwnProperty.call(req.query, 'from') &&
    Object.prototype.hasOwnProperty.call(req.query, 'to')
  ) {
    query.andWhere('event.date BETWEEN :from AND :to', {
      from: req.query.from,
      to: req.query.to,
    });
  }
  if (Object.prototype.hasOwnProperty.call(req.query, 'type')) {
    query.andWhere('number.type = :type', { type: req.query.type });
  }

  query.orderBy('number.event');

  const numberData = await query.getMany();
  res.send(numberData);
}

export async function numberGetByNumber(
  req: Request,
  res: Response
): Promise<void> {
  const numberRepository = getRepository(Number);
  const numberData = await numberRepository.findOne(req.params.number, {
    relations: ['event'],
  });

  if (!numberData) {
    res.status(404);
    res.end();
    return;
  }

  res.send(numberData);
}
