
import { useLocation } from 'react-router-dom';
import {routesConfig} from '../../routes'
import type {RouteConfig} from '../../routes'
const Nav=()=>{
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const titles = [];
    let currentPath = '/';
    for (let i = 0; i < pathnames.length; i++) {
      currentPath = `${pathnames[i]}`;
      const matchingRoute = findRouteByPath(routesConfig as RouteConfig[], currentPath);
      if (matchingRoute) {
        titles.push(matchingRoute.title || '');
      }
    }
  function findRouteByPath(routes:RouteConfig[], path:string) {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (route?.path.indexOf(path)!==-1 ) {
        return route;
      } else if (route.children) {
        const childRoute:any = findRouteByPath(route.children, path);
        if (childRoute) {
          return childRoute;
        }
      }
    }
    return null;
  }
    return (
        <div className="py-4  border-b border-gray-300 flex items-center ">
       <nav aria-label="Breadcrumb">
        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          {titles.map((title, index) => (
            <li key={index}>
              <div className="flex items-center">
                <span className="mr-2 text-xl font-medium text-gray-900">
                  {title}
                </span>
                {index !== titles.length - 1 && (
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
      </div>
    )
}

export default Nav