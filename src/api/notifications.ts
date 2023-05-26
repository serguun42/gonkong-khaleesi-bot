import MakeRequest from './make-request.js';

export const ListNotifications = () => MakeRequest('notifications', 'GET');

export const ReadNotifications = () => MakeRequest('notifications/read', 'POST');
