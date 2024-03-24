'use client';

import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import styles from './section.module.css';

interface SectionProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  action?: React.ReactNode;
  collapsible?: boolean;
  isCollapsed?: boolean;
  setIsCollapsed?: (arg0: boolean) => void;
  className?: string;
  defaultCollapsed?: boolean;
  // styles
  w?: string;
  mh?: string;
}

export function Section({
  title,
  subTitle,
  action,
  children,
  className = '',
  collapsible = true,
  w = '',
  mh,
  setIsCollapsed,

  defaultCollapsed = false,
}: SectionProps): React.ReactElement {
  const [showBody, setShowBody] = useState(!defaultCollapsed);

  const toggle = () => { setShowBody((prev) => !prev) }


  useEffect(() => {
    if (setIsCollapsed) {
      !showBody ? setIsCollapsed(true) : setIsCollapsed(false);
    }
  }, [setIsCollapsed, showBody]);
  return (
    <div
      className={`${className} ${styles.container} ${!showBody ? styles.collapsed : ''
        }`}
      style={{ width: w }}
    >
      <div className={styles.header}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.subTitle}>{subTitle}</div>
        </div>
        <div className={styles.action}>
          {showBody ? action : null}

          {collapsible ? (
            <Button onClick={toggle} variant="outline" w="120px">
              {showBody ? 'Collapse' : 'Expand'}
            </Button>
          ) : null}
        </div>
      </div>
      {showBody ? (
        <div className={styles.body} style={{ minHeight: mh }}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
