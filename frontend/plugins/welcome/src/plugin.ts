import { createPlugin } from '@backstage/core';
import WelcomePage from './components/WelcomePage';

import solog from './components/solog';
import solog_img from './components/solog_img';
import solog_modul from './components/solog_modul';
import solog_modul_farm from './components/solog_modul_farm';



export const plugin = createPlugin({
  id: 'welcome',
  register({ router }) {

     
      router.registerRoute('/', solog_img);
      router.registerRoute('/solog_modul', solog_modul);
      router.registerRoute('/solog_modul_farm', solog_modul_farm);
      router.registerRoute('/solog', solog);
      router.registerRoute('/1', WelcomePage);
    





  },
});
