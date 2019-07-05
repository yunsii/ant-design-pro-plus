import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import styles from '../style.less';

const { Step } = Steps;

@connect(({ form }) => ({
  current: form.current,
}))
class StepForm extends PureComponent {
  getCurrentStep() {
    const { current } = this.props;
    switch (current) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const currentStep = this.getCurrentStep();
    let stepComponent;
    if (currentStep === 1) {
      stepComponent = <Step2 />;
    } else if (currentStep === 2) {
      stepComponent = <Step3 />;
    } else {
      stepComponent = <Step1 />;
    }
    return (
      <PageHeaderWrapper content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
        <Card bordered={false}>
          <Fragment>
            <Steps current={currentStep} className={styles.steps}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>
            {stepComponent}
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default StepForm;
