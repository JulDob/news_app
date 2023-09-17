import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Preview from './index';
import '../../index.css';

export default {
  title: 'Preview',
  component: Preview,
};

function Template(arg) {
  return (
    <BrowserRouter>
      <Preview {...arg} />
    </BrowserRouter>
  );
}

export const Full = Template.bind({});
Full.args = {
  article: {
    picture: 'https://ortodonta.com/wp-content/uploads/2021/03/girl-919048__340.jpg',
    title: 'I learn React',
    category: {
      url: '/finance',
      label: 'Finance',
    },
    url: '#',
    comments: 27,
    spoiler:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sem quis commodo malesuada, erat arcu ornare leo, ut volutpat metus erat at tellus. Maecenas metus tellus, rutrum porta condimentum id, lobortis vel dui. Vestibulum venenatis tincidunt porttitor. Vivamus tempor pharetra tellus, ac lacinia felis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sem quis commodo malesuada, erat arcu ornare leo, ut volutpat metus erat at tellus. Maecenas metus tellus, rutrum porta condimentum id, lobortis vel dui. Vestibulum venenatis tincidunt porttitor. Vivamus tempor pharetra tellus, ac lacinia felis.',
  },
};

export const Thumbnail = Template.bind({});
Thumbnail.args = {
  article: {
    picture: 'https://ladywimbledon.com/wp-content/uploads/2020/02/red-lip-smile-edit-1024x910.jpg',
    title: 'Two Sides Of Programmer Freelancer Life',
    category: {
      url: '/people',
      label: 'People',
    },
    url: '#',
    comments: 557,
    spoiler: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  type: 'thumbnail',
};
