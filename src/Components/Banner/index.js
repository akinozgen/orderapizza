import React from 'react';

export default (props) => {
  const {
    image, title, content, url,
  } = props;

  return (
    <div className="col-md-6">
      <a href={url}>
        <article className="banner">
          <img alt="banner" src={image} />
          <div className="banner-over">
            <div className="centered-columns">
              <div className="centered-column">
                <div className="banner-1-detail">
                  {title}
                  <br />
                  {content}
                </div>
              </div>
            </div>
          </div>
        </article>
      </a>
    </div>
  );
};
