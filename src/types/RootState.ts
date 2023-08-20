// [IMPORT NEW CONTAINERSTATE ABOVE]
import { AddEditProjectState } from 'app/pages/AddEditProjectPage/slice/types';
import { ProjectsState } from 'app/pages/ListProjectPage/slice/types';
import { AuthState } from 'app/pages/LoginPage/slice/types';
import { ProjectState } from 'app/pages/ProjectPage/slice/types';
import { BillState } from 'app/pages/ProjectPagePopup/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
import { InfoState } from 'app/pages/SettingPage/slice/infoReducer';
import { ChainInfoState } from 'app/pages/SettingPage/slice/walletReducer';

export interface RootState {
  project?: ProjectState;
  projects?: ProjectsState;
  auth?: AuthState;
  info: InfoState;
  chainInfo: ChainInfoState;
  bill: BillState;
  addEditProject: AddEditProjectState;
}
