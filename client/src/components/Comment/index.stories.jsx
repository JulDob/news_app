import React from 'react';
import Comment from './index';

export default {
  title: 'Comments',
  component: Comment,
};

function Template(arg) {
  return <Comment {...arg} />;
}

export const Default = Template.bind({});
Default.args = {
  count: 27,
};
