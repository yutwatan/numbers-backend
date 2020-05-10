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

  query.orderBy('number.event', 'DESC');

  const numberData = await query.getMany();
  res.send(numberData);
}

/**
 * 指定した番号になったレコードを取得する
 *   type: 3 or 4 (3 は Numbers3 のことを指す）
 */
export async function numberGetByNumber(
  req: Request,
  res: Response
): Promise<void> {
  const query = await getRepository(Number)
    .createQueryBuilder('number')
    .leftJoinAndSelect('number.event', 'event')
    .where('number.number = :number', { number: req.params.number });

  // Check request query
  if (Object.prototype.hasOwnProperty.call(req.query, 'type')) {
    query.andWhere('number.type = :type', { type: req.query.type });
  }

  query.orderBy('number.event', 'ASC');

  const numberData = await query.getMany();
  res.send(numberData);
}

async function getTop3Data(year: number, type: number): Promise<any> {
  const columns = ['first_num', 'second_num', 'third_num'];
  if (type === 4) {
    columns.push('fourth_num');
  }

  const top3Data = {};
  top3Data[year] = {};

  for (const column of columns) {
    if (typeof top3Data[year][column] === 'undefined') {
      top3Data[year][column] = [];
    }

    const query = await getRepository(Number)
      .createQueryBuilder('n')
      .select('n.' + column, 'number')
      .addSelect('count(n.' + column + ')', 'count')
      .leftJoin('n.event', 'e')
      .where('n.type = :type', { type: type })
      .andWhere('e.date BETWEEN :from AND :to', {
        from: year + '-01-01',
        to: year + '-12-31',
      })
      .groupBy('n.' + column)
      .orderBy('count', 'DESC')
      .limit(4);

    // DEBUG
    //console.log(await query.getQueryAndParameters());
    top3Data[year][column] = top3Data[year][column].concat(
      await query.getRawMany()
    );
  }

  return top3Data;
}

/**
 * 出現回数 Top 3 のデータを年次ごとに取得する
 */
export async function numberGetTop3ByYear(
  req: Request,
  res: Response
): Promise<void> {
  const topThreeData = [];

  for (let year = new Date().getFullYear(); ; year--) {
    const results = await getTop3Data(year, parseInt(req.params.type));

    if (results[year].first_num.length > 0) {
      topThreeData.push(results);
    } else {
      break;
    }
  }

  res.send(topThreeData);
}
