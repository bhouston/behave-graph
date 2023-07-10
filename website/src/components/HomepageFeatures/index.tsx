import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css.js';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Customizable',
    Svg: require('@site/static/img/undraw_mind_map_re_nlb6.svg').default,
    description: (
      <>
        While this library contains a lot of nodes, you do not have to expose
        all of them. You can also include your custom nodes.
      </>
    )
  },
  {
    title: 'High Performance',
    Svg: require('@site/static/img/undraw_performance_overview_re_mqrq.svg')
      .default,
    description: (
      <>
        Currently in performance testing, the library achieves over 2M node
        executions per second.
      </>
    )
  },
  {
    title: 'Designed for Integration',
    Svg: require('@site/static/img/undraw_code_typing_re_p8b9.svg').default,
    description: (
      <>
        This library is designed to be extended with context dependent nodes,
        specifically Actions, Events and Queries that match the capabilities and
        requirements of your system.
      </>
    )
  }
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
