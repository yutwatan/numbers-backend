import { Between, FindManyOptions, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Event } from '../entity/Event';

export async function eventGetAll(req: Request, res: Response): Promise<void> {
  const eventRepository = getRepository(Event);
  const options: FindManyOptions = {
    relations: ['number'],
    order: {
      times: 'ASC',
    },
  };

  // Check request query
  if (
    Object.prototype.hasOwnProperty.call(req.query, 'from') &&
    Object.prototype.hasOwnProperty.call(req.query, 'to')
  ) {
    options.where = {
      date: Between(req.query.from, req.query.to),
    };
  }

  const eventData = await eventRepository.find(options);
  res.send(eventData);
}

export async function eventGetById(req: Request, res: Response): Promise<void> {
  const eventRepository = getRepository(Event);
  const eventData = await eventRepository.findOne(req.params.id, {
    relations: ['number'],
  });

  if (!eventData) {
    res.status(404);
    res.end();
    return;
  }

  res.send(eventData);
}
