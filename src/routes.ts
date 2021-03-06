import { eventGetAll, eventGetById } from './controller/EventController';
import {
  numberGetAll,
  numberGetByNumber,
  numberGetOrderByCount,
  numberGetTop3ByYear,
} from './controller/NumberController';

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
    path: '/number/all_mean',
    method: 'get',
    action: numberGetOrderByCount,
  },
  {
    path: '/number/:number',
    method: 'get',
    action: numberGetByNumber,
  },
  {
    path: '/number/top3/:type',
    method: 'get',
    action: numberGetTop3ByYear,
  },
];
