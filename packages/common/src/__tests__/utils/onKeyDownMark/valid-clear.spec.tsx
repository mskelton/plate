/** @jsx jsx */

import { jsx } from '@udecode/slate-plugins-test-utils';
import * as isHotkey from 'is-hotkey';
import { MARK_BOLD } from '../../../../../slate-plugins/src/marks/bold/defaults';
import { MARK_ITALIC } from '../../../../../slate-plugins/src/marks/italic/defaults';
import { getOnHotkeyToggleMark } from '../../../transforms/getOnHotkeyToggleMark';

const input = (
  <editor>
    <hp>
      t<htext italic>est</htext>
    </hp>
    <selection>
      <anchor path={[0, 1]} offset={0} />
      <focus path={[0, 1]} offset={3} />
    </selection>
  </editor>
) as any;

const event = new KeyboardEvent('keydown');

const output = (
  <editor>
    <hp>
      t<htext bold>est</htext>
    </hp>
    <selection>
      <anchor path={[0, 1]} offset={0} />
      <focus path={[0, 1]} offset={3} />
    </selection>
  </editor>
) as any;

it('should be', () => {
  jest.spyOn(isHotkey, 'default').mockReturnValue(true);

  getOnHotkeyToggleMark({
    type: MARK_BOLD,
    hotkey: 'ctrl+b',
    clear: MARK_ITALIC,
  })?.(event, input);
  expect(input.children).toEqual(output.children);
  expect(input.selection).toEqual(output.selection);
});
