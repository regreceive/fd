import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Icon, NavBar } from 'antd-mobile';
// import { Translate } from 'react-localize-redux';
import { IUser } from '../../../reducers/userReducer';
import { getPriceConstitute } from '../../../actions/userActions';
import { IStoreState } from '../../../types';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';

import './index.css';

interface IStateProps {
  role: IUser['role'];
  priceConstitute: IUser['priceConstitute'];
}

interface IDispatchProps {
  getPriceConstitute: typeof getPriceConstitute;
}

interface IState {
  name: string;
  count: number;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  role: state.user.role,
  priceConstitute: state.user.priceConstitute,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getPriceConstitute: () => dispatch(getPriceConstitute()),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component<{}, IState> {
  public state = { name: '', count: 0 };
  public change = (ev: any) => {
    if (ev.data) {
      this.setState({
        name: ev.data._origin.item,
        count: ev.data._origin.percent * 100,
      });
    }
  };

  get injected() {
    return this.props as IStateProps & IDispatchProps & RouteComponentProps;
  }

  public componentDidMount() {
    if (typeof this.injected.location.state !== 'object') {
      this.injected.history.goBack();
      return;
    }
    this.injected.getPriceConstitute();
  }
  public render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const { priceConstitute } = this.injected;
    const dv = new DataView();
    dv.source(priceConstitute).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    return (
      <div styleName="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.injected.history.goBack}
        >
          当前电价组成
        </NavBar>
        <div styleName="electricity">当前用电价:0.25 EDF/度</div>
        <h2 styleName="title">电力组成</h2>
        <Chart
          height={400}
          data={dv}
          // scale={cols}
          padding="auto"
          forceFit
          onPlotClick={this.change}
        >
          <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend
            position="bottom"
            itemGap={24}
            textStyle={{
              fill: '#121314',
              fontSize: '12',
            }}
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li>
            <span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}
            </li>"
          />
          <Guide>
            <Html
              position={['50%', '50%']}
              html={
                '<div style=color:#8c8c8c;font-size:1.16em;text-align:center;width:10em;>' +
                this.state.name +
                '<br><span style=color:#262626;font-size:2.5em>' +
                this.state.count +
                '</span >%</div>'
              }
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={[
              'item',
              ['#8EF003', '#FCE301', '#FF4E51', '#5688FE', '#FFAA36'],
            ]}
            tooltip={[
              'item*percent',
              (item, percent) => {
                percent = percent * 100 + '%';
                return {
                  name: item,
                  value: percent,
                };
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          />
        </Chart>
      </div>
    );
  }
}
