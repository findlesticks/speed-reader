import React from 'react';
import XocsCore from 'react-xocs/dist/xocs-core';
import { skip, skipAll, node } from 'react-xocs/dist/xocs/xocs-core';

const components = {
  abstracts: skip,
  abstract: skip,
  'section-title': skipAll,
  'abstract-sec': skip,
  'simple-para': node('p'),
  title: node('h1'),
  para: node('p'),
  list: skipAll,
  attachments: skipAll,
  floats: skipAll,
  display: skipAll,
  'float-anchor': skipAll,
  label: skipAll,
  'cross-ref': skip,
  'inter-ref': skip,
  'cross-refs': skip,
  body: skip,
  sections: skip,
  section: skip,
};

export default function compose(content) {
  if (!content) {
    return null;
  }
  return <XocsCore content={content} components={components} />;
}
