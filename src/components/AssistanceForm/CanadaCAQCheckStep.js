// Vendor
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {Formik, Form} from 'formik';
import T from 'prop-types';
import {useRecoilState} from 'recoil';
import {CSSTransition} from 'react-transition-group';

// Components
import StepForm from './StepForm';
import StepActions from './StepActions';
import {YesNoField} from './YesNoStepForm';

// States
import {isGoingToQuebecState, hasCAQState} from './states';

// Styles
import styles from './styles.module.scss';

// Constants
import {Steps} from './steps';

const CanadaCAQCheckStep = ({onNextStep, onPreviousStep}) => {
  const intl = useIntl();
  const [isGoingToQuebec, setIsGoingToQuebec] = useRecoilState(isGoingToQuebecState);
  const [hasCAQ, setHasCAQ] = useRecoilState(hasCAQState);

  const [showHasCAQ, setShowHasCAQ] = useState(isGoingToQuebec);

  const initialValues = {
    isGoingToQuebec: isGoingToQuebec ? 'true' : 'false',
    hasCAQ: hasCAQ ? 'true' : 'false'
  };

  return (
    <StepForm title={intl.formatMessage({id: 'assistance-form.steps.canada-caq-check.title'})}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const isGoingToQuebec = values.isGoingToQuebec === 'true';
          const hasCAQ = values.hasCAQ === 'true';

          setIsGoingToQuebec(isGoingToQuebec);
          setHasCAQ(hasCAQ);

          onNextStep(!isGoingToQuebec || hasCAQ ? Steps.AssistanceLevelCheck : Steps.AboutCandidate);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <div className={styles.fields}>
              <YesNoField name="isGoingToQuebec" onChange={(value) => setShowHasCAQ(value === 'true')} />

              <CSSTransition in={showHasCAQ} timeout={200} classNames="fade" unmountOnExit>
                <YesNoField
                  label={intl.formatMessage({id: 'assistance-form.steps.canada-caq-check.has-caq'})}
                  name="hasCAQ"
                />
              </CSSTransition>
            </div>

            <StepActions disabled={isSubmitting} onPrevious={onPreviousStep} />
          </Form>
        )}
      </Formik>
    </StepForm>
  );
};

export default CanadaCAQCheckStep;

CanadaCAQCheckStep.propTypes = {
  onNextStep: T.func,
  onPreviousStep: T.func
};
