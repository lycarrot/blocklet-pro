
import { ReactElement } from 'react';
import { Navigate, Route  } from 'react-router-dom';
import UserIndex from '../pages/user/index';
import UserDetail from '../pages/user/detail';
import UserEdit from '../pages/user/edit';

export interface RouteConfig{
  path: string;
  element: ReactElement;
  title: string;
  children?: RouteConfig[];
}
export  const routesConfig = [
    {
      path: '/user',
      element: <UserIndex />,
      title:'User',
      children: [
        { path: 'detail', element: <UserDetail /> ,title:'UserDetail'},
        { path: 'edit', element: <UserEdit />, title:'Edit User'}
      ]
    },
    { path: '*', element: <Navigate to="/user/detail?id=5" /> } 
  ];

  function renderRoutes(routes:RouteConfig[]) {
    return routes.map((route:RouteConfig, index:number) => {
      const { path, element, children } = route;
  
      if (children) {
        return (
          <Route key={index} path={path} element={element}>
            {renderRoutes(children)}
          </Route>
        );
      }
  
      return <Route key={index} path={path} element={element} />;
    });
  }

  function InitRoute(){
   return  renderRoutes(routesConfig as RouteConfig[])
  }

  export default InitRoute