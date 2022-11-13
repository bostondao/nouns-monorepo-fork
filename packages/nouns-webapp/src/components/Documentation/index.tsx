import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import classes from './Documentation.module.css';
import Accordion from 'react-bootstrap/Accordion';
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
            The Boston DAO is a crypto-native community formed out of the greater Boston area. We
            are a collective of early adopters of blockchain technology, leaders, builders,
            investors, artists, musicians, and creators. Our mission is to build an innovative and
            inclusive communal foundation in Boston to accelerate the web3 movement. Our members all
            organize around the broader theme of making Boston the most desirable city for crypto
            contributors.
          </blockquote>
        </div>
      </Col>
      {/* Our Existence */}
      <Col lg={{ span: 10, offset: 1 }}>
        <div className={classes.headerWrapper}>
          <h1>
            <Trans>Our Existence</Trans>
          </h1>
          <ul>
            <li>
              <Trans>
                We believe that humans are at their best when they cooperate together in
                positive-sum activities.
              </Trans>
            </li>
            <li>
              <Trans>
                Historically we have gathered to form organizations such as countries, states,
                churches, and companies in order to govern how we work together to achieve our
                goals. We believe that Decentralized Autonomous Organizations (DAOs) enable a new
                form of human cooperation, which allows for new innovative governance models. DAOs
                help us fairly establish how decisions are made, the rules that members follow, and
                how those rules are changed over time.c. Boston is the place where Tea and Blood
                were spilled in order to liberate its members from an outdated governance system in
                pursuit of an equitable system — an ideal system — one that trusts the subjects with
                the responsibility and the authority to govern themselves. However, as time passes,
                like any structure without proper care, ideal systems rust and wither. We believe
                the time has come to innovate once again. We aim to accelerate the adoption of
                decentralized technology and governance, ultimately educating and indoctrinating
                more like-minded individuals to our community and to the{' '}
                <span className={classes.boldText}>Web3 World</span>.
              </Trans>
            </li>
            <li>
              <Trans>
                We believe that everything we are experimenting with and building here at The Boston
                DAO should serve a purpose. We seek to foster evergreen and prolific ideas that
                should withstand winter and summer cycles to come.
              </Trans>
            </li>
          </ul>
        </div>
      </Col>
      {/* Our values */}
      <Col lg={{ span: 10, offset: 1 }}>
        <div className={classes.headerWrapper}>
          <h1>Our Values</h1>
          <ol>
            <li>
              <Trans>Collaborate with Boston area policymakers and other DAOs</Trans>
            </li>
            <li>
              <Trans>Host events that grow and support the Boston Web3 community</Trans>
            </li>
            <li>
              <Trans>Contribute to and support non-profits</Trans>
            </li>
            <li>
              <Trans>Secure communal assets (fungible or non-fungible)</Trans>
            </li>
            <li>
              <Trans>Invest in Boston area Web3 community and projects</Trans>
            </li>
            <li>
              <Trans>
                Incubate and support game-changing ideas; No matter our direction, the community
                will embody the following values, ranked in their respective order, for when
                conflict occurs:
              </Trans>
            </li>{' '}
          </ol>
        </div>
      </Col>
      <Col lg={{ span: 10, offset: 1 }}>
        <div className={classes.headerWrapper}>
          <h1>
            <Trans>Our Objectives</Trans>
          </h1>
          <p className={classes.aboutText} style={{ paddingBottom: '4rem' }}>
            <Trans>
              Boston is not just a city, it is a mindset. Anyone anywhere can be a Bostonian. As a
              community, we embrace the duality of nature: an idyllic optimism in summer held in
              tandem with a stoic persevering temperament through winter, but with constant progress
              forward. This mentality begets achievement and, as Bostonians in mindset, we intend to
              sustain this tradition of achievement. Our objectives are simple:{' '}
            </Trans>
          </p>
        </div>
        {/*  */}
        <Accordion flush>
          <Accordion.Item eventKey="0" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Policy & Philanthropy</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <ol>
                <li>
                  <Trans>
                    Help policy and academic leadership see the full potential of Web3/Crypto, and
                    help them develop policy that is supportive of the adoption of Web3/Crypto and
                    the community.
                  </Trans>
                </li>
                <li>
                  <Trans>
                    Support the non-profit community to be successful in achieving their missions to
                    the overall betterment of the Boston area community.
                  </Trans>
                </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Conferences & Gatherings</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <ol>
                <li>
                  <Trans>
                    Help Boston regain its status as one of the hubs of Web3/Crypto in the US and
                    world.
                  </Trans>
                </li>
                <li>
                  <Trans>
                    Create events and conferences that bring the best Web3/Crypto, academic, and
                    policymakers' minds together to advance the development and support of
                    Web3/Crypto principles and projects for the overall improvement of the community
                    and society as a whole.
                  </Trans>
                </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Section>
  );
};
export default Documentation;
