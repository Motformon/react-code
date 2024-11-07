import React, {useState} from 'react';
import styles from './style.module.scss';
import ErrorBoundary from "../../../../ErrorBoundary";

type Props = {
  value: string;
}

const DescriptionSituationCell: React.FC<Props> = ({value}) => {
  const [isFullText, setIsFullText] = useState<boolean>(false);

  const splitValue = value.split('\n');
  const isBigValue = splitValue?.length > 2;
  return (
    <ErrorBoundary componentName={'DescriptionSituationCell'}>
      <div
        className={[styles.DescriptionSituationCell, isBigValue ? styles.cellBigValue : ''].join(' ')}
        onClick={isBigValue ? () => setIsFullText(!isFullText) : undefined}
      >
        {isBigValue
          ? isFullText ? value : `${splitValue?.slice(0, 2)?.join('\n')}...`
          : value}
      </div>
    </ErrorBoundary>
  );
};

export default DescriptionSituationCell;
