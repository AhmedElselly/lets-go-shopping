import React from 'react';
import Signup from './user/Signup';
import Signin from './user/Signin';

const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path='/Signin' exact component={Signin}/>
        <Route path='/Signup' exact component={Signup}/>
      </Switch>
    </BrowserRouter>
    )
}

export default App;
