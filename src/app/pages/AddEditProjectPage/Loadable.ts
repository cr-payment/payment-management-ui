/** * * Asynchronously loads the component for
AddEditProjectPage
* */
import { lazyLoad } from 'utils/loadable';

export const AddEditProjectPage = lazyLoad(
  () => import('./index'),
  (module) => module.AddEditProjectPage
);
