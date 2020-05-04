import { eventGetAll, eventGetById } from './controller/EventController';

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
];
