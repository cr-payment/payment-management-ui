/** * * Asynchronously loads the component for
ListProjectPage
* */
import { lazyLoad } from 'utils/loadable';

export const ListProjectPage = lazyLoad(
  () => import('./index'),
  (module) => module.ListProjectPage
);
