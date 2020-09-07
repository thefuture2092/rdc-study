// Vendor
import React, {useRef} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import T from 'prop-types';

// Components
import Card from '../Card';

// Styles
import styles from './styles.module.scss';

// State
import {currentStepState, previousStepState, previousStepsState} from './state';
import Steps, {getStepComponent, goToNextStep, goToPreviousStep, goToStep} from './steps';

// Utils
import analyticsPushEvent from '../../utils/push-analytics-event';
import isScrolledIntoView from '../../utils/is-scrolled-into-view';

const MasterForm = ({assistancePackages}) => {
  const currentStepRef = useRef(null);
  const setPreviousSteps = useSetRecoilState(previousStepsState);
  const [currentStep, setCurrentStep] = useRecoilState(currentStepState);
  const previousStep = useRecoilValue(previousStepState);

  const scrollIntoViewIfNecessary = () => {
    if (!isScrolledIntoView(currentStepRef.current)) {
      currentStepRef.current.scrollIntoView();
    }
  };

  const onPreviousStep = () => {
    if (!previousStep) {
      return;
    }

    goToPreviousStep({currentStep, previousStep, setCurrentStep, setPreviousSteps});
    scrollIntoViewIfNecessary();

    analyticsPushEvent({
      category: 'AssistanceForm',
      action: 'previous',
      label: currentStep
    });
  };

  const onNextStep = (nextStep) => {
    goToNextStep({currentStep, nextStep, setCurrentStep, setPreviousSteps});
    scrollIntoViewIfNecessary();
  };

  const onRestart = () => {
    goToStep({setCurrentStep, setPreviousSteps, step: Steps.DestinationCountry});
    scrollIntoViewIfNecessary();

    analyticsPushEvent({
      category: 'AssistanceForm',
      action: 'restart',
      label: currentStep
    });
  };

  const CurrentStepComponent = getStepComponent(currentStep);

  return (
    <div ref={currentStepRef} className={styles['card-wrapper']}>
      <Card className={styles.card}>
        <CurrentStepComponent
          onNextStep={onNextStep}
          onPreviousStep={onPreviousStep}
          onRestart={onRestart}
          assistancePackages={assistancePackages}
        />
      </Card>
    </div>
  );
};

MasterForm.propTypes = {
  assistancePackages: T.object.isRequired
};

export default MasterForm;
