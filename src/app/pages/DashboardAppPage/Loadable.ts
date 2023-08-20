/** * * Asynchronously loads the component for
DashboardAppPage
* */
import { lazyLoad } from 'utils/loadable';

export const DashboardAppPage = lazyLoad(
  () => import('./index'),
  (module) => module.DashboardAppPage
);
