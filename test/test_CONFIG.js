/* eslint-env mocha */

import { expect } from 'chai';

import { foo } from '../src/index.js';

describe('Config Global', () => {
  it('is defined', () => {
    expect(CONFIG.test).to.equal('this is a test setting');
  });
});
