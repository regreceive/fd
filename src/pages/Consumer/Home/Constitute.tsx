import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Icon, NavBar } from 'antd-mobile';
import { Translate } from 'react-localize-redux';

import { IUser } from '../../../reducers/userReducer';
import { getPriceConstitute } from '../../../actions/userActions';
import { IStoreState } from '../../../types';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Guide } from 'bizcharts';

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
        count: ev.data._origin.count * 100,
      });
    }
  };

  get injected() {
    return this.props as IStateProps & IDispatchProps & RouteComponentProps;
  }

  public componentDidMount() {
    this.injected.getPriceConstitute();
  }
  public render() {
    const { Html } = Guide;
    const { priceConstitute } = this.injected;
    return (
      <div styleName="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.injected.history.goBack}
        >
          <Translate id="consumer.home.chart.title" />
        </NavBar>
        <div styleName="electricity">
          <Translate id="consumer.home.chart.use" />:
          <Translate
            id="edf-per-kw"
            data={{ edf: priceConstitute.total.price }}
          />
        </div>
        <h2 styleName="title">
          <Translate id="consumer.home.chart.comprise" />
        </h2>
        <Chart
          height={400}
          data={priceConstitute.data}
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
            position="count"
            color={[
              'item',
              ['#8EF003', '#FCE301', '#FF4E51', '#5688FE', '#FFAA36'],
            ]}
            tooltip={[
              'item*count',
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
