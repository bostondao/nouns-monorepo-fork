import classes from './Airdrop.module.css';
import Section from '../../layout/Section';
import { Col, Row, Card, Button } from 'react-bootstrap';
import React from 'react';
import { useIsAirdropClaimable } from '../../wrappers/nounToken';

const AirdropPage: React.FC<{}> = props => {
  return (
    <Section fullWidth={false} className={classes.section}>
      <Row className={classes.headerRow}>
        <Col lg={8}>
          <Card className={classes.card}>
            <Card.Body>
              <Card.Title className={classes.cardTitle}>Check airdrop elgibility</Card.Title>
              <Card.Text>Tap the button below to claim your NFT</Card.Text>
              <Button className={classes.claimBtn}>Claim NFT</Button>
              <Card.Text style={{ paddingTop: '2rem' }}>Eligibility Criteria</Card.Text>
              <ul style={{ paddingTop: '1rem' }}>
                <li>Boston DAO Concil Member</li>
                <li>Lottery Winner</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className={classes.card}>
            <Card.Body>
              <Card.Title className={classes.cardTitle}>{
                useIsAirdropClaimable() ?
                  'Airdrop available' :
                  'Airdrop not available'
              }</Card.Title>
              <Card.Text>
                {
                  useIsAirdropClaimable() ?
                    'You can now claim your tokens' :
                    'The airdrop has not started yet'
                }
              </Card.Text>
              <Card.Text className={classes.boldText}>Follow us</Card.Text>
              <Card.Text>
                Follow our official Twitter page for information on the airdrop &nbsp;
                <a href='https://twitter.com/TheBostonDAO' className={classes.boldHyperLink}>@TheBostonDAO</a>
              </Card.Text>
              <Card.Text>
                Join the community on &nbsp;
                <a href='https://t.me/+mybHAepIAV40NTlh' className={classes.boldHyperLink}>Telegram</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Section >
  );
};
export default AirdropPage;
