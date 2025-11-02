import clsx from 'clsx';
import { UIMatch, useMatches } from 'react-router-dom';
import { ArrowIcon } from '../ArrowIcon';
import styles from './Breadcrumbs.module.css';

type CrumbHandle<T = unknown> = {
  crumb: (data: T) => string;
};

function Breadcrumbs() {
  const matches = useMatches() as UIMatch<unknown, CrumbHandle<any>>[];

  const crumbs = matches
    .filter((match) => typeof match.handle?.crumb === 'function')
    .map((match) => ({
      pathname: match.pathname,
      label: match.handle!.crumb(match),
    }));

  return (
    <nav className={styles.wrapper}>
      {crumbs.map((crumb, index) => (
        <span key={crumb.pathname} className={styles.crumb}>
          {index > 0 && (
            <span className={styles.arrowIcon}>
              <ArrowIcon />
            </span>
          )}
          <a
            href={crumb.pathname}
            className={clsx(styles.link, {
              [styles.active!]: index === crumbs.length - 1,
            })}
          >
            {crumb.label}
          </a>
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
