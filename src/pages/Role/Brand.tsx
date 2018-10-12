import React from 'react';
import { Translate } from 'react-localize-redux';
import cs from 'classnames';
import './index.css';

interface IProps {
  id: string;
  selected?: boolean;
  onClick?: () => void;
}

const Brand = (props: IProps) => {
  const id = props.id;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 170"
      styleName={cs(id, { selected: props.selected })}
      onClick={props.onClick}
    >
      <g>
        <g>
          <polygon points="150 164.32 143.33 170 6.67 0 150 82.4 150 164.32" />
          <polygon points="0 5.68 6.67 0 150 82.4 143.33 88.08 0 5.68" />
          <polygon points="143.33 170 0 87.6 0 5.68 143.33 88.08 143.33 170" />
          <text x="48%" y="50%">
            <Translate id={'role.' + id} />
          </text>
        </g>
      </g>
    </svg>
  );
};

export default Brand;
