/** * * Asynchronously loads the component for
ProjectPage
* */
import { lazyLoad } from 'utils/loadable';

export const ProjectPage = lazyLoad(
  () => import('./index'),
  (module) => module.ProjectPage
);
