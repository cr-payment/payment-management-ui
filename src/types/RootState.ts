// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { AuthState } from 'app/pages/LoginPage/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
import { InfoState } from 'app/pages/SettingPage/slice/infoReducer';
import { ChainInfoState } from 'app/pages/SettingPage/slice/types';

export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  auth: AuthState;
  info: InfoState;
  chainInfo: ChainInfoState;
  bill: any;
}
