/**
 * ref: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/hooks.js
 */

import { useContext } from 'react';
import { __RouterContext as Context, matchPath } from 'react-router';

export function useHistory() {
  return useContext(Context).history;
}

export function useLocation() {
  return useContext(Context).location;
}

export function useParams() {
  const { match } = useContext(Context);
  return match ? match.params : {};
}

export function useRouteMatch(path: string) {
  const location = useLocation();
  const { match } = useContext(Context);

  return path ? matchPath(location.pathname, path) : match;
}
