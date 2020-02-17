/* eslint-env node */
import React from 'react';
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const setDevOnlyScripts = ({setHeadComponents}) => {
  if (process.env.NODE_ENV === 'production') return;

  setHeadComponents([
    <script key="ads-by-google" async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />,
    <script
      key="ads-by-google-script"
      dangerouslySetInnerHTML={{
        __html: `google_ad_test = "on"; (adsbygoogle = window.adsbygoogle || []).push({google_ad_client: "${process.env.GATSBY_GOOGLE_AD_CLIENT}", enable_page_level_ads: true});`
      }}
    />
  ]);
};

export const onRenderBody = ({setHeadComponents, setPostBodyComponents}) => {
  setPostBodyComponents([
    <script
      key="share-this"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
        window.onShareThisLoaded = () => {
          window.__sharethis__.on("share", ({url}) => { 
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              category: "Social-Share",
              action: "share",
              label: url,
              event: "web-analytics"
            });
          });
        }
        `
      }}
    />
  ]);
  setDevOnlyScripts({setHeadComponents, setPostBodyComponents});
};