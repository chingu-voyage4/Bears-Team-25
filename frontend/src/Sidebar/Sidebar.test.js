import React from 'react';
import { shallow } from 'enzyme';

import Sidebar from './Sidebar';

const topics = [{ _id: '1', name: 'Voyage', order: 1 }];
// eslint-disable-next-line camelcase
const sub_topics = [
  { _id: '10', parent: '1', name: 'About this Wiki', order: 1 },
  { _id: '11', parent: '1', name: 'About Voyages', order: 2 },
];

const articles = [
  {
    _id: '100',
    topic: topics[0],
    sub_topic: sub_topics[0],
    title: 'Home',
    order: 1,
  },
  {
    _id: '101',
    topic: topics[0],
    sub_topic: sub_topics[0],
    title: 'How to Contribute',
    order: 2,
  },
  {
    _id: '102',
    topic: topics[0],
    sub_topic: sub_topics[1],
    title: 'Voyage Roadmap',
    order: 1,
  },
  {
    _id: '103',
    topic: topics[0],
    sub_topic: null,
    title: 'Introduction',
    order: 1,
  },
];

const expectedTree = {
  Voyage: {
    _id: '1',
    expanded: false,
    'About this Wiki': {
      _id: '10',
      expanded: false,
      Home: '100',
      'How to Contribute': '101',
    },
    'About Voyages': {
      _id: '11',
      expanded: false,
      'Voyage Roadmap': '102',
    },
    Introduction: '103',
  },
};

const expectedExpandedTree = {
  Voyage: {
    _id: '1',
    expanded: true,
    'About this Wiki': {
      _id: '10',
      expanded: false,
      Home: '100',
      'How to Contribute': '101',
    },
    'About Voyages': {
      _id: '11',
      expanded: false,
      'Voyage Roadmap': '102',
    },
    Introduction: '103',
  },
};

const match = {
  params: { id: '' },
};

let comp;
let inst;

const props = {
  articles,
  handleDrawerClose: () => {},
  match,
  windowWidth: 1200,
};

beforeEach(() => {
  comp = shallow(<Sidebar {...props} />);
  comp.setProps({ articles });
  inst = comp.instance();
});

it('should initialise Sidebar correctly', () => {
  expect(inst.state.open).toBe(false);
  expect(inst.state.articleTree).toEqual(expectedTree);
  expect(inst.state.articlesHtml).toMatchSnapshot();
});

xit('should show mobile drawer', () => {
  expect.hasAssertions();
  comp.setState({ articlesHtml: null, mobile: true });
  inst.openDrawer();
  return Promise.resolve().then(() => {
    comp.update();
    expect(inst.state.open).toBe(true);
    expect(comp).toMatchSnapshot();
  });
});

it('should close mobile drawer', () => {
  inst.closeDrawer();
  expect(inst.state.open).toBe(false);
});

it('should expand tree', () => {
  inst.onExpanded('1', true);
  expect(inst.state.articleTree).toEqual(expectedExpandedTree);
});

xit('should remove resize event listener', () => {
  const remover = jest
    .spyOn(global, 'removeEventListener')
    .mockImplementation(() => {});
  return Promise.resolve().then(() => {
    comp.unmount();
    expect(remover).toHaveBeenCalled();
  });
});
