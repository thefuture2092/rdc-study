// Vendor
import React from 'react';
import T from 'prop-types';
import {injectIntl} from 'react-intl';
import classnames from 'classnames';

// Styles
import styles from './styles.module.scss';

// constants
const LEVEL_ORDERS = ['undergraduate', 'graduate', 'postgraduate', 'research', 'internship'];

const ScholarshipLevel = injectIntl(({className, levels, tag, intl}) => {
  const Tag = tag || 'div';

  const levelsText = levels
    .sort((level1, level2) => LEVEL_ORDERS.indexOf(level1) - LEVEL_ORDERS.indexOf(level2))
    .map(level => intl.formatMessage({id: `scholarship-level.${level}`}))
    .join(', ');

  return (
    <Tag className={className}>
      <span className={classnames('fa fa-graduation-cap', styles.text)}>{levelsText}</span>
    </Tag>
  );
});

ScholarshipLevel.propTypes = {
  className: T.string,
  tag: T.elementType,
  levels: T.arrayOf(T.string.isRequired),
  intl: T.shape({
    formatMessage: T.func
  })
};

export default ScholarshipLevel;
