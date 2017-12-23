import React from 'react';

import InfoArea from './infoarea';
import LogoArea from './logoarea';
import SubscribeArea from './subscribearea';
import SiteInfoArea from './siteinfoarea';

export default (props) => {
  const { addressInfo, brandInfo, siteInfo } = props;

  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <InfoArea {...addressInfo} />
          <LogoArea {...brandInfo} />
          <SubscribeArea />
        </div>
      </div>
      <SiteInfoArea {...siteInfo} />
    </footer>
  );
};
