import { eventGetAll, eventGetById } from './controller/EventController';
import { numberGetAll, numberGetByNumber } from './controller/NumberController';

export const Routes = [
  {
    path: '/event',
    method: 'get',
    action: eventGetAll,
  },
  {
    path: '/event/:id',
    method: 'get',
    action: eventGetById,
  },
  {
    path: '/number',
    method: 'get',
    action: numberGetAll,
  },
  {
    path: '/number/:number',
    method: 'get',
    action: numberGetByNumber,
  },
];
