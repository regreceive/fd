import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';

import { Button, List, Picker } from 'antd-mobile';

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

export default class extends Component {
  public render() {
    return (
      <div>
        <List renderHeader={<Translate id="role.title" />}>
          <Picker
            data={seasons}
            title="选择季节"
            cascade={false}
            extra="请选择"
            // onChange={v => this.setState({ sValue: v })}
            // onOk={v => this.setState({ sValue: v })}
          >
            <List.Item arrow="horizontal">角色</List.Item>
          </Picker>
        </List>
        <Button>下一步</Button>
      </div>
    );
  }
}
