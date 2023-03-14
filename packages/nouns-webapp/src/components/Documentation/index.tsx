import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import classes from './Documentation.module.css';
import { Trans } from '@lingui/macro';

const Documentation = () => {
  return (
    <Section fullWidth={false}>
      {/* Overview */}
      <Col lg={{ span: 10, offset: 1 }}>
        <div className={classes.headerWrapper}>
          <h1>
            <Trans>Overview</Trans>
          </h1>
          <blockquote>
            The Boston DAO is attempting to digitize the spirit of Boston's identify for freedom and
            opportunity by creating a community focused on giving freedom and opportunity to other
            who are less fortunate through scholarships and learning opportunities. contributors.
          </blockquote>
        </div>
      </Col>
    </Section>
  );
};
export default Documentation;
