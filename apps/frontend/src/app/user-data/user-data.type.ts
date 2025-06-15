import { DashboardFilterData } from '../dashboard/dashboard-filter/dashboard-filter.type';
import { Checklist } from './checklist';

export type UserData = {
  name: string;
  dashboardFilter: DashboardFilterData;
  checklists: Record<string, Checklist>;
};
