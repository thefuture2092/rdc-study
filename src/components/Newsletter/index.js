// Vendor
import React, {useState} from 'react';
import Button from '@material/react-button';
import classnames from 'classnames';
import T from 'prop-types';
import {Headline6, Body2} from '@material/react-typography';
import {FormattedMessage} from 'react-intl';
import axios from 'axios';

// Styles
import styles from './styles.module.scss';

// Components
import ActivityIndicator from '../ActivityIndicator';

// Utils
import analyticsPushEvent from '../../utils/push-analytics-event';

// Config
import config from '../../../config';

const {newsletterEndpoint} = config;

const handleSubscribe = async (event, email, setFormState) => {
  event.preventDefault();

  const payload = {
    email
  };

  setFormState({
    isSubmitting: true,
    showError: false,
    showSuccess: false
  });

  try {
    analyticsPushEvent({
      category: 'Newsletter',
      action: 'Subscribe',
      label: window.location.pathname
    });

    await axios.post(newsletterEndpoint, payload);

    setFormState({
      isSubmitting: false,
      showError: false,
      showSuccess: true
    });

    analyticsPushEvent({
      category: 'Newsletter',
      action: 'SubscribeSuccess',
      label: window.location.pathname
    });
  } catch (error) {
    setFormState({
      isSubmitting: false,
      showError: true,
      showSuccess: false
    });

    analyticsPushEvent({
      category: 'Newsletter',
      action: 'SubscribeError',
      label: window.location.pathname
    });

    window.console.error('An error occured', error);
  }
};

const formClassModifier = ({showError, showSuccess}) => {
  if (showError) return 'form-wrapper--error';
  if (showSuccess) return 'form-wrapper--success';
};

const showAlert = ({showError, showSuccess}) => showError || showSuccess;

const alertMessageKey = ({showSuccess}) =>
  showSuccess ? 'shared.newsletter.alert.success' : 'shared.newsletter.alert.error';

const Newsletter = ({className}) => {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState({isSubmitting: false, showError: false, showSuccess: false});

  const disabledState = email && !formState.isSubmitting ? '' : 'disabled';

  return (
    <section className={classnames(styles.wrapper, className)}>
      <ActivityIndicator isActive={formState.isSubmitting} />

      <div className={styles['title-wrapper']}>
        <i className={classnames('fa fa-envelope-o', styles.icon)} />
        <div className={styles['title-container']}>
          <FormattedMessage id="shared.newsletter.title">
            {title => <Headline6 className={styles.title}>{title}</Headline6>}
          </FormattedMessage>

          <FormattedMessage id="shared.newsletter.subtitle">
            {subtitle => <Body2 className={styles.subtitle}>{subtitle}</Body2>}
          </FormattedMessage>
        </div>
      </div>
      <div className={classnames(styles['form-wrapper'], styles[formClassModifier(formState)])}>
        <form className={styles.form} onSubmit={event => handleSubscribe(event, email, setFormState)}>
          <FormattedMessage id="shared.newsletter.input-placeholder">
            {text => (
              <input
                className={styles.input}
                placeholder={text}
                type="email"
                name="email"
                onChange={e => setEmail(e.currentTarget.value)}
                value={email}
              />
            )}
          </FormattedMessage>

          {formState.showSuccess ? (
            <i className={classnames('fa fa-check-circle-o', styles['form-success-icon'])} />
          ) : (
            <FormattedMessage id="shared.newsletter.button-label">
              {text => (
                <Button type="submit" className={styles.button} outlined disabled={disabledState}>
                  {text}
                </Button>
              )}
            </FormattedMessage>
          )}
        </form>

        {showAlert(formState) && (
          <FormattedMessage id={alertMessageKey(formState)}>
            {message => <p className={styles.alert}>{message}</p>}
          </FormattedMessage>
        )}
      </div>
    </section>
  );
};

Newsletter.propTypes = {
  className: T.string
};

export default Newsletter;