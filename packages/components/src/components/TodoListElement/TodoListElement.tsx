import * as React from 'react';
import { styled } from '@uifabric/utilities';
import { Transforms } from 'slate';
import { ReactEditor, useEditor, useReadOnly } from 'slate-react';
import { getRootClassNames } from '../../types';
import { StyledElementProps } from '../StyledElement/StyledElement.types';
import { getTodoListElementStyles } from './TodoListElement.styles';
import {
  TodoListElementStyleProps,
  TodoListElementStyles,
} from './TodoListElement.types';

const getClassNames = getRootClassNames<
  TodoListElementStyleProps,
  TodoListElementStyles
>();

type Props = StyledElementProps<{ checked?: boolean }>;

/**
 * TodoListElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */
export const TodoListElementBase = ({
  attributes,
  children,
  element,
  className,
  styles,
  nodeProps,
}: Props) => {
  const editor = useEditor();
  const readOnly = useReadOnly();

  const { checked } = element;
  const classNames = getClassNames(styles, {
    className,
    // Other style props
    checked,
  });

  return (
    <div {...attributes} className={classNames.root}>
      <div contentEditable={false} className={classNames.checkboxWrapper}>
        <input
          data-testid="TodoListElementCheckbox"
          className={classNames.checkbox}
          type="checkbox"
          checked={!!checked}
          onChange={(e) => {
            const path = ReactEditor.findPath(editor, element);

            Transforms.setNodes(
              editor,
              { checked: e.target.checked },
              { at: path }
            );
          }}
          {...nodeProps}
        />
      </div>
      <span
        className={classNames.text}
        contentEditable={!readOnly}
        suppressContentEditableWarning
      >
        {children}
      </span>
    </div>
  );
};

/**
 * TodoListElement
 */
export const TodoListElement = styled<
  Props,
  TodoListElementStyleProps,
  NonNullable<Props['styles']>
>(TodoListElementBase, getTodoListElementStyles, undefined, {
  scope: 'TodoListElement',
});